# Owner inputs needed

Every gap below is shown on the live site as a visible `[OWNER TO CONFIRM: …]` marker
(sage frame) or a labelled `Replace · …` image placeholder, so nothing invented can be
mistaken for fact. Supply the item, update the file listed, and the marker disappears.

## Photography (`src/content/media.ts`)

Supplied and in use: navy-suit portrait (home hero), charcoal-suit portrait (About), grey-blazer
portrait ("Meet Kaycee"), on-stage photo (Public Speaking, gallery, About), BGYCC teaching photo
(BGYCC, gallery).

Still needed — add files under `public/images/` and set `image` on the entry:

| Slot | Shot | Ratio | Used on |
| --- | --- | --- | --- |
| `portraits.speakFrenchFast` | Speak French Fast lesson or brand image | 1:1 | SFF hero |
| `speakingGallery[2–3]` | Workshop with delegates; audience during a keynote | 4:3 | Home, Public Speaking, Media |

Caption needed: **event name, city and year** for the on-stage photo.
Logo: none supplied — the wordmark is set in Newsreader and `src/app/icon.svg` is an interim "K" favicon.

## Videos (`src/content/media.ts` → `videos`)

For each video from https://www.youtube.com/@coachkayceesunshine: the **video id**, the
**exact title**, the **duration**, and its kind (`talk`, `lesson`, `interview`, `highlight`).
Placeholders currently stand in for: featured talk, leadership lesson, interview, keynote
excerpt, conference session, workshop highlight, and three French lessons (SFF page).
(The channel could not be reached from the build environment, so no titles were guessed.)

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

## BGYCC School of Leadership (includes coaching)

What BGYCC stands for and its purpose · upcoming classes and events and how to register ·
coaching formats, session length and programme structure · languages offered · in person / online ·
how fees are shared. (Founder status confirmed.)

## Public Speaking

Speaker one-sheet or media kit, if available.

## SFF · Speak French Fast

Course names and content · levels · format (live/recorded, group/1:1) · start dates and duration ·
prices if published · **official enrolment link**.

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
