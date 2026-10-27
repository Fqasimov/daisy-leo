'use client';

import dynamic from 'next/dynamic';
import { useCallback, useRef } from 'react';
import { whatsappLink, type Locale } from '@/data/site';
import { DICT } from '@/i18n/dict';
import { ArrowRight, WhatsApp } from './Icons';

const HeroBox = dynamic(() => import('./HeroBox'), { ssr: false });

export function Hero({ locale }: { locale: Locale }) {
  const t = DICT[locale].hero;
  const root = useRef<HTMLElement>(null);
  const onProgress = useCallback((p: number) => {
    root.current?.style.setProperty('--open', p.toFixed(3));
  }, []);

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__sticky">
        <HeroBox onProgress={onProgress} />
        <noscript>
          <img className="hero__poster" src="/images/box-open.webp" alt="" />
        </noscript>

        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">{t.titleA}</span>
            <span className="hero__line hero__line--b">{t.titleB}</span>
          </h1>
          <p className="hero__lede">{t.lede}</p>
          <div className="hero__actions">
            <a className="btn btn--ink" href="#collection">
              <span>{t.primary}</span>
              <ArrowRight />
            </a>
            <a className="btn btn--line" href={whatsappLink(DICT[locale].generalMessage)} target="_blank" rel="noopener">
              <WhatsApp />
              <span>{t.secondary}</span>
            </a>
          </div>
        </div>

        <div className="hero__foot" aria-hidden="true">
          <span className="hero__caption">{t.caption}</span>
          <span className="hero__hint">
            <span className="hero__meter">
              <span />
            </span>
            {t.scroll}
          </span>
        </div>
      </div>
    </section>
  );
}
