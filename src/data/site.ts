// Contact details. PLACEHOLDERS until the studio supplies real ones.
export const SITE = {
  name: 'Daisy & Leo Design',
  /** Digits only, international format, for wa.me links. PLACEHOLDER. */
  whatsapp: '994000000000',
  /** Shown to visitors. PLACEHOLDER. */
  whatsappDisplay: '+994 00 000 00 00',
  instagram: 'daisyleodesign',
  city: { az: 'Bakı', en: 'Baku' },
  url: 'https://daisyleo.design',
} as const;

export type Locale = 'az' | 'en';

export function whatsappLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const instagramLink = `https://instagram.com/${SITE.instagram}`;
