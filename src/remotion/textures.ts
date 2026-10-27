// Procedural material textures for the 3D gift box, drawn once on a canvas.
// Deterministic (seeded) so every render and every visitor sees the same grain.
import { LOGO } from '../brand/logo-paths';
import { C } from '../brand/palette';

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!] as const;
}

/** Walnut-stained birch, like the studio's box: long soft grain lines. */
export function woodCanvas(w = 1024, h = 1024, seed = 7) {
  const [c, g] = canvas(w, h);
  const r = rng(seed);
  g.fillStyle = '#6b513e';
  g.fillRect(0, 0, w, h);
  // Broad stain variation in bands.
  for (let i = 0; i < 26; i++) {
    const y = r() * h;
    g.fillStyle = r() > 0.5 ? 'rgba(40,27,18,0.10)' : 'rgba(120,92,68,0.08)';
    g.fillRect(0, y, w, 20 + r() * 90);
  }
  // Grain lines.
  for (let i = 0; i < 340; i++) {
    const y0 = r() * h;
    const amp = 2 + r() * 10;
    const freq = 0.002 + r() * 0.006;
    const phase = r() * Math.PI * 2;
    g.beginPath();
    for (let x = 0; x <= w; x += 8) {
      const y = y0 + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 3.1 + phase) * amp * 0.25;
      if (x === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    const dark = r() > 0.35;
    g.strokeStyle = dark ? `rgba(32,22,15,${0.08 + r() * 0.22})` : `rgba(150,118,88,${0.05 + r() * 0.12})`;
    g.lineWidth = 0.6 + r() * 1.8;
    g.stroke();
  }
  return c;
}

/** The lid: wood with the mark and name engraved (burnt in, debossed). */
export function lidCanvas(seed = 7) {
  const S = 1024;
  const [c, g] = canvas(S, S);
  g.drawImage(woodCanvas(S, S, seed), 0, 0);

  const [, , vw, vh] = LOGO.viewBox.split(' ').map(Number);
  const markH = S * 0.34;
  const k = markH / vh;
  const engrave = (dx: number, dy: number, color: string) => {
    g.save();
    g.translate(S / 2 - (vw * k) / 2 + dx, S * 0.2 + dy);
    g.scale(k, k);
    g.fillStyle = color;
    for (const d of [...LOGO.mane, LOGO.flower]) g.fill(new Path2D(d));
    g.restore();
  };
  // Deboss: a light lower-right lip, then the burnt cut.
  engrave(1.5, 1.5, 'rgba(160,128,96,0.35)');
  engrave(0, 0, 'rgba(30,19,12,0.82)');

  g.textAlign = 'center';
  const text = (t: string, y: number, size: number, font: string, track = 0) => {
    g.font = `${size}px ${font}`;
    if ('letterSpacing' in g) (g as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${track}px`;
    g.fillStyle = 'rgba(160,128,96,0.35)';
    g.fillText(t, S / 2 + 1.5, y + 1.5);
    g.fillStyle = 'rgba(30,19,12,0.85)';
    g.fillText(t, S / 2, y);
  };
  text('Daisy & Leo', S * 0.7, 92, 'Gloock, Georgia, serif');
  text('THE LUXURY', S * 0.79, 30, '"Hanken Grotesk Variable", system-ui, sans-serif', 12);
  return c;
}

/** Black satin ribbon printed in gold, like the studio's. */
export function ribbonCanvas() {
  const W = 2048;
  const H = 128;
  const [c, g] = canvas(W, H);
  g.fillStyle = C.satin;
  g.fillRect(0, 0, W, H);
  // Satin: soft sheen along the weave, brighter selvedges.
  g.fillStyle = 'rgba(255,240,230,0.06)';
  g.fillRect(0, H * 0.18, W, H * 0.22);
  g.fillStyle = 'rgba(255,240,230,0.14)';
  g.fillRect(0, 3, W, 2);
  g.fillRect(0, H - 5, W, 2);
  g.font = '56px Gloock, Georgia, serif';
  g.fillStyle = C.goldLight;
  g.textBaseline = 'middle';
  const label = 'Daisy & Leo Design';
  const step = g.measureText(label).width + 140;
  for (let x = 40; x < W; x += step) g.fillText(label, x, H / 2 + 4);
  return c;
}

export async function ensureFonts() {
  if (typeof document === 'undefined' || !document.fonts) return;
  await Promise.all([
    document.fonts.load('92px Gloock'),
    document.fonts.load('30px "Hanken Grotesk Variable"'),
  ]).catch(() => undefined);
}
