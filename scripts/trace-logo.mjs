// Traces the lion + flower mark from the reference logo photo into SVG paths.
// Output: src/brand/logo-paths.ts ({ viewBox, mane: string[], flower: string })
import sharp from 'sharp';
import potrace from 'potrace';
import { writeFile, mkdir } from 'node:fs/promises';

const SRC = 'references/images/06-logo.jpg';
const CROP = { left: 200, top: 130, width: 360, height: 360 };
const SCALE = 4;

const { data, info } = await sharp(SRC)
  .extract(CROP)
  .resize(CROP.width * SCALE, CROP.height * SCALE, { kernel: 'lanczos3' })
  .blur(2.2)
  .raw()
  .toBuffer({ resolveWithObject: true });

// Ink = anything that is not the black ground (max channel above threshold).
const mask = Buffer.alloc(info.width * info.height);
for (let i = 0; i < mask.length; i++) {
  const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
  mask[i] = Math.max(r, g, b) > 46 ? 0 : 255;
}
const png = await sharp(mask, { raw: { width: info.width, height: info.height, channels: 1 } }).png().toBuffer();

const svg = await new Promise((res, rej) =>
  potrace.trace(png, { turdSize: 120, optTolerance: 0.4, alphaMax: 1.0, threshold: 128 }, (e, s) => (e ? rej(e) : res(s))),
);
const d = svg.match(/ d="([^"]+)"/)[1];

// Split into subpaths. 0–9 are the mark (4 = flower); the rest are wordmark fragments.
const subs = d.split(/(?=M)/).map((x) => x.trim()).filter(Boolean);
const ORDER = [0, 2, 5, 7, 8, 9, 6, 3, 1]; // mane, clockwise from the top
const FLOWER = 4;

const nums = (x) => x.match(/-?[\d.]+/g).map(Number);
let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
for (const i of [...ORDER, FLOWER]) {
  const n = nums(subs[i]);
  for (let k = 0; k < n.length; k += 2) {
    minx = Math.min(minx, n[k]); maxx = Math.max(maxx, n[k]);
    miny = Math.min(miny, n[k + 1]); maxy = Math.max(maxy, n[k + 1]);
  }
}
const pad = 8, ox = minx - pad, oy = miny - pad;
const shift = (x) => { let i = 0; return x.replace(/-?[\d.]+/g, (m) => String(Math.round((Number(m) - (i++ % 2 === 0 ? ox : oy)) * 10) / 10)); };
const out = {
  viewBox: `0 0 ${Math.round(maxx - minx + 2 * pad)} ${Math.round(maxy - miny + 2 * pad)}`,
  mane: ORDER.map((i) => shift(subs[i])),
  flower: shift(subs[FLOWER]),
};
await mkdir('src/brand', { recursive: true });
await writeFile(
  'src/brand/logo-paths.ts',
  `// Traced from references/images/06-logo.jpg by scripts/trace-logo.mjs (potrace).\n// Mane strokes are ordered clockwise from the top; the flower sits at the centre.\nexport const LOGO = ${JSON.stringify(out, null, 2)} as const;\n`,
);
console.log('wrote src/brand/logo-paths.ts', out.viewBox);
