# Daisy & Leo Design — website

Catalogue + showcase for **Daisy & Leo Design**, a studio hand-making epoxy resin
home decor (clocks, mirrors, frames, calligraphy, corporate gifts). Azerbaijani
first, English at `/en/`. Ordering is by WhatsApp/Instagram message, prices shown.

Read `PRODUCT.md` (product truth) and `DESIGN.md` (the gift-box design system)
before design work. Source photos: `references/images/`.

## Stack

Next.js 16 static export (`out/`) · React 19 · Remotion 4 (`@remotion/player`,
`@remotion/three`) · three.js. Fonts: Gloock + Hanken Grotesk (fontsource).

- `npm run dev` / `npm run build` / `npm run typecheck`
- `npm run images` — crops `references/images` → `public/images` (WebP + JPEG)
- `npm run logo` — re-traces the lion mark → `src/brand/logo-paths.ts`
- `npm run stills` — renders walnut texture + open-box poster via Remotion
- `npm run remotion:studio` — preview `LogoIntro`, `BoxReveal` (+ vertical) in Studio
- `npm run remotion:render-intro` — MP4 of the logo intro (e.g. for Instagram)
- `npm run preview` — relative-path copy in `preview-dist/` for hosted previews

## Skills in `.claude/skills/` (see `SOURCES.md`)

ui-ux-pro-max / design-system → impeccable (shape, audit, polish; run
`impeccable detect`) → emil-design-eng + animation skills → remotion-*.

## Ground rules

- Remotion code: animate only from `useCurrentFrame()`; `ThreeCanvas` uses
  `frameloop="demand"` with an invalidate on frame change.
- Remotion files import with relative paths (Remotion's bundler ignores `@/`).
- Placeholders to replace: prices/sizes in `src/data/pieces.ts`, WhatsApp number in
  `src/data/site.ts`. Never invent testimonials or clients.
- Respect `prefers-reduced-motion`; every font must cover ə ı ş ğ ç ö ü İ.
