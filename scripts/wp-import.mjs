#!/usr/bin/env node
/**
 * WordPress to Next.js blog importer
 *
 * Usage:
 *   node scripts/wp-import.mjs --sql=./backup.sql
 *   node scripts/wp-import.mjs --sql=./backup.sql --uploads=./wp-content/uploads
 *   node scripts/wp-import.mjs --sql=./backup.sql --uploads=./wp-content/uploads --prefix=wp_
 *
 * Install required dep first:
 *   npm install -D turndown
 */

import { PrismaClient } from "@prisma/client";
import { readFileSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import TurndownService from "turndown";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// CLI args
const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [k, ...rest] = arg.replace(/^--/, "").split("=");
    return [k, rest.join("=")];
  })
);

if (!args.sql) {
  console.error(`
Usage:
  node scripts/wp-import.mjs --sql=<dump.sql> [--uploads=<wp-content/uploads>] [--prefix=wp_]

  --sql       Path to WordPress SQL dump (required)
  --uploads   Path to wp-content/uploads directory (copies images locally)
  --prefix    WordPress table prefix, default: wp_
`);
  process.exit(1);
}

const SQL_FILE = args.sql;
const UPLOADS_DIR = args.uploads ?? null;
const TABLE_PREFIX = args.prefix ?? "wp_";
const PUBLIC_IMAGES_DIR = join(ROOT, "public", "blog-images");

// SQL parser

function extractTable(sql, table) {
  const re = new RegExp(
    `INSERT INTO \`?${table}\`?\\s*(\\([^)]+\\))?\\s*VALUES\\s*([\\s\\S]+?);`,
    "gi"
  );

  let columns = null;
  const rows = [];

  let m;
  while ((m = re.exec(sql)) !== null) {
    if (m[1]) {
      columns = m[1]
        .replace(/[`()]/g, "")
        .split(",")
        .map((c) => c.trim());
    }
    for (const rowStr of splitValueBlock(m[2])) {
      rows.push(parseRow(rowStr));
    }
  }

  return { columns, rows };
}

function splitValueBlock(block) {
  const result = [];
  let depth = 0, inStr = false, escape = false, start = 0;

  for (let i = 0; i < block.length; i++) {
    const c = block[i];
    if (escape) { escape = false; continue; }
    if (c === "\\") { escape = true; continue; }
    if (c === "'") { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === "(") { if (depth++ === 0) start = i + 1; }
    if (c === ")") { if (--depth === 0) result.push(block.slice(start, i)); }
  }

  return result;
}

function parseRow(rowStr) {
  const vals = [];
  let i = 0;

  while (i < rowStr.length) {
    while (i < rowStr.length && (rowStr[i] === " " || rowStr[i] === ",")) i++;
    if (i >= rowStr.length) break;

    if (rowStr[i] === "'") {
      i++;
      let s = "";
      while (i < rowStr.length) {
        if (rowStr[i] === "\\" && rowStr[i + 1] === "'") { s += "'"; i += 2; continue; }
        if (rowStr[i] === "\\" && rowStr[i + 1] === "\\") { s += "\\"; i += 2; continue; }
        if (rowStr[i] === "\\" && rowStr[i + 1] === "n") { s += "\n"; i += 2; continue; }
        if (rowStr[i] === "\\" && rowStr[i + 1] === "r") { s += "\r"; i += 2; continue; }
        if (rowStr[i] === "'") { i++; break; }
        s += rowStr[i++];
      }
      vals.push(s);
    } else {
      let token = "";
      while (i < rowStr.length && rowStr[i] !== ",") token += rowStr[i++];
      vals.push(token.trim() === "NULL" ? null : token.trim());
    }
  }

  return vals;
}

function toObjects(columns, rows, fallbackCols) {
  const cols = columns ?? fallbackCols;
  return rows.map((row) => {
    const obj = {};
    cols.forEach((k, idx) => { obj[k] = row[idx] ?? null; });
    return obj;
  });
}

const WP_POSTS_FALLBACK = [
  "ID", "post_author", "post_date", "post_date_gmt", "post_content",
  "post_title", "post_excerpt", "post_status", "comment_status",
  "ping_status", "post_password", "post_name", "to_ping", "pinged",
  "post_modified", "post_modified_gmt", "post_content_filtered",
  "post_parent", "guid", "menu_order", "post_type", "post_mime_type",
  "comment_count",
];

const WP_POSTMETA_FALLBACK = ["meta_id", "post_id", "meta_key", "meta_value"];

// Image helpers

function localizeImage(wpUrl, uploadsDir) {
  if (!uploadsDir || !wpUrl) return wpUrl;
  const match = wpUrl.match(/\/uploads\/([^?"'\s)]+)/);
  if (!match) return wpUrl;

  const relPath = match[1];
  const srcPath = join(uploadsDir, relPath);
  if (!existsSync(srcPath)) return wpUrl;

  const destName = relPath.replace(/\//g, "-");
  const destPath = join(PUBLIC_IMAGES_DIR, destName);
  try {
    copyFileSync(srcPath, destPath);
    return `/blog-images/${destName}`;
  } catch {
    return wpUrl;
  }
}

function localizeMarkdownImages(markdown, uploadsDir) {
  if (!uploadsDir) return markdown;
  return markdown.replace(
    /(https?:\/\/[^\s)]+\/wp-content\/uploads\/[^\s)"']+)/g,
    (url) => localizeImage(url, uploadsDir)
  );
}

function slugify(str) {
  return (str ?? "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Main

async function main() {
  const prisma = new PrismaClient();
  const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
  td.keep(["figure", "figcaption"]);

  mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });

  console.log(`\nReading SQL dump: ${SQL_FILE}`);
  const sql = readFileSync(SQL_FILE, "utf-8");

  // Extract posts
  const postsTable = `${TABLE_PREFIX}posts`;
  console.log(`Parsing \`${postsTable}\`...`);
  const { columns: postCols, rows: postRows } = extractTable(sql, postsTable);
  const allPosts = toObjects(postCols, postRows, WP_POSTS_FALLBACK);

  const publishedPosts = allPosts.filter(
    (p) => p.post_type === "post" && p.post_status === "publish"
  );
  const attachments = allPosts.filter((p) => p.post_type === "attachment");

  console.log(`Found ${publishedPosts.length} published posts, ${attachments.length} attachments`);

  // Attachment ID → URL map
  const attachmentMap = Object.fromEntries(
    attachments.map((a) => [String(a.ID), a.guid])
  );

  // Extract postmeta for featured images
  const metaTable = `${TABLE_PREFIX}postmeta`;
  console.log(`Parsing \`${metaTable}\`...`);
  const { columns: metaCols, rows: metaRows } = extractTable(sql, metaTable);
  const allMeta = toObjects(metaCols, metaRows, WP_POSTMETA_FALLBACK);

  const featuredImageMap = {};
  for (const meta of allMeta) {
    if (meta.meta_key === "_thumbnail_id") {
      featuredImageMap[String(meta.post_id)] = attachmentMap[String(meta.meta_value)] ?? null;
    }
  }

  // Import
  console.log(`\nImporting posts...\n`);
  let imported = 0, skipped = 0;

  for (const post of publishedPosts) {
    const slug = post.post_name || slugify(post.post_title ?? "");
    if (!slug) {
      console.log(`  [skip] no slug: "${post.post_title}"`);
      skipped++;
      continue;
    }

    const html = post.post_content ?? "";
    let markdown = html.trim() ? td.turndown(html) : "";
    markdown = localizeMarkdownImages(markdown, UPLOADS_DIR);

    let coverImage = featuredImageMap[String(post.ID)] ?? null;
    if (coverImage) coverImage = localizeImage(coverImage, UPLOADS_DIR);

    const wpExcerpt = (post.post_excerpt ?? "").trim();
    const excerpt = wpExcerpt || markdown.replace(/[#*`\[\]!]/g, "").slice(0, 220).trim();

    const createdAt = post.post_date ? new Date(post.post_date) : new Date();

    try {
      await prisma.blog.upsert({
        where: { slug },
        update: {
          title: post.post_title ?? slug,
          excerpt,
          content: markdown,
          coverImage,
          author: "Admin",
        },
        create: {
          slug,
          title: post.post_title ?? slug,
          excerpt,
          content: markdown,
          coverImage,
          author: "Admin",
          createdAt,
        },
      });
      console.log(`  [ok]   ${post.post_title}`);
      imported++;
    } catch (err) {
      console.error(`  [fail] ${post.post_title}: ${err.message}`);
      skipped++;
    }
  }

  await prisma.$disconnect();

  console.log(`\n─────────────────────────────`);
  console.log(`Imported : ${imported}`);
  console.log(`Skipped  : ${skipped}`);
  if (UPLOADS_DIR) console.log(`Images   : public/blog-images/`);
  console.log(`─────────────────────────────\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
