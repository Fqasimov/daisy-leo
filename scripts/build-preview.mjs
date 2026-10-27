// Assembles a relative-path copy of the static export for the hosted preview
// (any sub-path host). Run via:  npm run preview
// Output: preview-dist/ with entry page preview.html, and preview-dist/files.json
// (published path → source file) for publishing.
import { cp, readdir, readFile, rm, stat, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'out';
const DIR = 'preview-dist';

await rm(DIR, { recursive: true, force: true });
await mkdir(DIR, { recursive: true });

// Every page moves to the same depth (one folder), matching assetPrefix "..".
const PIECES = (await readdir(path.join(SRC, 'kolleksiya'))).filter((n) => !n.includes('.'));
const PAGES = [
  ['index.html', 'az'],
  ['en/index.html', 'en'],
  ...PIECES.flatMap((slug) => [
    [`kolleksiya/${slug}/index.html`, `az-${slug}`],
    [`en/collection/${slug}/index.html`, `en-${slug}`],
  ]),
];
const target = (url) => {
  const [p, hash = ''] = url.split('#');
  let dir = 'az';
  if (p === '/en/') dir = 'en';
  else if (p.startsWith('/kolleksiya/')) dir = `az-${p.split('/')[2]}`;
  else if (p.startsWith('/en/collection/')) dir = `en-${p.split('/')[3]}`;
  return `../${dir}/index.html${hash ? `#${hash}` : ''}`;
};

// The preview host reserves top-level names starting with "_": nest _next/ under n/.
await cp(path.join(SRC, '_next'), path.join(DIR, 'n', '_next'), { recursive: true });
await cp(path.join(SRC, 'images'), path.join(DIR, 'images'), { recursive: true });
await cp(path.join(SRC, 'icon.svg'), path.join(DIR, 'icon.svg'));

for (const [from, dir] of PAGES) {
  let html = await readFile(path.join(SRC, from), 'utf8');
  html = html
    .replaceAll('../_next/', '../n/_next/')
    .replace(/(["\s,(])\/images\//g, '$1../images/')
    .replace(/(["\s,(])\/icon\.svg/g, '$1../icon.svg')
    .replace(/href="(\/(?:en\/|kolleksiya\/[^"#]*|en\/collection\/[^"#]*)?(?:#[^"]*)?)"/g, (_, url) => `href="${target(url)}"`);
  await mkdir(path.join(DIR, dir), { recursive: true });
  await writeFile(path.join(DIR, dir, 'index.html'), html);
}

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    if ((await stat(full)).isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

for (const file of await walk(path.join(DIR, 'n'))) {
  const up = '../'.repeat(path.relative(DIR, file).split(path.sep).length - 1);
  if (file.endsWith('.js')) {
    const js = await readFile(file, 'utf8');
    const out = js.replaceAll('"../_next/"', '"../n/_next/"').replaceAll('\uFFFD', '\\uFFFD');
    if (out !== js) await writeFile(file, out);
  } else if (file.endsWith('.css')) {
    // Stylesheets sit at n/_next/static/chunks/: point /images/ urls back to the root.
    const css = await readFile(file, 'utf8');
    await writeFile(file, css.replaceAll("url('/images/", `url('${up}images/`).replaceAll('url(/images/', `url(${up}images/`));
  }
}

// Entry page: the artifact wraps it in its skeleton, so it only forwards to the site.
await writeFile(
  path.join(DIR, 'preview.html'),
  `<title>Daisy &amp; Leo Design</title>
<style>
  :root { color-scheme: dark }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0e0c0b; color: #efe7d6; font: 15px/1.6 system-ui, sans-serif }
  a { color: #e0c27e }
</style>
<p><a href="az/index.html">Daisy &amp; Leo Design</a></p>
<script>location.replace('az/index.html' + location.hash);</script>
`,
);

const keep = (rel) =>
  !rel.endsWith('.txt') && rel !== 'preview.html' && rel !== 'files.json' && !rel.startsWith('_not-found') && !rel.startsWith('404') && !rel.endsWith('.jpg');

const files = {};
for (const full of await walk(DIR)) {
  const rel = path.relative(DIR, full).split(path.sep).join('/');
  if (keep(rel)) files[rel] = full;
}
await writeFile(path.join(DIR, 'files.json'), JSON.stringify(files, null, 2));
console.log(`${Object.keys(files).length} files in ${DIR}/`);
