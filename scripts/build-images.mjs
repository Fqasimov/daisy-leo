// Crops the studio's Instagram photos (removing the IG mute icon and status-bar
// remnants) and writes responsive WebP + JPEG fallbacks to public/images/.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'references/images';
const OUT = 'public/images';
const WIDTHS = [640, 1100];

// [output name, source file, crop {left, top, width, height}]
const JOBS = [
  ['sahil', '01-agate-wall-clock.jpg', { left: 0, top: 0, width: 1170, height: 1330 }],
  ['sahil-detail', '02-agate-wall-clock-detail.jpg', { left: 0, top: 0, width: 1169, height: 1330 }],
  ['kamelya-detail', '03-camellia-mirror-detail.jpg', { left: 0, top: 22, width: 1169, height: 1418 }],
  ['kamelya', '04-camellia-mirror.jpg', { left: 0, top: 12, width: 1169, height: 1408 }],
  ['nur', '05-calligraphy-graphite-panel.jpg', { left: 0, top: 0, width: 1169, height: 1400 }],
  ['zumrud', '07-calligraphy-emerald-gift.jpg', { left: 0, top: 12, width: 1169, height: 1418 }],
  ['kulek', '08-wind-turbine-plaque.jpg', { left: 0, top: 16, width: 1170, height: 1414 }],
  ['gece-set', '09-desk-clock-and-frame.jpg', { left: 0, top: 34, width: 1170, height: 1396 }],
  ['gece-saat', '09-desk-clock-and-frame.jpg', { left: 40, top: 60, width: 700, height: 1300 }],
  ['gece-cercive', '09-desk-clock-and-frame.jpg', { left: 600, top: 600, width: 570, height: 830 }],
  ['qutu', '07-calligraphy-emerald-gift.jpg', { left: 0, top: 860, width: 1169, height: 570 }],
];

await mkdir(OUT, { recursive: true });
for (const [name, file, crop] of JOBS) {
  const base = sharp(`${SRC}/${file}`).extract(crop);
  for (const w of WIDTHS) {
    const width = Math.min(w, crop.width);
    await base.clone().resize({ width }).webp({ quality: 80 }).toFile(`${OUT}/${name}-${w}.webp`);
  }
  await base.clone().resize({ width: Math.min(1100, crop.width) }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/${name}.jpg`);
  console.log('✓', name);
}

// Circular face of the Sahil clock, squared from its slight perspective, for the 3D disc.
await sharp(`${SRC}/01-agate-wall-clock.jpg`)
  .extract({ left: 34, top: 108, width: 1108, height: 1222 })
  .resize(1024, 1024, { fit: 'fill' })
  .composite([{ input: Buffer.from('<svg width="1024" height="1024"><circle cx="512" cy="512" r="512" fill="#fff"/></svg>'), blend: 'dest-in' }])
  .webp({ quality: 86 })
  .toFile(`${OUT}/tex-sahil-face.webp`);
console.log('✓ tex-sahil-face');
