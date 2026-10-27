import '@fontsource/gloock/400.css';
import '@fontsource-variable/hanken-grotesk/wght.css';
import '@/app/globals.css';
import type { Metadata, Viewport } from 'next';
import { SITE, type Locale } from '@/data/site';
import { DICT } from '@/i18n/dict';
import { Reveal } from './Reveal';

// Runs before first paint: marks JS as present and decides whether the logo
// intro plays (once per session, never under reduced motion).
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('dl-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro-done')}catch(e){d.classList.add('intro-done')}})()`;

export function siteMetadata(locale: Locale): Metadata {
  const t = DICT[locale].meta;
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t.title, template: `%s — ${SITE.name}` },
    description: t.description,
    alternates: { canonical: locale === 'az' ? '/' : '/en/', languages: { az: '/', en: '/en/' } },
    openGraph: { title: t.title, description: t.description, images: ['/images/sahil.jpg'], locale: locale === 'az' ? 'az_AZ' : 'en_GB' },
    icons: { icon: '/icon.svg' },
  };
}

export const siteViewport: Viewport = { themeColor: '#f0eadb', width: 'device-width', initialScale: 1 };

export function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
