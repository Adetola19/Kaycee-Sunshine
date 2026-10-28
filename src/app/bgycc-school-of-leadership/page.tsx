import type { Metadata } from "next";
import { socials } from "@/content/site";
import { portraits } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";

export const metadata: Metadata = pageMetadata({
  title: "BGYCC School of Leadership",
  description:
    "BGYCC School of Leadership — leadership development through classes and events. Follow its activities and find out how to take part.",
  path: "/bgycc-school-of-leadership",
});

// Kaycee's relationship to BGYCC is unconfirmed: copy here must not say
// "his school", "founded by" or "runs" until the owner confirms it.
export default function BgyccPage() {
  return (
    <>
      <PageHero
        tone="sage"
        eyebrow="BGYCC School of Leadership"
        title={
          <>
            Leadership development through <em>classes and events</em>.
          </>
        }
        lede="BGYCC School of Leadership shares its classes, events and leadership development activities on Instagram."
        actions={
          <>
            <ButtonLink href={socials.bgycc.href} variant="primary">
              Follow {socials.bgycc.handle}
            </ButtonLink>
            <ButtonLink href="/contact?type=general">Ask about BGYCC</ButtonLink>
          </>
        }
        visual={portraits.bgycc}
      >
        <Pending block>Kaycee&rsquo;s exact relationship to BGYCC School of Leadership</Pending>
      </PageHero>

      <section className="section section--ivory" aria-labelledby="school-title">
        <div className="container grid split-head">
          <div className="split-head__label">
            <SectionHeader id="school-title" eyebrow="The school" title="About BGYCC School of Leadership" size="h2" />
          </div>
          <Reveal index={1} className="split-head__body prose">
            <Pending block>what BGYCC stands for, and the school&rsquo;s purpose in its own words</Pending>
            <Pending block>who the school is for</Pending>
            <Pending block>how the school&rsquo;s leadership development is organised</Pending>
          </Reveal>
        </div>
      </section>

      <section className="section section--sage-wash" aria-labelledby="classes-title">
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
            <Pending block>upcoming classes and events — dates, format and how to register</Pending>
            <div className="actions">
              <ButtonLink href={socials.bgycc.href}>See the latest on Instagram</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingInvitation
        eyebrow="BGYCC School of Leadership"
        title={
          <>
            Questions about <em>BGYCC</em>?
          </>
        }
        lede="Send a general enquiry and choose BGYCC School of Leadership as the topic."
        cta={{ label: "Ask about BGYCC", href: "/contact?type=general" }}
      />
    </>
  );
}
