# Owner inputs needed

Every gap below is shown on the live site as a visible `[OWNER TO CONFIRM: …]` marker
(sage frame) or a labelled `Replace · …` image placeholder, so nothing invented can be
mistaken for fact. Supply the item, update the file listed, and the marker disappears.

## Photography (`src/content/media.ts`)

Add files under `public/images/`, then set `image: { src, alt, width, height }` on the entry.
Treatment: natural light, slight warm lift, no heavy filters (design/BRAND.md § Imagery).

| Slot | Shot | Ratio | Used on |
| --- | --- | --- | --- |
| `portraits.hero` | Portrait of Kaycee, natural light | 4:5 | Home hero |
| `portraits.about` | Portrait, three-quarter length | 4:5 | About hero |
| `portraits.aboutDetail` | Kaycee in conversation, documentary | 1:1 | About · At a glance |
| `portraits.coaching` | Coaching session or leadership class | 4:5 | Coaching hero |
| `portraits.speaking` | Kaycee on a conference stage | 16:9 | Speaking hero |
| `portraits.interpretation` | Kaycee interpreting at an event | 4:5 | Interpretation hero |
| `portraits.language` | Kaycee teaching a language class | 4:5 | Language hero |
| `portraits.speakFrenchFast` | Speak French Fast lesson or brand image | 1:1 | Language, Speak French Fast |
| `portraits.bgycc` | BGYCC class or event | 1:1 | Home, BGYCC |
| `speakingGallery[0–4]` | Conference stage (wide), workshop, session detail, interview/panel, keynote audience | 21:9 / 4:3 | Home, Speaking, Media |

Each gallery photo also needs a verified caption: **event name, city and year**.
Logo: none supplied — the wordmark is set in Newsreader and `src/app/icon.svg` is an interim "K" favicon.

## Videos (`src/content/media.ts` → `videos`)

For each video from https://www.youtube.com/@coachkayceesunshine: the **video id**, the
**exact title**, the **duration**, and its kind (`talk`, `lesson`, `interview`, `highlight`).
Placeholders currently stand in for: featured talk, leadership lesson, interview, keynote
excerpt, conference session, workshop highlight, and three French lessons.
(The channel could not be reached from the build environment, so no titles were guessed.)

## Articles (`src/content/articles.ts` → `articles`)

Real articles only — either full text (`body`) or a link to where they live (`externalUrl`,
e.g. LinkedIn). Category, date, excerpt and an optional 4:3 image.

## Biography and credentials

| Item | Page |
| --- | --- |
| Verified biography (third person) | About |
| Qualifications, certifications, professional memberships | About |
| Organisations/events worked with — with permission to name | About |
| City and country; regions served | About, Home |
| Languages Kaycee coaches, speaks and teaches in | About |
| A short leadership philosophy statement in Kaycee's own words | Home |
| Testimonials, with written permission | (no section yet — add when supplied) |

## Coaching

Formats, session length and programme structure · languages offered · in person / online ·
how fees are shared.

## Speaking

Confirmed talk titles with one-line summaries · speaker one-sheet or media kit.

## Interpretation

Language combinations (with direction) · modes (simultaneous, consecutive, remote…) ·
specialisations · typical settings · interpreting qualifications and memberships ·
regions served, travel and lead times.

## Language education and Speak French Fast

Other languages taught and how to join · course names and content · levels · format
(live/recorded, group/1:1) · start dates and duration · prices if published ·
**official enrolment link**.

## BGYCC School of Leadership

**Kaycee's exact relationship to the school** (until confirmed, the copy avoids "his school",
"founded by" or "runs") · what BGYCC stands for and its purpose · who it is for · how it is
organised · upcoming classes and events and how to register.

## Media

Published interviews, podcasts and press features (with links) · approved press biography
and downloadable headshots.

## Contact and privacy

Typical response time · preferred contact email (used as a fallback if the form fails) ·
data controller name and contact details · enquiry-handling provider and data location ·
legal basis · retention period · how to make a data request and supervisory authority ·
legal review and effective date of the privacy policy.

## Domain

The production domain, for `NEXT_PUBLIC_SITE_URL` (canonical URLs, Open Graph, sitemap).
