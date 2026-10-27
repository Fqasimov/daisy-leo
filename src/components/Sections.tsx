import { AppLink as Link } from './AppLink';
import { LogoMark } from '@/brand/LogoMark';
import { LOGO } from '@/brand/logo-paths';
import { instagramLink, SITE, whatsappLink, type Locale } from '@/data/site';
import { DICT, paths } from '@/i18n/dict';
import { ArrowRight, Instagram, WhatsApp } from './Icons';
import { Picture } from './Picture';

/** The black satin ribbon printed in gold, crossing between chapters. */
export function RibbonBand({ locale, tone = 'tissue' }: { locale: Locale; tone?: 'tissue' | 'emerald' }) {
  const label = DICT[locale].ribbon;
  return (
    <div className="ribbon-band" data-tone={tone} aria-hidden="true">
      <div className="ribbon-band__strip">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i}>
            {label}
            <Daisy />
          </span>
        ))}
      </div>
    </div>
  );
}

/** The flower from the heart of the mark, used as a small ornament. */
export function Daisy({ className = 'daisy' }: { className?: string }) {
  // Flower path's own bounds inside the traced logo.
  return (
    <svg className={className} viewBox="430 466 452 452" aria-hidden="true">
      <path d={LOGO.flower} fill="currentColor" />
    </svg>
  );
}

const NOTE_POS = [
  { x: 73, y: 12 },
  { x: 47, y: 42 },
  { x: 79, y: 36 },
  { x: 24, y: 72 },
];

export function Material({ locale }: { locale: Locale }) {
  const t = DICT[locale].material;
  return (
    <section id="material" className="material" aria-labelledby="material-title">
      <div className="material__text">
        <p className="kicker" data-reveal>
          {t.kicker}
        </p>
        <h2 id="material-title" className="section-title" data-reveal>
          {t.title}
        </h2>
        <p className="section-lede" data-reveal>
          {t.body}
        </p>
        <ol className="notes">
          {t.notes.map((n, i) => (
            <li key={n.label} className="note" data-n={i + 1} data-reveal style={{ '--i': i } as React.CSSProperties}>
              <span className="note__no">{i + 1}</span>
              <span>
                <strong>{n.label}</strong>
                {n.text}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <figure className="material__figure" data-reveal="clip">
        <Picture name="sahil-detail" alt={locale === 'az' ? 'Sahil saatının yaxın planı: daşlar, qızılı varaq və rəqəmlər' : 'Close-up of the Sahil clock: stones, gold leaf and numerals'} sizes="(min-width: 900px) 55vw, 100vw" />
        {NOTE_POS.map((p, i) => (
          <span key={i} className="pin" data-n={i + 1} style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-hidden="true">
            {i + 1}
          </span>
        ))}
      </figure>
      <figure className="material__inset" data-reveal="clip">
        <Picture name="kamelya-detail" alt={locale === 'az' ? 'Kamelya güzgüsü: qızılı varaq zərrələri və yonulmuş çiçək' : 'Camellia mirror: gold leaf flakes and the sculpted flower'} sizes="(min-width: 900px) 24vw, 60vw" />
      </figure>
    </section>
  );
}

export function Gift({ locale }: { locale: Locale }) {
  const t = DICT[locale].gift;
  return (
    <section id="gift" className="gift" aria-labelledby="gift-title">
      <figure className="gift__hero" data-reveal="clip">
        <Picture name="zumrud" alt={locale === 'az' ? 'Zümrüd kalliqrafiyası həkk olunmuş taxta qutunun və atlaz lentin üstündə' : 'Zümrüd calligraphy on its engraved wooden box with the satin ribbon'} sizes="(min-width: 900px) 46vw, 100vw" />
        <figcaption>{t.caption}</figcaption>
      </figure>
      <div className="gift__text">
        <p className="kicker" data-reveal>
          {t.kicker}
        </p>
        <h2 id="gift-title" className="section-title" data-reveal>
          {t.title}
        </h2>
        <p className="section-lede" data-reveal>
          {t.body}
        </p>
        <ul className="gift__points">
          {t.points.map((pt, i) => (
            <li key={pt} data-reveal style={{ '--i': i } as React.CSSProperties}>
              <Daisy />
              {pt}
            </li>
          ))}
        </ul>
        <a className="btn btn--gold" href={whatsappLink(DICT[locale].giftMessage)} target="_blank" rel="noopener" data-reveal>
          <WhatsApp />
          <span>{t.cta}</span>
        </a>
        <figure className="gift__box" data-reveal="clip">
          <Picture name="qutu" alt={locale === 'az' ? 'Həkk olunmuş «Daisy&Leo The Luxury» qutusu və qızılı yazılı lent' : 'The engraved “Daisy&Leo The Luxury” box and the gold-printed ribbon'} sizes="(min-width: 900px) 40vw, 100vw" />
        </figure>
      </div>
    </section>
  );
}

const ROMAN = ['I', 'II', 'III', 'IV'];

export function Commission({ locale }: { locale: Locale }) {
  const t = DICT[locale].commission;
  return (
    <section id="commission" className="commission" aria-labelledby="commission-title">
      <div className="commission__head">
        <p className="kicker" data-reveal>
          {t.kicker}
        </p>
        <h2 id="commission-title" className="section-title" data-reveal>
          {t.title}
        </h2>
      </div>
      <figure className="commission__figure" data-reveal="clip">
        <Picture name="kulek" alt={locale === 'az' ? 'Külək: gecə mavisi qatranda qızılı külək turbinləri' : 'Külək: gold wind turbines in night-blue resin'} sizes="(min-width: 900px) 36vw, 100vw" />
        <figcaption>{t.caption}</figcaption>
      </figure>
      <div className="commission__body">
        <p className="section-lede" data-reveal>
          {t.body}
        </p>
        <ol className="steps">
          {t.steps.map((s, i) => (
            <li key={s.t} className="step" data-reveal style={{ '--i': i } as React.CSSProperties}>
              <span className="step__no">{ROMAN[i]}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
        <a className="btn btn--ink" href={whatsappLink(DICT[locale].commissionMessage)} target="_blank" rel="noopener" data-reveal>
          <span>{t.cta}</span>
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}

export function Order({ locale }: { locale: Locale }) {
  const t = DICT[locale].order;
  return (
    <section id="order" className="order" aria-labelledby="order-title">
      <LogoMark className="order__mark" />
      <p className="kicker" data-reveal>
        {t.kicker}
      </p>
      <h2 id="order-title" className="order__title" data-reveal>
        {t.title}
      </h2>
      <p className="order__body" data-reveal>
        {t.body}
      </p>
      <div className="order__actions" data-reveal>
        <a className="btn btn--gold btn--lg" href={whatsappLink(DICT[locale].generalMessage)} target="_blank" rel="noopener">
          <WhatsApp />
          <span>{t.whatsapp}</span>
        </a>
        <a className="btn btn--line-light btn--lg" href={instagramLink} target="_blank" rel="noopener">
          <Instagram />
          <span>@{SITE.instagram}</span>
        </a>
      </div>
      <p className="order__contact" data-reveal>
        <span>{SITE.whatsappDisplay}</span>
        <span>{SITE.city[locale]}</span>
      </p>
    </section>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const d = DICT[locale];
  return (
    <footer className="footer">
      <div className="footer__lid">
        <LogoMark tone="currentColor" className="footer__mark" />
        <p className="footer__name">Daisy &amp; Leo</p>
        <p className="footer__line">{d.footer.line}</p>
      </div>
      <div className="footer__meta">
        <nav aria-label={d.nav.menu}>
          <Link href={`${paths.home(locale)}#collection`}>{d.nav.collection}</Link>
          <Link href={`${paths.home(locale)}#gift`}>{d.nav.gift}</Link>
          <Link href={`${paths.home(locale)}#commission`}>{d.commission.kicker}</Link>
          <a href={instagramLink} target="_blank" rel="noopener">
            Instagram
          </a>
        </nav>
        <p>
          © {new Date().getFullYear()} {SITE.name}. {d.footer.rights}
        </p>
      </div>
    </footer>
  );
}
