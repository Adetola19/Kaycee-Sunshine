import type { Metadata } from "next";
import { socials } from "@/content/site";
import { portraits, speakingGallery, videos } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Pending } from "@/components/ui/Pending";
import { Gallery } from "@/components/media/Gallery";
import { VideoGrid } from "@/components/media/VideoGrid";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";

export const metadata: Metadata = pageMetadata({
  title: "Speaking & Conferences",
  description:
    "Invite Kaycee Sunshine to speak: keynotes, conference sessions, workshops and leadership sessions for organisations and event organisers.",
  path: "/speaking",
});

const formats = [
  { title: "Keynotes", text: "An opening or closing address that sets the tone for an event." },
  { title: "Conference sessions", text: "Focused talks within a programme, shaped to the conference theme." },
  { title: "Workshops", text: "Interactive sessions where participants practise, not only listen." },
  { title: "Leadership sessions", text: "Classes and sessions for leadership groups and teams." },
  { title: "Interviews and panels", text: "Conversations for podcasts, media and panel discussions." },
];

const themes = ["Purposeful leadership", "Communication across cultures", "Capacity development", "Language and leadership"];

const enquiryChecklist = [
  "Your organisation and the event name",
  "Date and location, or whether it is online",
  "Who the audience is, and roughly how many",
  "The format you have in mind",
];

export default function SpeakingPage() {
  return (
    <>
      <PageHero
        tone="charcoal"
        eyebrow="Speaking & Conferences"
        title={
          <>
            A voice for <em>purposeful</em> leadership.
          </>
        }
        lede="Keynotes, conference sessions, workshops and leadership sessions for organisations and event organisers."
        actions={
          <ButtonLink href="/contact?type=speaking" variant="primary" arrow>
            Invite Kaycee to speak
          </ButtonLink>
        }
        visual={portraits.speaking}
      />

      <section className="section section--ivory" aria-labelledby="formats-title">
        <div className="container">
          <SectionHeader id="formats-title" eyebrow="Formats" title="Ways Kaycee speaks" />
          <ol className="num-list num-list--2" role="list">
            {formats.map((f, i) => (
              <Reveal as="li" key={f.title} index={i}>
                <div>
                  <h3 className="t-h3">{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--sage-wash" aria-labelledby="topics-title">
        <div className="container grid split-head">
          <div className="split-head__label">
            <SectionHeader id="topics-title" eyebrow="Topics" title="What Kaycee speaks about" size="h2" />
          </div>
          <Reveal index={1} className="split-head__body stack">
            <ul className="chip-row" role="list" aria-label="Themes">
              {themes.map((t) => (
                <li key={t} className="kc-chip">
                  {t}
                </li>
              ))}
            </ul>
            <Pending block>confirmed talk titles and a one-line summary of each</Pending>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory gallery-section" aria-labelledby="stage-title">
        <div className="container">
          <SectionHeader id="stage-title" eyebrow="On stage" title="From the stage" lede="Conferences, workshops, interviews and leadership sessions." />
        </div>
        <Gallery items={speakingGallery} label="Speaking and conference photographs" />
      </section>

      <section className="section section--charcoal on-ground" aria-labelledby="watch-title">
        <div className="container">
          <SectionHeader
            id="watch-title"
            eyebrow="Watch"
            title="Speaking highlights"
            aside={<TextLink href={socials.youtube.href}>More on YouTube</TextLink>}
          />
          <VideoGrid
            videos={videos.filter((v) => v.kind === "talk" || v.kind === "highlight")}
            limit={3}
            placeholderSlots={["Keynote excerpt", "Conference session", "Workshop highlight"]}
          />
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="organisers-title">
        <div className="container grid split-head">
          <div className="split-head__label">
            <SectionHeader
              id="organisers-title"
              eyebrow="For event organisers"
              title="Planning an event?"
              lede="A speaking enquiry takes a few minutes. These details help Kaycee reply with a useful answer."
              size="h2"
            />
          </div>
          <Reveal index={1} className="split-head__body stack">
            <ul className="check-list" role="list">
              {enquiryChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              <Pending>speaker one-sheet or media kit, if available</Pending>
            </p>
            <ButtonLink href="/contact?type=speaking" variant="primary" arrow>
              Start a speaking enquiry
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <ClosingInvitation
        eyebrow="Speaking enquiries"
        title={
          <>
            Bring the conversation to <em>your</em> stage.
          </>
        }
        lede="Share the event, the audience and the date — Kaycee will take it from there."
        cta={{ label: "Invite Kaycee to speak", href: "/contact?type=speaking" }}
      />
    </>
  );
}
