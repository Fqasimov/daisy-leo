import type { Locale } from './site';

type L = Record<Locale, string>;

export type Category = 'clocks' | 'mirrors' | 'calligraphy' | 'commission';

export type Piece = {
  slug: string;
  no: string;
  category: Category;
  name: L;
  kind: L;
  summary: L;
  story: L;
  materials: L[];
  /** PLACEHOLDER dimensions until the studio confirms them. */
  size: L;
  /** PLACEHOLDER price in AZN; null = priced per commission. */
  price: number | null;
  image: string;
  detail?: string;
  /** Focal point for object-position in tight crops. */
  focus?: string;
};

export const CATEGORIES: { id: Category | 'all'; label: L }[] = [
  { id: 'all', label: { az: 'Hamısı', en: 'All' } },
  { id: 'clocks', label: { az: 'Saatlar', en: 'Clocks' } },
  { id: 'mirrors', label: { az: 'Güzgü və çərçivə', en: 'Mirrors & frames' } },
  { id: 'calligraphy', label: { az: 'Kalliqrafiya', en: 'Calligraphy' } },
  { id: 'commission', label: { az: 'Fərdi sifariş', en: 'Commissions' } },
];

const RESIN: L = { az: 'Epoksi qatran', en: 'Epoxy resin' };
const LEAF: L = { az: 'Qızılı varaq', en: 'Gold leaf' };
const STONE: L = { az: 'Təbii daş qırıntıları', en: 'Natural stone chips' };
const MIRROR_GOLD: L = { az: 'Güzgü-qızılı akril', en: 'Mirror-gold acrylic' };

export const PIECES: Piece[] = [
  {
    slug: 'sahil',
    no: '01',
    category: 'clocks',
    name: { az: 'Sahil', en: 'Sahil' },
    kind: { az: 'Divar saatı', en: 'Wall clock' },
    summary: {
      az: 'Fil sümüyü, qum və firuzəyi dalğalar, yaşıl daş adacıqları.',
      en: 'Ivory, sand and turquoise waves with islands of green stone.',
    },
    story: {
      az: 'Xəzər sahilinin qatları kimi tökülmüş dalğalar. Hər qat ayrıca tökülür, aralarına qızılı varaq damarları və yaşıl daş qırıntıları yerləşdirilir. Rəqəmlər güzgü-qızılı akrildən kəsilib.',
      en: 'Waves poured like the layers of a Caspian shoreline. Each layer is poured separately, with veins of gold leaf and green stone chips set between them. The numerals are cut from mirror-gold acrylic.',
    },
    materials: [RESIN, STONE, LEAF, MIRROR_GOLD],
    size: { az: 'Ø 70 sm', en: 'Ø 70 cm' },
    price: 650,
    image: 'sahil',
    detail: 'sahil-detail',
    focus: '50% 45%',
  },
  {
    slug: 'kamelya',
    no: '02',
    category: 'mirrors',
    name: { az: 'Kamelya', en: 'Camellia' },
    kind: { az: 'Masaüstü güzgü', en: 'Table mirror' },
    summary: {
      az: 'Moka və fil sümüyü halqa, əl ilə yonulmuş kamelya çiçəyi.',
      en: 'A mocha and ivory ring with a hand-sculpted camellia.',
    },
    story: {
      az: 'Dairəvi güzgü, moka rəngindən fil sümüyünə keçən qatran halqada. Qızılı varaq zərrələri halqa boyu səpələnib; kənarları qızılla işlənmiş kamelya halqanın üstündə açır. Qızılı altlıq üzərində dayanır.',
      en: 'A round mirror in a resin ring that drifts from mocha to ivory. Flakes of gold leaf are scattered across it, and a camellia with gilded petal edges opens on top. It stands on a gold easel.',
    },
    materials: [RESIN, LEAF, { az: 'Yonulmuş çiçək', en: 'Sculpted flower' }, MIRROR_GOLD],
    size: { az: 'Ø 30 sm', en: 'Ø 30 cm' },
    price: 180,
    image: 'kamelya',
    detail: 'kamelya-detail',
    focus: '50% 55%',
  },
  {
    slug: 'nur',
    no: '03',
    category: 'calligraphy',
    name: { az: 'Nur', en: 'Nur' },
    kind: { az: 'Kalliqrafiya panosu', en: 'Calligraphy panel' },
    summary: {
      az: 'Qrafit qatran, güzgü-qızılı «Allah» yazısı, şüa kimi açılan relyef.',
      en: 'Graphite resin, mirror-gold “Allah” and a relief that opens like rays of light.',
    },
    story: {
      az: 'Tüstülü qrafit qatranın içində qızılı damarlar, ortada güzgü-qızılı kalliqrafiya. Panonun qalan hissəsi əl ilə daranmış relyefdir: xətlər yazıdan şüa kimi açılır və kənarları qızılla örtülür.',
      en: 'Gold veins drift through smoky graphite resin around mirror-gold calligraphy. The rest of the panel is a hand-combed relief whose lines radiate from the script like light, finished in gold at the edges.',
    },
    materials: [RESIN, LEAF, { az: 'Relyef pasta', en: 'Relief paste' }, MIRROR_GOLD],
    size: { az: '50 × 60 sm', en: '50 × 60 cm' },
    price: 420,
    image: 'nur',
    focus: '40% 45%',
  },
  {
    slug: 'zumrud',
    no: '04',
    category: 'calligraphy',
    name: { az: 'Zümrüd', en: 'Zümrüd' },
    kind: { az: 'Masaüstü kalliqrafiya', en: 'Tabletop calligraphy' },
    summary: {
      az: 'Zümrüd qatran, yaşıl daşlar və gül. Həkk olunmuş qutuda təqdim olunur.',
      en: 'Emerald resin, green stones and a rose. Presented in the engraved box.',
    },
    story: {
      az: 'Dərin zümrüd qatranın üzərində güzgü-qızılı kalliqrafiya, yanında fil sümüyü rəngli relyef, qızılı yarpaqlar və gül. Qızılı altlıqda dayanır və Daisy & Leo-nun həkk olunmuş taxta qutusunda, atlaz lentlə təqdim olunur.',
      en: 'Mirror-gold calligraphy on deep emerald resin, beside an ivory relief with golden leaves and a rose. It stands on a gold base and comes in Daisy & Leo’s engraved wooden box with the satin ribbon.',
    },
    materials: [RESIN, STONE, LEAF, { az: 'Həkk olunmuş taxta qutu', en: 'Engraved wooden box' }],
    size: { az: 'H 25 sm', en: 'H 25 cm' },
    price: 260,
    image: 'zumrud',
    focus: '45% 30%',
  },
  {
    slug: 'gece',
    no: '05',
    category: 'clocks',
    name: { az: 'Gecə', en: 'Gecə' },
    kind: { az: 'Masaüstü saat', en: 'Desk clock' },
    summary: {
      az: 'Qara və qızılı mərmər qatran, qızılı halqa, kvars kristalı.',
      en: 'Black and gold marbled resin, a gold hoop and a quartz crystal.',
    },
    story: {
      az: 'Qara qatranda qızılı duman. Saat qızılı halqada asılıb, qara qatran altlığın üstündə kiçik kvars kristalı dayanır. Eyni seriyadan çərçivə ilə dəst kimi də sifariş olunur.',
      en: 'Gold mist in black resin. The clock hangs in a gold hoop above a black resin base set with a small quartz crystal. It can be ordered as a set with the matching frame.',
    },
    materials: [RESIN, LEAF, { az: 'Kvars kristalı', en: 'Quartz crystal' }, MIRROR_GOLD],
    size: { az: 'H 38 sm', en: 'H 38 cm' },
    price: 220,
    image: 'gece-saat',
    focus: '50% 35%',
  },
  {
    slug: 'gece-cercive',
    no: '06',
    category: 'mirrors',
    name: { az: 'Gecə çərçivə', en: 'Gecə frame' },
    kind: { az: 'Foto çərçivə', en: 'Photo frame' },
    summary: {
      az: 'Qara-qızılı qatran çərçivə, qızılla işlənmiş kvadrat daşlar.',
      en: 'A black and gold resin frame with gilded square inlays.',
    },
    story: {
      az: '«Gecə» seriyasının çərçivəsi: qara və qızılı qatran, üstündə qızılla işlənmiş iki kvadrat bəzək və ağ üçbucaq naxışlar.',
      en: 'The frame from the Gecə series: black and gold resin with two gilded square inlays and a row of white triangles.',
    },
    materials: [RESIN, LEAF, MIRROR_GOLD],
    size: { az: '10 × 15 sm foto', en: 'Fits a 10 × 15 cm photo' },
    price: 120,
    image: 'gece-cercive',
    focus: '50% 40%',
  },
  {
    slug: 'kulek',
    no: '07',
    category: 'commission',
    name: { az: 'Külək', en: 'Külək' },
    kind: { az: 'Korporativ hədiyyə', en: 'Corporate gift' },
    summary: {
      az: 'Şirkət üçün sifarişlə: gecə mavisi qatran, qızılı külək turbinləri və günəş.',
      en: 'Commissioned by a company: night-blue resin, gold wind turbines and a sun.',
    },
    story: {
      az: 'Bir şirkətin sifarişi ilə hazırlanıb: onların işindən gələn motiv — külək turbinləri və günəş — güzgü-qızılı akrildən kəsilib, gecə mavisi qatrana yerləşdirilib. Sizin loqonuz və ya motiviniz də belə ola bilər.',
      en: 'Made to a company’s commission: a motif from their own work — wind turbines and a sun — cut from mirror-gold acrylic and set in night-blue resin. Your logo or motif can be made the same way.',
    },
    materials: [RESIN, STONE, MIRROR_GOLD],
    size: { az: 'Ölçü razılaşma ilə', en: 'Size on agreement' },
    price: null,
    image: 'kulek',
    focus: '50% 45%',
  },
];

export const pieceBySlug = (slug: string) => PIECES.find((p) => p.slug === slug);

export function formatPrice(price: number | null, locale: Locale) {
  if (price === null) return locale === 'az' ? 'Qiymət sifarişə görə' : 'Priced per commission';
  return `${price.toLocaleString(locale === 'az' ? 'az-AZ' : 'en-GB')} ₼`;
}
