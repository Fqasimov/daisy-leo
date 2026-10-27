'use client';

import { AppLink as Link } from './AppLink';
import { useEffect, useState } from 'react';
import { LogoMark } from '@/brand/LogoMark';
import { whatsappLink, type Locale } from '@/data/site';
import { DICT, paths } from '@/i18n/dict';
import { WhatsApp } from './Icons';

type Props = { locale: Locale; /** Path of this page in the other language. */ alternate: string; onHome?: boolean };

export function Header({ locale, alternate, onHome = true }: Props) {
  const t = DICT[locale];
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const home = paths.home(locale);
  const anchor = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    ['collection', t.nav.collection],
    ['material', t.nav.material],
    ['gift', t.nav.gift],
    ['order', t.nav.order],
  ] as const;

  return (
    <header className="site-header" data-solid={solid || open || undefined}>
      <div className="site-header__bar">
        <Link href={home} className="brand" aria-label={t.nav.home} onClick={() => setOpen(false)}>
          <LogoMark tone="currentColor" className="brand__mark" />
          <span className="brand__name">Daisy &amp; Leo</span>
        </Link>

        <nav className="site-nav" aria-label={t.nav.menu}>
          {links.map(([id, label]) => (
            <a key={id} href={anchor(id)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="site-header__end">
          <div className="lang" aria-label={t.nav.language}>
            <span aria-current="true">{locale.toUpperCase()}</span>
            <Link href={alternate} hrefLang={locale === 'az' ? 'en' : 'az'} lang={locale === 'az' ? 'en' : 'az'}>
              {locale === 'az' ? 'EN' : 'AZ'}
            </Link>
          </div>
          <a className="btn btn--ink btn--sm header-cta" href={whatsappLink(t.generalMessage)} target="_blank" rel="noopener">
            <WhatsApp />
            <span>{t.nav.write}</span>
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </div>

      <div id="site-menu" className="menu-sheet" data-open={open || undefined} inert={!open}>
        <nav aria-label={t.nav.menu}>
          {links.map(([id, label], i) => (
            <a key={id} href={anchor(id)} onClick={() => setOpen(false)} style={{ '--i': i } as React.CSSProperties}>
              <span className="menu-sheet__no">0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <a className="btn btn--ink" href={whatsappLink(t.generalMessage)} target="_blank" rel="noopener">
          <WhatsApp />
          <span>{t.order.whatsapp}</span>
        </a>
      </div>
    </header>
  );
}
