// Renders the Remotion stills the website ships: the walnut texture and the
// open-box poster (no-JS fallback). Usage: npm run stills
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const TMP = 'out-video/stills';
mkdirSync(TMP, { recursive: true });
const browser = process.env.REMOTION_BROWSER ? [`--browser-executable=${process.env.REMOTION_BROWSER}`] : [];
const still = (id, out, extra = []) =>
  execFileSync('npx', ['remotion', 'still', 'src/remotion/index.ts', id, out, '--gl=swangle', '--log=error', ...browser, ...extra], { stdio: 'inherit' });

still('Walnut', `${TMP}/walnut.png`);
await sharp(`${TMP}/walnut.png`).webp({ quality: 78 }).toFile('public/images/walnut.webp');

still('BoxReveal', `${TMP}/box-open.png`, ['--frame=119', '--width=1600', '--height=900']);
await sharp(`${TMP}/box-open.png`).flatten({ background: '#f0eadb' }).webp({ quality: 82 }).toFile('public/images/box-open.webp');
console.log('stills written to public/images');
