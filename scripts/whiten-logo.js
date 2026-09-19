/*
 * One-off image job: whiten the dark-green background of logo.png while
 * keeping the gold artwork and any non-green elements untouched.
 *
 * A pixel is recoloured only when it is both DARK and GREENISH — the emblem's
 * background. Gold (bright, warm) and neutral dark pixels (text, outlines)
 * keep their colour. The blend is smooth so anti-aliased edges stay clean.
 * Transparent pixels are never touched.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const FILES = [
  path.resolve(__dirname, "..", "logo.png"),
  path.resolve(__dirname, "..", "public", "logo.png"),
];

async function whiten(FILE) {
  const image = sharp(FILE);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = info.width * info.height;
  for (let i = 0; i < px; i++) {
    const o = i * 4;
    const a = data[o + 3];
    if (a === 0) continue; // transparent — leave it

    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const greenness = g - Math.max(r, b); // >0 when green dominates

    // Two gates: how green, and how dark. Both must say "background".
    const greenGate = Math.min(Math.max(greenness / 30, 0), 1);
    const darkGate = Math.min(Math.max((150 - lum) / 90, 0), 1);
    const t = greenGate * darkGate;
    if (t <= 0) continue;

    data[o] = Math.round(r + (255 - r) * t);
    data[o + 1] = Math.round(g + (255 - g) * t);
    data[o + 2] = Math.round(b + (255 - b) * t);
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(FILE + ".tmp");

  fs.renameSync(FILE + ".tmp", FILE);
  console.log(`done: ${path.basename(path.dirname(FILE))}/logo.png ${info.width}x${info.height} background whitened`);
}

async function main() {
  for (const file of FILES) await whiten(file);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
