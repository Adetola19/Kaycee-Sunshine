Coach Kaycee Sunshine works where leadership, communication and language meet: a global leadership coach, international interpreter and language educator. This system is built to make that feel like one considered practice rather than three side businesses. The governing rule is **stunning without shouting**: authority comes from composition, real photography, fine typography and restraint, never from volume.

## Content fundamentals

- **Lead with the mission, not the job titles.** Headlines carry the larger idea, for example "Leadership that travels beyond borders." The three professional titles sit beneath as an `eyebrow` stack, one per line: GLOBAL LEADERSHIP COACH / INTERNATIONAL INTERPRETER / LANGUAGE EDUCATOR. Never cram them into one headline.
- **Voice:** calm, assured and warm. Use short declarative sentences. Write in the third person ("Kaycee works with…") on service pages and the first person only inside a verified quote.
- **Casing:** sentence case for headlines and buttons ("Invite Kaycee to speak"). Uppercase only in `eyebrow`. Use British spelling throughout (programme, organisation, enquiry).
- **Calls to action** start with a verb and name the outcome: "Work with Kaycee", "Enquire about interpretation", "Explore Speak French Fast". The nav holds exactly one primary CTA, and each section has at most one.
- **No exclamation marks, no emoji, no hype words** ("world-class", "game-changing", "unlock"), and no stacked superlatives.
- **Never invent facts.** Credentials, clients, testimonials, language pairs, statistics, prices, schedules, awards and partnerships appear only when verified by the owner. When a fact is missing, set a visible placeholder in `meta` style inside a sage frame, written as `[OWNER TO CONFIRM: language combinations]`, and log it. Never write plausible-sounding filler copy.
- **BGYCC School of Leadership:** describe Kaycee's relationship to it only in verified terms. Until the owner confirms the relationship, don't use "his school", "founded by" or "runs".

## Colour

- The default page is `ink` on `ivory`. Body copy is `ink`, and metadata and captions are `ink-muted`. Cards, menus and form fields sit on `surface-raised`.
- `forest` is the brand colour. Use it for the primary button, links, the active nav item and quote marks. Text on a forest fill is `on-forest`. Don't use literal white.
- **Dark grounds** (`forest-ground`, `charcoal-ground`, `slate-ground`) hold editorial bands, and they stay dark in both themes. Text on them is `on-ground`, and their accent is `champagne`.
- `champagne` lives **only on dark grounds**. On ivory it fails contrast, so use `champagne-ink` for an eyebrow on a light ground.
- **Pillar identities.** Each pillar keeps the shared type and grid but owns one ground:
  - Leadership & Coaching uses `forest-ground` with `champagne` rules.
  - Speaking & Interpretation uses `charcoal-ground`. Speaking and interpretation stay as two separate columns, each with its own CTA.
  - Language Education and Speak French Fast use `slate-ground`, the one cooler hue, so the pathway feels distinct without becoming a separate storefront.
- `sage` and `sage-wash` are quiet fields: image mats, placeholder frames, the BGYCC band and the philosophy section. Text on sage is `on-sage`.
- Rhythm: never place two dark grounds back to back. Alternate them with ivory or sage-wash, and keep at least two light sections between dark bands on the homepage.
- `error` marks form validation only, and always appears with a written message. A success message uses `forest` with a tick and a sentence.

## Typography

- Headlines are set in **Newsreader**, a variable editorial serif, at light-to-regular weights (300–500) with negative tracking at display sizes. Everything else is set in **Hanken Grotesk**. Both load from Google Fonts: Newsreader with optical size and italics (200–800), and Hanken Grotesk at 400, 500 and 600.
- Scale: `display-xl` is used for the homepage hero only, `display-l` for inner heroes and the closing invitation, `h1` for section titles, `h2` for pillar and article titles, `h3` for cards, and `quote` (Newsreader italic 300) for philosophy lines. Text styles are `lede`, `body`, `small`, `nav`, `eyebrow` (uppercase) and `meta`.
- Display sizes are fluid, and the clamp ranges are in each style's note. Body never drops below 16px on mobile.
- Measures: body is capped at `measure-text` (66ch) and ledes at `measure-lede`. Balance headlines with `text-wrap: balance`.
- Use italic Newsreader for emphasis inside a headline ("Lead with *purpose*"). Don't use bold serif.

## Spacing and layout

- Use a 12-column grid inside `container-max`, with `space-8` page gutters on desktop and a `space-4` (16px) gutter on mobile. Layout is mobile-first: design at 375px, then widen.
- Section padding is `space-10` on desktop, `space-9` on tablet and `space-8` on mobile. The hero gets `space-11` at the top. Leave at least a third of every section empty.
- Compositions are asymmetric and editorial. A typical section pairs text across five columns with an image across six, offset by one. Avoid centred-everything layouts, except for the closing invitation.
- `radius-none` is the default, because photography and bands are square. Buttons, fields and cards use `radius-xs`, and only chips and the play button use `radius-pill`.
- Separate with hairlines (`line`) and space. Use `shadow-float` only for the scrolled nav, dropdowns and the video modal.

## Imagery

- Use genuine photographs of Kaycee wherever they exist: portraits, conference stages, leadership classes and teaching moments. Avoid generic stock imagery.
- Use one consistent treatment: natural light, no heavy filters, and a slight warm lift to match `ivory`. Use the same treatment everywhere.
- Crops: portraits at 4:5, cinematic event images at 21:9 or 16:9, and documentary details at 1:1. Keep eyes in the upper third, and never crop through a face on mobile.
- Write alt text as a description of the scene ("Kaycee addressing delegates at [event, to confirm]"), never "image of".
- Placeholders: a `sage` field with an `ImagePlaceholder` label naming the required shot and ratio, for example `REPLACE · Portrait, 4:5, natural light`. Don't use a stock photo as a temporary image unless it is labelled in the same way.

## Motion

Motion makes up about 35% of the experience. It should feel fluid, never busy. Every reveal plays once and never loops.

- **Entrances:** sections fade up 24px over `duration-reveal` with `ease-out`. Cards stagger by `duration-stagger`, with a maximum of six in a sequence.
- **Hero:** the headline reveals line by line (each line clipped and rising 100%), then the portrait opens with a vertical mask wipe (`clip-path` inset from the bottom), then the intro and CTAs follow. The whole sequence finishes within 1.6s.
- **Images:** apply restrained parallax (no more than 8% translate) to at most two large photographs per page. Gallery images unmask on entry.
- **Links:** underlines draw from left to right over `duration-fast`.
- **Nav:** after 24px of scroll, the bar shrinks from `nav-height` to `nav-height-scrolled`, gains `ivory` at 92% with a backdrop blur, and adds `shadow-float`, using `ease-in-out` over `duration-base`.
- **Menus, accordions and modals** open over `duration-base` with `ease-in-out`.
- **Never use** scroll-jacking, bouncing, floating loops, aggressive zooms, autoplaying video or audio, preloaders, or counters without verified numbers.
- **Reduced motion:** under `prefers-reduced-motion: reduce`, every reveal resolves instantly to its final state, parallax is off, and only colour or opacity transitions under 200ms remain.

## Interaction and accessibility

- Focus: a 2px solid ring in `focus` with a 3px offset, visible on every interactive element. On dark grounds the ring is `champagne`. Don't remove an outline without replacing it.
- Every text pair named in a token's note holds 4.5:1 in both themes, and control borders (`line-strong`) hold 3:1.
- Every button has a defined destination or behaviour. Don't use dead "Book now" buttons, and don't invent booking or payment systems.
- Forms: labels sit above fields, never placeholder-only. Errors appear below the field in `error` with `aria-describedby`. Submission states are idle, sending, sent and failed, and each one is written as a sentence.
- Video: use YouTube's `youtube-nocookie` embeds loaded on click from a preview card (`VideoCard`), with the real title and thumbnail. Never autoplay.
- Touch targets are at least 44×44px. Nothing scrolls horizontally on mobile, and galleries scroll on their own axis without trapping the page.

## Iconography

No icon font is supplied. Use a thin-stroke line set (1.5px stroke, square caps) for a small number of glyphs only: arrow-right, arrow-up-right (external link), play, plus/close, chevron, and the social marks. Icons inherit `currentColor` inline. Don't use emoji, illustrated spot icons or decorative badges. **There is no logo yet**, so set the name "Kaycee Sunshine" in Newsreader 500 as the wordmark until the owner supplies one.

## Components

The components are CSS-only, in `components/bundle.css` and prefixed `kc-`: `Button`, `TextLink`, `SiteNav`, `PillarPanel`, `ArticleCard`, `VideoCard`, `FormField` and `ImagePlaceholder`. Each one's README says what markup it expects.

## Needed from the owner

- High-resolution portraits and event photographs, with event names and dates.
- Verified biography, credentials, and speaking appearances.
- Interpretation language combinations, modes (simultaneous or consecutive) and specialisations.
- Speak French Fast courses, formats and the official enrolment link.
- BGYCC School of Leadership: Kaycee's exact relationship to it, its classes and events, and how to participate.
- Testimonials with written permission. Contact email and enquiry routing. A logo, if one exists.
