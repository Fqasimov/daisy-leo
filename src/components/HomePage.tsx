import type { Locale } from '@/data/site';
import { DICT } from '@/i18n/dict';
import { Collection } from './Collection';
import { Header } from './Header';
import { Hero } from './Hero';
import { Intro } from './Intro';
import { Commission, Footer, Gift, Material, Order, RibbonBand } from './Sections';

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro skipLabel={DICT[locale].nav.skip} />
      <Header locale={locale} alternate={locale === 'az' ? '/en/' : '/'} />
      <main>
        <Hero locale={locale} />
        <RibbonBand locale={locale} />
        <Collection locale={locale} />
        <Material locale={locale} />
        <Gift locale={locale} />
        <Commission locale={locale} />
        <Order locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
