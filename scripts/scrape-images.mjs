#!/usr/bin/env node
/**
 * Scrape & download all images from lead4s.com (legacy WordPress site)
 * and register them in the media_images table.
 *
 * Usage:
 *   node scripts/scrape-images.mjs
 *   node scripts/scrape-images.mjs --dry-run        # print URLs, don't save
 *   node scripts/scrape-images.mjs --base=https://lead4s.com
 */

import { PrismaClient } from "@prisma/client";
import { mkdir, writeFile, stat } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── CLI args ────────────────────────────────────────────────────────────────
const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, "").split("=");
    return [k, v.length ? v.join("=") : true];
  })
);

const BASE_URL = (argv.base ?? "https://lead4s.com").replace(/\/$/, "");
const DRY_RUN = argv["dry-run"] === true || argv["dry-run"] === "true";

// Pages to crawl (add more slugs as needed)
const PAGES_TO_CRAWL = [
  "/",
  "/about-us/",
  "/services/",
  "/contact-us/",
  "/blog/",
  "/case-studies/",
  "/career/",
  "/solar-leads/",
  "/roofing-leads/",
  "/home-improvement-leads/",
  "/hvac-leads/",
  "/pest-control-leads/",
  "/windows-leads/",
  "/partner-form/",
];

// Image extensions we care about
const IMAGE_EXTS = new Set([
  ".jpg", ".jpeg", ".png", ".gif", ".webp",
  ".svg", ".ico", ".avif", ".bmp",
]);

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Fetch with a generous timeout and a browser-like UA to avoid 403s.
 */
async function fetchHtml(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15_000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; lead4s-importer/1.0; +https://lead4s.com)",
        Accept: "text/html,*/*",
      },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Download a binary file and return { buffer, mimeType, fileSize }.
 */
async function fetchBinary(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30_000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; lead4s-importer/1.0; +https://lead4s.com)",
      },
    });
    if (!res.ok) return null;
    const mimeType = res.headers.get("content-type")?.split(";")[0] ?? null;
    const buf = Buffer.from(await res.arrayBuffer());
    return { buffer: buf, mimeType, fileSize: buf.length };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Extract all image URLs from raw HTML.
 * Captures: <img src>, <img srcset>, <source srcset>, background-image CSS.
 */
function extractImageUrls(html, pageUrl) {
  const found = new Set();

  // <img src="..." and <img data-src="..."
  for (const m of html.matchAll(/(?:data-)?src=["']([^"']+)["']/gi)) {
    found.add(m[1]);
  }

  // srcset="..." – pick each descriptor's URL
  for (const m of html.matchAll(/srcset=["']([^"']+)["']/gi)) {
    for (const part of m[1].split(",")) {
      found.add(part.trim().split(/\s+/)[0]);
    }
  }

  // CSS background-image: url(...)
  for (const m of html.matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
    found.add(m[1]);
  }

  // Resolve relative → absolute and filter to image extensions
  const base = new URL(pageUrl);
  const results = new Set();

  for (const raw of found) {
    if (!raw || raw.startsWith("data:")) continue;
    try {
      const abs = new URL(raw, base).href;
      const ext = extname(new URL(abs).pathname).toLowerCase().split("?")[0];
      if (IMAGE_EXTS.has(ext)) results.add(abs);
    } catch {
      /* skip malformed URLs */
    }
  }

  return results;
}

/**
 * Derive the local public path from an absolute image URL.
 *
 * Rule:
 *   Same-origin URLs  →  keep the pathname as-is
 *     https://lead4s.com/wp-content/uploads/2024/01/img.jpg
 *       → public/wp-content/uploads/2024/01/img.jpg
 *       → served at /wp-content/uploads/2024/01/img.jpg
 *
 *   External URLs  →  store under /ext-images/<hostname>/...
 */
function urlToPublicPath(absUrl) {
  const u = new URL(absUrl);

  if (u.hostname === "lead4s.com" || u.hostname === "www.lead4s.com") {
    // Strip query / fragment, keep the path
    return u.pathname; // e.g. /wp-content/uploads/2024/01/img.jpg
  }

  // External – flatten to /ext-images/<host>/<basename>
  const host = u.hostname.replace(/\./g, "-");
  const basename = u.pathname.split("/").filter(Boolean).pop() || "image";
  return `/ext-images/${host}/${basename}`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const prisma = DRY_RUN ? null : new PrismaClient();

  console.log(`\n🔍  Scraping images from ${BASE_URL}`);
  if (DRY_RUN) console.log("    DRY RUN — nothing will be written\n");

  // 1. Crawl all pages and collect image URLs
  const allImageUrls = new Set();

  for (const slug of PAGES_TO_CRAWL) {
    const pageUrl = `${BASE_URL}${slug}`;
    process.stdout.write(`  ↓ ${pageUrl} ... `);
    const html = await fetchHtml(pageUrl);
    if (!html) {
      console.log("(skipped / not found)");
      continue;
    }
    const found = extractImageUrls(html, pageUrl);
    console.log(`${found.size} images`);
    for (const u of found) allImageUrls.add(u);
  }

  console.log(`\n📦  Total unique images found: ${allImageUrls.size}\n`);

  if (DRY_RUN) {
    for (const u of allImageUrls) console.log("  ", u);
    return;
  }

  // 2. Download & seed
  let saved = 0, skipped = 0, failed = 0;

  for (const imgUrl of allImageUrls) {
    const publicPath = urlToPublicPath(imgUrl); // e.g. /wp-content/uploads/...
    const diskPath = join(ROOT, "public", publicPath); // absolute local path

    let fileSize = null;

    // Check if already on disk; skip download if so
    if (existsSync(diskPath)) {
      try {
        const s = await stat(diskPath);
        fileSize = s.size;
      } catch { /* ignore */ }
      process.stdout.write(`  [exists] ${publicPath}\n`);
    } else {
      process.stdout.write(`  ↓ ${imgUrl.slice(0, 80)}... `);

      const result = await fetchBinary(imgUrl);
      if (!result) {
        console.log("FAILED");
        failed++;
        continue;
      }

      // Ensure directory exists
      await mkdir(dirname(diskPath), { recursive: true });
      await writeFile(diskPath, result.buffer);
      fileSize = result.fileSize;
      console.log(`OK (${Math.round(fileSize / 1024)} KB)`);
    }

    // Upsert into media_images table
    try {
      await prisma.mediaImage.upsert({
        where: { path: publicPath },
        update: { originUrl: imgUrl, fileSize },
        create: {
          path: publicPath,
          originUrl: imgUrl,
          fileSize,
          mimeType: null, // resolved from extension if needed
        },
      });
      saved++;
    } catch (err) {
      console.error(`  [db-err] ${publicPath}: ${err.message}`);
      failed++;
    }
  }

  await prisma?.$disconnect();

  console.log("\n─────────────────────────────────────────");
  console.log(`  Saved   : ${saved}`);
  console.log(`  Skipped : ${skipped}`);
  console.log(`  Failed  : ${failed}`);
  console.log("─────────────────────────────────────────\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
