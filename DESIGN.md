# Daisy & Leo Design — Design System

## Idea: the gift box

Every piece leaves the studio in an engraved walnut box tied with a black satin
ribbon printed in gold. The site *is* that box:

- **Intro** — the closed lid. The ribbon slides off, the lion's mane is drawn
  stroke by stroke, the daisy blooms, the name rises. The lid then hinges up and
  away (`Intro.tsx`, WAAPI `rotateX` from the top edge) to reveal the site.
- **Hero** — a real 3D box on ivory tissue (Remotion + three.js). Scrolling scrubs
  the composition: the lid opens and the Sahil clock rises out of the emerald lining.
- **Catalogue** — a fitted box insert: compartments of ivory tissue separated by
  walnut dividers.
- **Gift chapter** — the emerald lining, full bleed.
- **Footer** — the walnut lid with the mark and name engraved (debossed).

**Refused:** black-and-gold "luxury template", decorative gradients (the logo's
gold→garnet is stepped per stroke instead), glass, pill buttons, generic icon tiles.

## Colour (sampled from the studio photos)

| Token | Value | Source / role |
|---|---|---|
| `--tissue` | `#f0eadb` | Ivory resin, highlights — page ground |
| `--tissue-deep` | `#e6dece` | Image plates |
| `--ink` | `#181511` | Warm black (frames, desk clock) — text, primary buttons |
| `--ink-2` | `#3d362f` | Body copy |
| `--mocha` | `#5b5349` | Mirror ring — secondary text (6.3:1 on tissue) |
| `--sand` | `#b3a592` | Sand bands — decorative only |
| `--walnut` / `--walnut-deep` | `#4a3727` / `#2c2018` | The box — dividers, footer |
| `--satin` | `#171112` | The ribbon |
| `--gold` / `--gold-light` | `#c9a961` / `#e0c27e` | Mirror-gold acrylic — on dark grounds only |
| `--gold-ink` | `#6e5a2c` | Gold for small text on tissue (5.4:1) |
| `--emerald` / `--emerald-mid` | `#173830` / `#2a5850` | Emerald resin — gift chapter, lining, focus |
| `--obsidian` | `#0e0c0b` | Logo ground — intro, order chapter |

Logo strokes (clockwise from top): `#efdcae #e8cd92 #e0c27e #b8894f #7d3138 #6a2530 #8e4a50 #c69680 #dcb98a`, flower `#ead2a0` (`src/brand/palette.ts`).

## Type

- **Gloock** (display, 400): headlines, piece names, numbers, ribbon.
- **Hanken Grotesk** (variable): text and UI. Tabular numerals for prices.
- Tracked caps (0.24em) only for kickers and "THE LUXURY" — the brand's own
  engraved device. Both faces cover Azerbaijani (ə ı ş ğ ç ö ü İ).

## Motion

- Curves: `--ease-out cubic-bezier(.23,1,.32,1)`, `--ease-in-out (.77,0,.175,1)`,
  `--ease-drawer (.32,.72,0,1)`. Buttons `scale(.97)` on press. Hover effects gated
  behind `(hover: hover) and (pointer: fine)`.
- Reveals: one IntersectionObserver; text rises 18px; photos open with a
  `clip-path` wipe on the `<picture>` (not the observed element).
- Remotion: compositions in `src/remotion/` are played live with `<Player>`; the 3D
  canvas renders on demand only (no idle loop).
- `prefers-reduced-motion`: no intro, the box is shown open, no scroll scrub,
  reveals become plain fades.

## Components

- Buttons: 2px radius; `ink`, `line`, `gold`, `line-light`; sizes `sm`/default/`lg`.
- Piece card: plate (photo) + body (no., name, kind · size, summary, price, *Soruş* →
  WhatsApp with the piece name pre-filled, *Bax* → piece page).
- Filter tabs: a satin ribbon marker slides under the active tab; view transitions
  re-flow the insert.

## Content rules

Azerbaijani first, English mirror (`src/i18n/dict.ts`). Prices, sizes and the
WhatsApp number in `src/data/` are **placeholders** until the studio confirms them.
No testimonials, clients or press exist — do not invent any.
