/** Builds a labelled contact sheet of the ingested photographs, for art direction. */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { photos } from "../src/data/photos.generated.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2];
const start = Number(process.argv[3] ?? 0);
const count = Number(process.argv[4] ?? 40);

const CELL = 240;
const COLS = 8;
const PAD = 22;

const slice = photos.slice(start, start + count);
const rows = Math.ceil(slice.length / COLS);
const W = COLS * (CELL + PAD) + PAD;
const H = rows * (CELL + PAD + 18) + PAD;

const composites = [];
const labels = [];

for (let i = 0; i < slice.length; i++) {
  const p = slice[i];
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const left = PAD + col * (CELL + PAD);
  const top = PAD + row * (CELL + PAD + 18);
  const buf = await sharp(join(root, "public", p.src))
    .resize(CELL, CELL, { fit: "contain", background: "#111" })
    .jpeg({ quality: 80 })
    .toBuffer();
  composites.push({ input: buf, left, top });
  labels.push(
    `<text x="${left + 2}" y="${top + CELL + 14}" font-family="monospace" font-size="13" fill="#eee">${
      start + i
    } ${p.id}</text>`
  );
}

const svg = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${labels.join("")}</svg>`
);

await sharp({ create: { width: W, height: H, channels: 3, background: "#1a1a1a" } })
  .composite([...composites, { input: svg, left: 0, top: 0 }])
  .jpeg({ quality: 78 })
  .toFile(out);

console.log(`${slice.length} cells -> ${out} (${W}x${H})`);
