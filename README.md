# Kaycee Sunshine

Personal brand website for **Coach Kaycee Sunshine** — global leadership coach, international
interpreter and language educator.

Built with Next.js 16 (App Router), React 19 and TypeScript, styled with plain CSS driven by the
approved design tokens. Design direction: _stunning without shouting_ (see `design/BRAND.md`).

## Run it

Requires Node.js 22.18 or later.

```bash
npm install
cp .env.example .env.local   # optional; see "Environment" below
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit tests for enquiry validation (`node --test`) |
| `npm run check` | Lint + typecheck + tests |

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin. Enables canonical URLs, absolute Open Graph URLs and the sitemap. |
| `ENQUIRY_WEBHOOK_URL` | Where validated enquiries are sent. Until set, the form says enquiries are not connected — it never fakes success. |
| `ENQUIRY_WEBHOOK_SECRET` | Optional bearer token sent with each enquiry. |

Never commit real values. Details: `docs/INTEGRATIONS.md`.

## Deploy

Any Node host that supports Next.js works; Vercel needs no configuration. Set the environment
variables in the host's dashboard and deploy the `main` branch. All content pages are statically
pre-rendered; `/contact` and `/api/enquiry` run on demand.

## Project structure

```
design/                 Approved design system (brand book, tokens, component specs) — the source of truth
scripts/build-tokens.mjs  Regenerates src/styles/tokens.css from design/tokens.json
src/app/                Routes (one folder per page), sitemap, robots, OG image, API route
src/components/
  layout/               Header + mobile menu, footer, social links
  sections/             Page hero, section header, pillars, article cards, accordion, closing invitation…
  media/                Photo/placeholder, gallery + lightbox, video card + modal
  motion/               Reveal, RevealObserver, Parallax
  forms/                Enquiry form
  ui/                   Button, TextLink, Icon, Pending marker
src/content/            Site facts, links, nav, photos, videos, articles — edit content here
src/lib/                Enquiry model + validation (shared client/server), SEO helper
src/styles/             tokens.css (generated), base, components, sections
docs/                   Audit, owner inputs, integrations
```

## Editing content

- **Photos:** put files in `public/images/` and set `image` on the matching entry in
  `src/content/media.ts`. The labelled placeholder is replaced automatically.
- **Videos:** add `{ id, title, duration, kind }` to `videos` in `src/content/media.ts` using the
  exact YouTube title. Cards appear on Home, Speaking, Speak French Fast and Media by kind.
- **Articles:** add to `articles` in `src/content/articles.ts` — either `body` blocks (published at
  `/insights/<slug>`) or an `externalUrl` (e.g. a LinkedIn article).
- **Unconfirmed facts** are marked in pages with `<Pending>…</Pending>`, which renders a visible
  `[OWNER TO CONFIRM: …]`. Replace the marker with verified text. The full list is in
  `docs/OWNER-INPUTS.md`.
- **Design tokens:** edit `design/tokens.json`, then run `node scripts/build-tokens.mjs`.

## Motion and accessibility

Reveals are scroll-triggered once by a single IntersectionObserver; the hero sequence completes in
1.6s; parallax (≤8%) runs on at most two images per page and only while visible. Under
`prefers-reduced-motion: reduce` everything renders in its final state, and with JavaScript
disabled all content stays visible. Focus rings, labelled forms, keyboard-operable menus, dialogs,
gallery and accordion, and WCAG AA token contrast are part of the design system.
