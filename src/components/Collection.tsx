'use client';

import { AppLink as Link } from './AppLink';
import { useLayoutEffect, useRef, useState } from 'react';
import { CATEGORIES, formatPrice, PIECES, type Category } from '@/data/pieces';
import { whatsappLink, type Locale } from '@/data/site';
import { DICT, paths } from '@/i18n/dict';
import { ArrowRight, WhatsApp } from './Icons';
import { Picture } from './Picture';

// Compartment shapes in the fitted insert when everything is shown.
const SHAPE: Record<string, string> = {
  sahil: 'xl',
  kamelya: 'tall',
  nur: 'tall',
  zumrud: 'm',
  gece: 'm',
  'gece-cercive': 'm',
  kulek: 'wide',
};

export function Collection({ locale }: { locale: Locale }) {
  const t = DICT[locale].collection;
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const tabs = useRef<HTMLDivElement>(null);
  const items = filter === 'all' ? PIECES : PIECES.filter((p) => p.category === filter);

  // Slide the ribbon marker under the active tab.
  useLayoutEffect(() => {
    const host = tabs.current;
    const active = host?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!host || !active) return;
    host.style.setProperty('--tab-x', `${active.offsetLeft}px`);
    host.style.setProperty('--tab-w', `${active.offsetWidth}px`);
  }, [filter, locale]);

  const choose = (id: Category | 'all') => {
    if (id === filter) return;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (doc.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doc.startViewTransition(() => setFilter(id));
    } else setFilter(id);
  };

  return (
    <section id="collection" className="collection" aria-labelledby="collection-title">
      <div className="section-head">
        <p className="kicker" data-reveal>
          {t.kicker}
        </p>
        <h2 id="collection-title" className="section-title" data-reveal>
          {t.title}
        </h2>
        <p className="section-lede" data-reveal>
          {t.lede}
        </p>
      </div>

      <div className="tabs" ref={tabs} role="group" aria-label={t.kicker}>
        {CATEGORIES.map((c) => (
          <button key={c.id} type="button" className="tab" aria-pressed={filter === c.id} onClick={() => choose(c.id)}>
            {c.label[locale]}
          </button>
        ))}
        <span className="tabs__ribbon" aria-hidden="true" />
        <span className="tabs__count" aria-live="polite">
          {t.count(items.length)}
        </span>
      </div>

      <ul className="insert" data-filtered={filter !== 'all' || undefined}>
        {items.map((p) => {
          const name = p.name[locale];
          return (
            <li key={p.slug} className="cell" data-shape={filter === 'all' ? SHAPE[p.slug] : 'm'} style={{ viewTransitionName: `cell-${p.slug}` }}>
              <article className="piece-card">
                <div className="piece-card__plate">
                  <Picture
                    name={p.image}
                    alt={`${name} — ${p.kind[locale]}`}
                    focus={p.focus}
                    sizes={SHAPE[p.slug] === 'xl' && filter === 'all' ? '(min-width: 900px) 58vw, 100vw' : '(min-width: 900px) 34vw, 100vw'}
                  />
                </div>
                <div className="piece-card__body">
                  <span className="piece-card__no">{p.no}</span>
                  <h3 className="piece-card__name">
                    <Link href={paths.piece(locale, p.slug)} className="stretched">
                      {name}
                    </Link>
                  </h3>
                  <p className="piece-card__kind">
                    {p.kind[locale]} · {p.size[locale]}
                  </p>
                  <p className="piece-card__summary">{p.summary[locale]}</p>
                  <div className="piece-card__foot">
                    <span className="price">{formatPrice(p.price, locale)}</span>
                    <a
                      className="ask"
                      href={whatsappLink(DICT[locale].piece.message(name))}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${t.ask}: ${name} (WhatsApp)`}
                    >
                      <WhatsApp />
                      {t.ask}
                    </a>
                    <span className="piece-card__view" aria-hidden="true">
                      {t.view}
                      <ArrowRight />
                    </span>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      {items.length === 0 ? <p className="empty">{t.empty}</p> : null}
    </section>
  );
}
