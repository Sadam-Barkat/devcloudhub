import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { writeFile } from "node:fs/promises";

const input = "public/logo/DEV-CLOUD-HUB-LOGO.png";
const outDir = "public";

const outputs = [
  { file: "favicon-16x16.png", size: 16 },
  { file: "favicon-32x32.png", size: 32 },
  { file: "favicon-48x48.png", size: 48 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "android-chrome-192x192.png", size: 192 },
  { file: "android-chrome-512x512.png", size: 512 },
];

const zoomForSize = (size) => {
  // Larger zoom => logo fills more of the tiny favicon square.
  // These values are intentionally aggressive to make the icon look "bigger" in the tab.
  // If the mark isn't perfectly centered in the source PNG, overly aggressive zoom can
  // crop it ("half icon hidden"). Keep it big, but with a bit more breathing room.
  if (size <= 16) return 2.1;
  if (size <= 32) return 1.9;
  if (size <= 48) return 1.7;
  if (size <= 192) return 1.45;
  return 1.3;
};

await mkdir(outDir, { recursive: true });

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getContentCenter = async (filePath) => {
  // Find the center of non-transparent pixels so we can keep the mark centered
  // even if the artwork isn't perfectly centered in the PNG.
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const alphaIndex = channels - 1;

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let found = false;

  // alpha threshold: ignore near-transparent pixels
  const threshold = 16;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels + alphaIndex;
      const a = data[idx];
      if (a > threshold) {
        found = true;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Fallback: if no alpha info (fully opaque), just use the geometric center.
  if (!found) {
    return { cx: width / 2, cy: height / 2, width, height };
  }

  return {
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
    width,
    height,
  };
};

const encodeIco = (images) => {
  // Minimal ICO encoder that stores PNG images in the ICO container.
  // Spec: ICONDIR (6 bytes) + N * ICONDIRENTRY (16 bytes) + image data.
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(count, 4);

  const entries = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;

  images.forEach((img, i) => {
    const w = img.size >= 256 ? 0 : img.size;
    const h = img.size >= 256 ? 0 : img.size;
    const entry = Buffer.alloc(16);
    entry.writeUInt8(w, 0);
    entry.writeUInt8(h, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(img.buffer.length, 8); // bytes in resource
    entry.writeUInt32LE(offset, 12); // offset
    entry.copy(entries, i * 16);
    offset += img.buffer.length;
  });

  return Buffer.concat([header, entries, ...images.map((i) => i.buffer)]);
};

const content = await getContentCenter(input);

const renderFaviconPngBuffer = async (size) => {
  const zoom = zoomForSize(size);
  const zoomSize = Math.max(size, Math.round(size * zoom));
  const scaleX = zoomSize / content.width;
  const scaleY = zoomSize / content.height;
  const scaledCx = content.cx * scaleX;
  const scaledCy = content.cy * scaleY;

  const left = clamp(Math.round(scaledCx - size / 2), 0, zoomSize - size);
  const top = clamp(Math.round(scaledCy - size / 2), 0, zoomSize - size);

  const zoomed = sharp(input)
    .resize(zoomSize, zoomSize, {
      fit: "cover",
      position: "centre",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png();

  return zoomed.extract({ left, top, width: size, height: size }).toBuffer();
};

const icoImages = [];

for (const { file, size } of outputs) {
  // Browsers render favicons at tiny sizes (16/32px). If the logo has internal padding
  // or thin strokes, it can look "smaller" than other sites. We zoom in a bit first.
  const buffer = await renderFaviconPngBuffer(size);
  await writeFile(`${outDir}/${file}`, buffer);
  if (size === 16 || size === 32 || size === 48) {
    icoImages.push({ size, buffer });
  }
}

// Some browsers still request /favicon.ico; make sure it's consistent with the PNGs.
await writeFile(`${outDir}/favicon.ico`, encodeIco(icoImages));

console.log("Generated favicons:", outputs.map((o) => o.file).join(", "));
