#!/usr/bin/env node
/**
 * Convert all images in public/ to WebP for better SEO and performance.
 *
 * Rules:
 *   .jpg / .jpeg  →  Convert to .webp in-place, MOVE original to public/old_images/, DELETE it there
 *   .png          →  Convert to .webp in-place, COPY original to public/old_images/ (keep .png)
 *   .webp / .gif / .svg / .avif  →  Skip (already optimal or cannot be simply converted)
 *
 * After conversion all media_images DB records are updated from the old path to the new .webp path.
 *
 * Usage:
 *   node scripts/convert-to-webp.mjs
 *   node scripts/convert-to-webp.mjs --dry-run     # preview changes, write nothing
 *   node scripts/convert-to-webp.mjs --quality=85  # WebP quality (1-100, default 82)
 */

import sharp from "sharp";
import { PrismaClient } from "@prisma/client";
import {
  existsSync,
  mkdirSync,
  copyFileSync,
  unlinkSync,
  renameSync,
} from "fs";
import { readdir, stat } from "fs/promises";
import { join, dirname, basename, extname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, "..");
const PUBLIC    = join(ROOT, "public");
const OLD_DIR   = join(PUBLIC, "old_images");   // flat archive for original files

// ── CLI args ──────────────────────────────────────────────────────────────────
const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, "").split("=");
    return [k, v.length ? v.join("=") : true];
  })
);
const DRY_RUN = argv["dry-run"] === true || argv["dry-run"] === "true";
const QUALITY = Math.min(100, Math.max(1, parseInt(argv["quality"] ?? "82")));

// Folders to skip entirely (don't touch archives or already-processed data)
const SKIP_DIRS = new Set(["old_images", "old_data", ".next"]);

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Walk a directory recursively and yield absolute file paths.
 */
async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

/**
 * Build a safe flat filename for old_images/ that avoids collisions.
 * Example: /wp-content/uploads/2024/05/photo.jpg  →  wp-content--uploads--2024--05--photo.jpg
 */
function flatName(absPath) {
  const rel = relative(PUBLIC, absPath);          // e.g. wp-content/uploads/2024/05/photo.jpg
  return rel.replace(/[\\/]+/g, "--");             // wp-content--uploads--2024--05--photo.jpg
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const prisma = DRY_RUN ? null : new PrismaClient();

  console.log(`\n🖼️  WebP Converter`);
  console.log(`   Quality : ${QUALITY}`);
  console.log(`   Archive : public/old_images/`);
  if (DRY_RUN) console.log("   DRY RUN — nothing will be written\n");
  else         console.log();

  if (!DRY_RUN) mkdirSync(OLD_DIR, { recursive: true });

  const stats = { converted: 0, skipped: 0, failed: 0, dbUpdated: 0 };

  for await (const absPath of walk(PUBLIC)) {
    const ext = extname(absPath).toLowerCase();

    // Only handle jpg/jpeg/png
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const isJpeg = ext === ".jpg" || ext === ".jpeg";
    const isPng  = ext === ".png";

    // Public-relative path  (used as the DB key)
    const publicPath    = "/" + relative(PUBLIC, absPath).replace(/\\/g, "/");
    const webpPath      = publicPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    const absWebpPath   = join(PUBLIC, webpPath);

    const flat = flatName(absPath);
    const oldArchivePath = join(OLD_DIR, flat);

    console.log(`\n  ${isJpeg ? "🗑️ " : "📋"} ${publicPath}`);
    console.log(`     → ${webpPath}`);

    if (DRY_RUN) {
      const info = await stat(absPath);
      console.log(`     size: ${Math.round(info.size / 1024)} KB  action: ${isJpeg ? "convert + delete original" : "convert + copy original to old_images"}`);
      stats.converted++;
      continue;
    }

    try {
      // 1. Convert to WebP
      await sharp(absPath)
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(absWebpPath);

      const origSize  = (await stat(absPath)).size;
      const webpSize  = (await stat(absWebpPath)).size;
      const saving    = Math.round((1 - webpSize / origSize) * 100);
      console.log(
        `     ${Math.round(origSize / 1024)} KB → ${Math.round(webpSize / 1024)} KB  (${saving > 0 ? `-${saving}%` : `+${Math.abs(saving)}%`})`
      );

      // 2. Handle original file
      if (isPng) {
        // Copy PNG to old_images (preserve it as a backup)
        copyFileSync(absPath, oldArchivePath);
        unlinkSync(absPath);          // remove from its original location
        console.log(`     📦 PNG original archived → old_images/${flat}`);
      } else {
        // JPEG: archive temporarily then delete (no need to keep)
        renameSync(absPath, oldArchivePath);
        unlinkSync(oldArchivePath);   // delete – not needed once WebP exists
        console.log(`     🗑️  JPEG original deleted`);
      }

      // 3. Update DB record if it exists
      try {
        const updated = await prisma.mediaImage.updateMany({
          where: { path: publicPath },
          data:  { path: webpPath, mimeType: "image/webp" },
        });
        if (updated.count > 0) {
          console.log(`     ✅ DB updated: ${publicPath} → ${webpPath}`);
          stats.dbUpdated++;
        }
      } catch {
        /* ignore – DB record may not exist for this file */
      }

      stats.converted++;
    } catch (err) {
      console.error(`     ❌ FAILED: ${err.message}`);
      stats.failed++;
    }
  }

  await prisma?.$disconnect();

  console.log(`
─────────────────────────────────────────
  Converted  : ${stats.converted}
  Skipped    : ${stats.skipped}
  Failed     : ${stats.failed}
  DB updated : ${stats.dbUpdated}
  Archive    : public/old_images/  (PNG backups only)
─────────────────────────────────────────
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
