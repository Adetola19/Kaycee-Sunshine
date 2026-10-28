# Phase 1 audit and implementation decisions

_Recorded 28 October 2026, at the start of implementation._

## Supplied materials

**Approved system design** — the Claude Design artifact "Coach Kaycee Sunshine"
(`claude.ai/artifact/LxChoJPo9aP2RFLQLWz3DQ`). Copied into this repository as the reference:

| Source | Copied to |
| --- | --- |
| `project/README.md` (brand book) | `design/BRAND.md` |
| `project/tokens.json` | `design/tokens.json` → generates `src/styles/tokens.css` |
| 8 component READMEs | `design/components/*.md` |
| `components/bundle.css` | `design/components/reference-bundle.css` |

The design system defines: colour (light + dark themes, three pillar grounds), typography
(Newsreader + Hanken Grotesk, full scale with fluid clamps), spacing, radii, layout widths,
nav heights, shadow, motion durations and easings; motion rules; accessibility rules;
content voice; and eight components (Button, TextLink, SiteNav, PillarPanel, ArticleCard,
VideoCard, FormField, ImagePlaceholder).

**Not supplied:** page-level mockups or screenshots, a sitemap, photographs, video, a logo,
icon assets, verified biography or service details. The asset store of the design artifact is empty.

**External research:** YouTube, LinkedIn and Instagram are blocked from the build
environment, and web search returned nothing verifiable about Coach Kaycee Sunshine.
No content, titles or images were taken from those sources; only the exact URLs supplied
in the brief are used.

## Existing codebase

Empty apart from a one-line README — no framework, lockfile or configuration to preserve.

## Stack chosen

- **Next.js 16 (App Router) + React 19 + TypeScript**, npm. Static pre-rendering for every
  content page; a single server route (`/api/enquiry`) for form delivery.
- **Plain CSS with the design tokens as custom properties**, keeping the design system's
  `kc-` component classes. Tailwind was not added: the design system is already expressed
  as tokens + component CSS, and translating it would add a dependency without benefit.
- **No animation library.** Motion is CSS transitions/keyframes plus one shared
  IntersectionObserver and a rAF-throttled parallax — smaller and easier to keep within the
  motion rules (no scroll-jacking, reduced-motion honoured, nothing hidden without JS).
- **next/font** self-hosts both Google fonts (no third-party font requests at runtime).
- Native `<dialog>` for the mobile menu, video modal and lightbox (built-in focus trapping and Esc).
- Runtime dependencies: `next`, `react`, `react-dom` only.

## Information architecture (derived from the SiteNav spec and the brief)

| Route | Purpose | Pillar ground |
| --- | --- | --- |
| `/` | Home | — |
| `/about` | About Coach Kaycee | — |
| `/coaching` | Leadership & Coaching | forest |
| `/speaking` | Speaking & Conferences | charcoal |
| `/interpretation` | International Interpretation | charcoal |
| `/language` | Language Education | slate |
| `/speak-french-fast` | Speak French Fast (child of Language) | slate |
| `/bgycc-school-of-leadership` | BGYCC School of Leadership | sage |
| `/insights`, `/insights/[slug]` | Insights journal and articles | — |
| `/media` | Videos & media | — |
| `/contact` | Enquiries (`?type=` preselects a pathway) | — |
| `/privacy` | Privacy policy | — |
| 404 | Custom not-found page | — |

Main nav: the six links and single CTA from the SiteNav spec. Speak French Fast, BGYCC,
Media and Contact are reached from the mobile menu, footer, pillars and page CTAs.

## Interpretations where the design was silent

- **Nav breakpoints:** full six links from 1180px; 1024–1179px groups Coaching, Speaking and
  Interpretation under a click-to-open "Work" dropdown (as the spec allows); below 1024px the
  full-height menu panel is used (the spec says 760px, but six links, the wordmark and the CTA
  do not fit a 768px tablet without crowding).
- **Homepage rhythm:** the three pillars are one stacked set (space-1 apart), which the
  PillarPanel spec permits, so dark bands never sit back to back. The closing invitation and
  footer share forest-ground as one continuous closing region.
- **Service page heroes** take their pillar's ground; About, Insights, Media, Contact and
  Privacy use ivory.
- **Dark mode** follows the token's dark theme via `prefers-color-scheme`.
- **Favicon/OG image:** typographic only, since no logo exists.

## Blockers (owner input)

See `docs/OWNER-INPUTS.md`. None block the build; each gap is visibly marked on the site.
