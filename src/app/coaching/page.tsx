import type { Metadata } from "next";
import { portraits } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Accordion } from "@/components/sections/Accordion";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "Leadership & Coaching",
  description:
    "Leadership coaching and leadership education with Kaycee Sunshine — for individuals and organisations developing purposeful, clear-thinking leaders.",
  path: "/coaching",
});

const focusAreas = [
  { title: "Purposeful leadership", text: "Clarifying what you lead for, so that decisions and priorities follow from it." },
  { title: "Professional growth", text: "Taking the next step in responsibility with self-awareness and intent." },
  { title: "Communication", text: "Being understood — by teams, stakeholders and audiences across cultures." },
  { title: "Capacity development", text: "Building the habits and judgement that let a leader carry more, well." },
  { title: "Meaningful impact", text: "Connecting daily leadership to the difference it makes for other people." },
];

const pathways = [
  {
    title: "For individuals",
    text: "Emerging and established leaders working on clarity, communication and growth.",
    href: "/contact?type=coaching",
    go: "Enquire about coaching",
  },
  {
    title: "For organisations",
    text: "Leadership development for teams and leadership groups within an organisation.",
    href: "/contact?type=coaching",
    go: "Discuss your organisation",
  },
  {
    title: "Classes and events",
    text: "Leadership learning in a group setting through BGYCC School of Leadership.",
    href: "/bgycc-school-of-leadership",
    go: "Explore BGYCC",
  },
];

export default function CoachingPage() {
  return (
    <>
      <PageHero
        tone="forest"
        eyebrow="Leadership & Coaching"
        title={
          <>
            Leadership, developed with <em>purpose</em>.
          </>
        }
        lede="Coaching and leadership education for people who carry responsibility — and for the organisations that depend on them."
        actions={
          <ButtonLink href="/contact?type=coaching" variant="primary" arrow>
            Enquire about coaching
          </ButtonLink>
        }
        visual={portraits.coaching}
      />

      <section className="section section--ivory" aria-labelledby="focus-title">
        <div className="container">
          <SectionHeader
            id="focus-title"
            eyebrow="Focus"
            title="What coaching addresses"
            lede="Coaching that begins with self-awareness and ends in responsibility."
          />
          <ol className="num-list num-list--2" role="list">
            {focusAreas.map((f, i) => (
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

      <section className="section section--sage-wash" aria-labelledby="pathways-title">
        <div className="container">
          <SectionHeader id="pathways-title" eyebrow="Ways to begin" title="Who coaching is for" />
          <ul className="pathways pathways--3" role="list">
            {pathways.map((p, i) => (
              <Reveal as="li" key={p.title} index={i}>
                <Link className="pathway" href={p.href}>
                  <h3 className="t-h3">{p.title}</h3>
                  <p className="t-small">{p.text}</p>
                  <span className="pathway__go">
                    {p.go} <Icon name="arrow-right" className="kc-arrow" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="how-title">
        <div className="container grid split-head">
          <div className="split-head__label">
            <SectionHeader id="how-title" eyebrow="Practicalities" title="How coaching works" size="h2" />
          </div>
          <Reveal index={1} className="split-head__body">
            <Accordion
              items={[
                {
                  title: "Getting started",
                  content: (
                    <p>
                      Begin with a short enquiry describing your goals and context. Kaycee will reply to arrange a
                      conversation about whether coaching is the right fit.
                    </p>
                  ),
                },
                { title: "Formats and session structure", content: <Pending block>coaching formats, session length and programme structure</Pending> },
                { title: "Languages", content: <Pending block>languages in which coaching is offered</Pending> },
                { title: "In person or online", content: <Pending block>where and how sessions take place</Pending> },
                { title: "Fees", content: <Pending block>how fees are shared with prospective clients</Pending> },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <ClosingInvitation
        title={
          <>
            Lead with <em>purpose</em>.
          </>
        }
        lede="Tell Kaycee where you are, and where you want your leadership to go."
        cta={{ label: "Enquire about coaching", href: "/contact?type=coaching" }}
      />
    </>
  );
}
