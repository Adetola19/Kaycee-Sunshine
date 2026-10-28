# SiteNav

The site's one navigation bar: the wordmark, six links and a single primary CTA ("Work with Kaycee"). It runs at `nav-height` and shrinks to `nav-height-scrolled` once the page scrolls.

**Markup:** `<nav class="kc-nav">` containing the `.kc-wordmark` link, a `<ul>` of links, one `.kc-btn-primary`, and a `.kc-menu-btn` toggle for mobile. Mark the current page with `aria-current="page"`. Contact is reached through the CTA, so it doesn't need its own link.

**Your script** adds `.is-scrolled` once `scrollY > 24`. This applies `shadow-float`, a `line` border and the shorter height over `duration-base` with `ease-in-out`. Pair it with an `ivory` background at 92% opacity and a backdrop blur.

**Grouping:** "Leadership & Coaching", "Speaking" and "Interpretation" can sit under a "Work" dropdown if space is tight below 1180px. The dropdown opens on click and on focus, never on hover alone.

**Mobile (below 760px):** the links and CTA collapse into a full-height panel on `ivory` over `scrim`. Links are set in `h2` serif with staggered fade-up, the CTA is pinned at the bottom, and the social links sit underneath. The panel traps focus while open, closes on Esc, and returns focus to the toggle, with `aria-expanded` kept in sync.
