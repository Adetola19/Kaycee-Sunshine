import type { Metadata } from "next";
import { socials } from "@/content/site";
import { portraits, videos } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { VideoGrid } from "@/components/media/VideoGrid";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SocialChannels } from "@/components/sections/SocialChannels";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";

export const metadata: Metadata = pageMetadata({
  title: "SFF · Speak French Fast",
  description:
    "Speak French Fast (SFF) — French learning from language educator Kaycee Sunshine, teaching language as a leadership skill. Courses, lessons and how to begin.",
  path: "/speak-french-fast",
});

const courseFacts = [
  { label: "Courses", pending: "course names and what each covers" },
  { label: "Levels", pending: "levels served, from beginner upwards" },
  { label: "Format", pending: "live, recorded, group or one-to-one" },
  { label: "Schedule", pending: "start dates and duration" },
  { label: "Fees", pending: "prices, if published" },
  { label: "Enrolment", pending: "official enrolment link" },
];

export default function SpeakFrenchFastPage() {
  return (
    <>
      <PageHero
        tone="slate"
        eyebrow="SFF · Speak French Fast"
        title={
          <>
            French, with <em>confidence</em>.
          </>
        }
        lede="Speak French Fast brings Kaycee's language teaching to French learners — practical, spoken French for real conversations, taught as a leadership skill."
        actions={
          <>
            <ButtonLink href="/contact?type=language" variant="primary" arrow>
              Enquire about learning French
            </ButtonLink>
            <ButtonLink href={socials.speakFrenchFast.href}>Follow {socials.speakFrenchFast.handle}</ButtonLink>
          </>
        }
        visual={portraits.speakFrenchFast}
      />

      <section className="section section--ivory" aria-labelledby="why-title">
        <div className="container grid split-head">
          <div className="split-head__label">
            <SectionHeader id="why-title" eyebrow="Why language" title="Why language belongs in leadership" size="h2" />
          </div>
          <Reveal index={1} className="split-head__body prose">
            <p className="t-lede">
              Leaders work through words. Every instruction, vision and difficult conversation depends on being
              understood.
            </p>
            <p>
              Learning another language widens who you can work with and how well you can listen. It is practical
              confidence, built one conversation at a time — and it is part of the same mission as Kaycee&rsquo;s
              coaching and speaking: to develop leaders and equip them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--sage-wash tone-slate" aria-labelledby="courses-title">
        <div className="container">
          <SectionHeader
            id="courses-title"
            eyebrow="Courses"
            title="Courses and formats"
            lede="Course details are being confirmed. To be told when enrolment opens, send a short enquiry."
          />
          <dl className="facts facts--grid">
            {courseFacts.map((f, i) => (
              <Reveal key={f.label} index={i}>
                <dt className="t-eyebrow">{f.label}</dt>
                <dd>
                  <Pending>{f.pending}</Pending>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="lessons-title">
        <div className="container">
          <SectionHeader id="lessons-title" eyebrow="Watch" title="French lessons on video" />
          <VideoGrid
            videos={videos.filter((v) => v.kind === "lesson")}
            limit={3}
            placeholderSlots={["French lesson one", "French lesson two", "French lesson three"]}
          />
        </div>
      </section>

      <section className="section section--sage-wash" aria-labelledby="follow-title">
        <div className="container grid follow">
          <div className="follow__head">
            <SectionHeader id="follow-title" eyebrow="Follow" title="Learn a little every day" size="h2" />
          </div>
          <div className="follow__list">
            <SocialChannels channels={[socials.speakFrenchFast, socials.multilingualCoach, socials.youtube]} />
          </div>
        </div>
      </section>

      <ClosingInvitation
        eyebrow="Speak French Fast"
        title={
          <>
            Ready to <em>speak</em>?
          </>
        }
        lede="Tell Kaycee your level and your goals, and hear about the right way to begin."
        cta={{ label: "Enquire about learning French", href: "/contact?type=language" }}
      />
    </>
  );
}
