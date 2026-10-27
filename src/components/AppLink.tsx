import Link from 'next/link';
import type { ComponentProps } from 'react';

// The hosted preview rewrites hrefs to relative files, so it uses plain anchors
// (full page loads) instead of Next's client router.
const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === '1';

export function AppLink(props: ComponentProps<typeof Link>) {
  if (PREVIEW) {
    const { href, prefetch: _p, replace: _r, scroll: _s, ...rest } = props;
    return <a href={String(href)} {...rest} />;
  }
  return <Link {...props} />;
}
