import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = process.cwd();
const sourcePath = path.join(root, "public", "icon.png");
const outputDir = path.join(root, "app");
const outputPath = path.join(outputDir, "favicon.ico");

async function ensureSourceExists(filePath) {
  try {
    await fs.access(filePath);
  } catch {
    throw new Error(`Source image not found: ${filePath}`);
  }
}

async function generate() {
  await ensureSourceExists(sourcePath);
  await fs.mkdir(outputDir, { recursive: true });

  const icon16 = await sharp(sourcePath)
    .resize(16, 16, { fit: "cover" })
    .png()
    .toBuffer();
  const icon32 = await sharp(sourcePath)
    .resize(32, 32, { fit: "cover" })
    .png()
    .toBuffer();
  const icon48 = await sharp(sourcePath)
    .resize(48, 48, { fit: "cover" })
    .png()
    .toBuffer();

  const icoBuffer = await pngToIco([icon16, icon32, icon48]);
  await fs.writeFile(outputPath, icoBuffer);

  console.log(`Favicon generated at ${outputPath}`);
}

try {
  await generate();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Failed to generate favicon:", message);
  process.exit(1);
}
