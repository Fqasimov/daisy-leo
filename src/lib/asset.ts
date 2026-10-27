/**
 * URL for a file in /public. On the server this is root-relative; in the browser
 * it resolves against wherever the site's /_next/ scripts were served from, so a
 * copy hosted under a sub-path (the preview build) still finds its files.
 */
export function asset(path: string) {
  if (typeof document === 'undefined') return `/${path}`;
  const src = Array.from(document.scripts, (s) => s.src).find((s) => s.includes('/_next/'));
  if (!src) return `/${path}`;
  const root = src.slice(0, src.indexOf('_next/')).replace(/n\/$/, '');
  // Normal deploy at the domain root: keep the server's root-relative form (no hydration diff).
  return root === `${location.origin}/` ? `/${path}` : root + path;
}
