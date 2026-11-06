import type { Metadata } from "next";
import Link from "next/link";
import { socials } from "@/content/site";
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

export const metadata: Metadata = pageMetadata({
  title: "BGYCC School of Leadership",
  description:
    "BGYCC School of Leadership, founded by Coach Kaycee Sunshine — leadership coaching, classes and events for individuals and organisations.",
  path: "/bgycc-school-of-leadership",
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
    text: "Leadership learning in a group setting, announced on Instagram.",
    href: "#classes",
    go: "See classes and events",
  },
];

export default function BgyccPage() {
  return (
    <>
      <PageHero
        tone="forest"
        eyebrow="BGYCC School of Leadership"
        title={
          <>
            Leadership, developed with <em>purpose</em>.
          </>
        }
        lede="Founded by Coach Kaycee Sunshine, BGYCC School of Leadership develops leaders through coaching, classes and events — for people who carry responsibility, and for the organisations that depend on them."
        actions={
          <>
            <ButtonLink href="/contact?type=coaching" variant="primary" arrow>
              Enquire about coaching
            </ButtonLink>
            <ButtonLink href={socials.bgycc.href}>Follow {socials.bgycc.handle}</ButtonLink>
          </>
        }
        visual={portraits.bgycc}
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
          <SectionHeader id="pathways-title" eyebrow="Ways to begin" title="Who BGYCC is for" />
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

      <section id="classes" className="section section--ivory" aria-labelledby="classes-title">
        <div className="container grid split-head">
          <div className="split-head__label">
            <SectionHeader
              id="classes-title"
              eyebrow="Classes and events"
              title="Take part"
              lede="Upcoming classes and events are announced on Instagram."
              size="h2"
            />
          </div>
          <Reveal index={1} className="split-head__body stack">
            <Pending block>what BGYCC stands for, and the school&rsquo;s purpose in its own words</Pending>
            <Pending block>upcoming classes and events — dates, format and how to register</Pending>
            <div className="actions">
              <ButtonLink href={socials.bgycc.href}>See the latest on Instagram</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--sage-wash" aria-labelledby="how-title">
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
        eyebrow="BGYCC School of Leadership"
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
