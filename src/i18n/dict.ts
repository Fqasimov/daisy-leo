import type { Locale } from '@/data/site';

const az = {
  meta: {
    title: 'Daisy & Leo Design — əl ilə tökülmüş qatran sənəti',
    description:
      'Bakıda əl ilə hazırlanan epoksi qatran saatlar, güzgülər, kalliqrafiya panoları və fərdi hədiyyələr. Təbii daş, qızılı varaq, həkk olunmuş hədiyyə qutusu.',
  },
  nav: {
    collection: 'Kolleksiya',
    material: 'Material',
    gift: 'Hədiyyə',
    order: 'Sifariş',
    menu: 'Menyu',
    close: 'Bağla',
    write: 'Yaz',
    skip: 'Keç',
    home: 'Daisy & Leo — ana səhifə',
    language: 'Dil',
  },
  hero: {
    titleA: 'Əl ilə tökülür.',
    titleB: 'Hər biri təkdir.',
    lede: 'Qatran, təbii daş və qızılı varaqdan saatlar, güzgülər və kalliqrafiya. Hər parça həkk olunmuş qutuda, atlaz lentlə təqdim olunur.',
    primary: 'Kolleksiyaya bax',
    secondary: 'WhatsApp-da yaz',
    scroll: 'Qutunu açmaq üçün aşağı sürüşdürün',
    caption: '01 · Sahil, divar saatı',
  },
  ribbon: 'Daisy & Leo Design',
  collection: {
    kicker: 'Kolleksiya',
    title: 'Qutunun içindəkilər',
    lede: 'Hər parça sifarişlə yenidən tökülür, ona görə rəng və daş düzülüşü bir az fərqlənəcək. Elə bu da onu sizin edir.',
    ask: 'Soruş',
    view: 'Bax',
    empty: 'Bu bölmədə hələ parça yoxdur.',
    count: (n: number) => `${n} parça`,
  },
  material: {
    kicker: 'Yaxından',
    title: 'Daş, qızıl, qatran',
    body: 'Qatran qat-qat tökülür. Hər qat bərkiməmiş, daş qırıntıları əl ilə düzülür, qızılı varaq damar kimi çəkilir, sonra növbəti qat onları şüşə kimi örtür.',
    notes: [
      { label: 'Yaşıl daş qırıntıları', text: 'Ovuc-ovuc, adacıq kimi düzülür.' },
      { label: 'Qızılı varaq', text: 'Qatların arasında damar kimi.' },
      { label: 'Güzgü-qızılı rəqəmlər', text: 'Akrildən kəsilir, səthə oturdulur.' },
      { label: 'Şüşə kimi səth', text: 'Son qat hər şeyi dərinliyə çəkir.' },
    ],
  },
  gift: {
    kicker: 'Hədiyyə',
    title: 'Hədiyyə kimi açılsın',
    body: 'Hər parça Daisy & Leo-nun həkk olunmuş taxta qutusunda, qızılı yazılı qara atlaz lentlə gəlir. Toy, nişan, bayram və ev hədiyyəsi üçün qutu açılan an da hədiyyənin bir hissəsidir.',
    points: ['Həkk olunmuş taxta qutu', 'Qızılı yazılı atlaz lent', 'Açılmağa hazır təqdimat'],
    cta: 'Hədiyyə sifarişi',
    caption: '04 · Zümrüd, qutusu ilə',
  },
  commission: {
    kicker: 'Fərdi sifariş',
    title: 'Sizin motiviniz, bizim əlimiz',
    body: 'Rəngi, ölçünü, daşı və motivi birlikdə seçirik. Şirkətlər üçün loqo və ya sahəyə aid motivlə korporativ hədiyyələr hazırlanır.',
    steps: [
      { t: 'Söhbət', d: 'WhatsApp-da fikrinizi, ölçünü və rəngləri yazırsınız.' },
      { t: 'Eskiz', d: 'Rəng nümunələri və eskizlə razılaşırıq.' },
      { t: 'Tökmə', d: 'Qatlar, daşlar və qızıl əl ilə işlənir.' },
      { t: 'Qutu', d: 'Hazır parça həkk olunmuş qutuda təhvil verilir.' },
    ],
    cta: 'Sifarişi müzakirə et',
    caption: '07 · Külək, korporativ hədiyyə',
  },
  order: {
    kicker: 'Sifariş',
    title: 'Bir mesaj kifayətdir',
    body: 'Bəyəndiyiniz parçanı və ya fikrinizi yazın. Qiymət, ölçü və çatdırılmanı yazışmada dəqiqləşdiririk.',
    whatsapp: 'WhatsApp-da yaz',
    instagram: 'Instagram',
    placeholderNote: 'Əlaqə nömrəsi müvəqqətidir.',
  },
  piece: {
    back: 'Kolleksiya',
    materials: 'Material',
    size: 'Ölçü',
    price: 'Qiymət',
    ask: 'WhatsApp-da soruş',
    dm: 'Instagram-da yaz',
    handmade: 'Əl işidir: rəng və daş düzülüşü şəkildəkindən bir az fərqlənə bilər.',
    more: 'Qutudan daha çox',
    message: (name: string) => `Salam! «${name}» haqqında soruşmaq istəyirəm.`,
  },
  footer: {
    line: 'The Luxury',
    rights: 'Bütün parçalar əl ilə hazırlanır.',
  },
  generalMessage: 'Salam! Daisy & Leo parçaları haqqında soruşmaq istəyirəm.',
  giftMessage: 'Salam! Hədiyyə sifarişi haqqında danışmaq istəyirəm.',
  commissionMessage: 'Salam! Fərdi sifariş haqqında danışmaq istəyirəm.',
};

export type Dict = typeof az;

const en: Dict = {
  meta: {
    title: 'Daisy & Leo Design — hand-poured resin art',
    description:
      'Epoxy resin clocks, mirrors, calligraphy panels and commissioned gifts, made by hand in Baku. Natural stone, gold leaf, an engraved gift box.',
  },
  nav: {
    collection: 'Collection',
    material: 'Material',
    gift: 'Gifts',
    order: 'Order',
    menu: 'Menu',
    close: 'Close',
    write: 'Message',
    skip: 'Skip',
    home: 'Daisy & Leo — home',
    language: 'Language',
  },
  hero: {
    titleA: 'Poured by hand.',
    titleB: 'Each one alone.',
    lede: 'Clocks, mirrors and calligraphy in resin, natural stone and gold leaf. Every piece arrives in an engraved box tied with the satin ribbon.',
    primary: 'See the collection',
    secondary: 'Message on WhatsApp',
    scroll: 'Scroll to open the box',
    caption: '01 · Sahil, wall clock',
  },
  ribbon: 'Daisy & Leo Design',
  collection: {
    kicker: 'Collection',
    title: 'Inside the box',
    lede: 'Every piece is poured again for each order, so its colours and stones will fall a little differently. That is what makes it yours.',
    ask: 'Ask',
    view: 'View',
    empty: 'Nothing in this section yet.',
    count: (n: number) => `${n} ${n === 1 ? 'piece' : 'pieces'}`,
  },
  material: {
    kicker: 'Up close',
    title: 'Stone, gold, resin',
    body: 'The resin is poured in layers. While each one is still soft, stone chips are placed by hand and gold leaf is drawn through like veins; the next layer seals them under glass.',
    notes: [
      { label: 'Green stone chips', text: 'Set by the handful, like islands.' },
      { label: 'Gold leaf', text: 'Veins running between the layers.' },
      { label: 'Mirror-gold numerals', text: 'Cut from acrylic, seated on the surface.' },
      { label: 'Glass-like surface', text: 'The final pour pulls everything into depth.' },
    ],
  },
  gift: {
    kicker: 'Gifts',
    title: 'Made to be unwrapped',
    body: 'Every piece comes in Daisy & Leo’s engraved wooden box, tied with a black satin ribbon printed in gold. For weddings, engagements, holidays and housewarmings, the moment the lid opens is part of the gift.',
    points: ['Engraved wooden box', 'Satin ribbon printed in gold', 'Ready to be unwrapped'],
    cta: 'Order a gift',
    caption: '04 · Zümrüd, in its box',
  },
  commission: {
    kicker: 'Commissions',
    title: 'Your motif, our hands',
    body: 'We choose the colour, size, stones and motif together. For companies, we make corporate gifts around a logo or a motif from your field.',
    steps: [
      { t: 'Conversation', d: 'Tell us your idea, size and colours on WhatsApp.' },
      { t: 'Sketch', d: 'We agree on colour samples and a sketch.' },
      { t: 'Pour', d: 'Layers, stones and gold are worked by hand.' },
      { t: 'Box', d: 'The finished piece is delivered in the engraved box.' },
    ],
    cta: 'Discuss a commission',
    caption: '07 · Külək, corporate gift',
  },
  order: {
    kicker: 'Order',
    title: 'One message is enough',
    body: 'Send us the piece you like or your own idea. We settle price, size and delivery in the conversation.',
    whatsapp: 'Message on WhatsApp',
    instagram: 'Instagram',
    placeholderNote: 'Contact number is a placeholder.',
  },
  piece: {
    back: 'Collection',
    materials: 'Materials',
    size: 'Size',
    price: 'Price',
    ask: 'Ask on WhatsApp',
    dm: 'Message on Instagram',
    handmade: 'Handmade: colours and stone placement may differ slightly from the photo.',
    more: 'More from the box',
    message: (name: string) => `Hello! I’d like to ask about “${name}”.`,
  },
  footer: {
    line: 'The Luxury',
    rights: 'Every piece is made by hand.',
  },
  generalMessage: 'Hello! I’d like to ask about Daisy & Leo pieces.',
  giftMessage: 'Hello! I’d like to talk about a gift order.',
  commissionMessage: 'Hello! I’d like to talk about a commission.',
};

export const DICT: Record<Locale, Dict> = { az, en };

export const paths = {
  home: (l: Locale) => (l === 'az' ? '/' : '/en/'),
  piece: (l: Locale, slug: string) => (l === 'az' ? `/kolleksiya/${slug}/` : `/en/collection/${slug}/`),
};
