import type { Metadata } from 'next';
import { AppLink as Link } from './AppLink';
import { formatPrice, PIECES, type Piece } from '@/data/pieces';
import { instagramLink, whatsappLink, type Locale } from '@/data/site';
import { DICT, paths } from '@/i18n/dict';
import { Header } from './Header';
import { ArrowLeft, ArrowRight, Instagram, WhatsApp } from './Icons';
import { Picture } from './Picture';
import { Footer, RibbonBand } from './Sections';

export function pieceMetadata(piece: Piece, locale: Locale): Metadata {
  const other = locale === 'az' ? 'en' : 'az';
  return {
    title: `${piece.name[locale]} — ${piece.kind[locale]}`,
    description: piece.summary[locale],
    alternates: {
      canonical: paths.piece(locale, piece.slug),
      languages: { [other]: paths.piece(other, piece.slug), [locale]: paths.piece(locale, piece.slug) },
    },
    openGraph: { images: [`/images/${piece.image}.jpg`] },
  };
}

export function PiecePage({ piece, locale }: { piece: Piece; locale: Locale }) {
  const d = DICT[locale];
  const t = d.piece;
  const name = piece.name[locale];
  const others = PIECES.filter((p) => p.slug !== piece.slug).slice(0, 3);

  return (
    <>
      <Header locale={locale} alternate={paths.piece(locale === 'az' ? 'en' : 'az', piece.slug)} onHome={false} />
      <main className="piece">
        <div className="piece__gallery">
          <figure className="piece__main" data-reveal="clip">
            <Picture name={piece.image} alt={`${name} — ${piece.kind[locale]}`} sizes="(min-width: 900px) 56vw, 100vw" priority />
          </figure>
          {piece.detail ? (
            <figure className="piece__detail" data-reveal="clip">
              <Picture name={piece.detail} alt={`${name}: ${locale === 'az' ? 'yaxın plan' : 'detail'}`} sizes="(min-width: 900px) 56vw, 100vw" />
            </figure>
          ) : null}
        </div>

        <aside className="piece__info">
          <Link className="back" href={`${paths.home(locale)}#collection`}>
            <ArrowLeft />
            {t.back}
          </Link>
          <p className="piece__no">
            {piece.no} · {piece.kind[locale]}
          </p>
          <h1 className="piece__name">{name}</h1>
          <p className="piece__story">{piece.story[locale]}</p>

          <dl className="specs">
            <div>
              <dt>{t.materials}</dt>
              <dd>{piece.materials.map((m) => m[locale]).join(', ')}</dd>
            </div>
            <div>
              <dt>{t.size}</dt>
              <dd>{piece.size[locale]}</dd>
            </div>
            <div>
              <dt>{t.price}</dt>
              <dd className="price price--lg">{formatPrice(piece.price, locale)}</dd>
            </div>
          </dl>

          <div className="piece__actions">
            <a className="btn btn--ink btn--lg" href={whatsappLink(t.message(name))} target="_blank" rel="noopener">
              <WhatsApp />
              <span>{t.ask}</span>
            </a>
            <a className="btn btn--line btn--lg" href={instagramLink} target="_blank" rel="noopener">
              <Instagram />
              <span>{t.dm}</span>
            </a>
          </div>
          <p className="piece__note">{t.handmade}</p>
        </aside>
      </main>

      <RibbonBand locale={locale} />

      <section className="more" aria-labelledby="more-title">
        <h2 id="more-title" className="section-title">
          {t.more}
        </h2>
        <ul className="more__list">
          {others.map((p) => (
            <li key={p.slug} className="more__item" data-reveal>
              <Link href={paths.piece(locale, p.slug)}>
                <Picture name={p.image} alt={`${p.name[locale]} — ${p.kind[locale]}`} focus={p.focus} sizes="(min-width: 900px) 30vw, 90vw" />
                <span className="more__name">
                  {p.name[locale]}
                  <ArrowRight />
                </span>
                <span className="more__meta">
                  {p.kind[locale]} · {formatPrice(p.price, locale)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer locale={locale} />
    </>
  );
}
