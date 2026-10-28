import type { Metadata } from "next";
import Link from "next/link";
import { socials } from "@/content/site";
import { portraits } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { Visual } from "@/components/media/Visual";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SocialChannels } from "@/components/sections/SocialChannels";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";

export const metadata: Metadata = pageMetadata({
  title: "Language Education",
  description:
    "Language as a leadership skill. Kaycee Sunshine's language teaching, including the Speak French Fast programme for French learners.",
  path: "/language",
});

export default function LanguagePage() {
  return (
    <>
      <PageHero
        tone="slate"
        eyebrow="Language Education"
        title={
          <>
            Language as a <em>leadership</em> skill.
          </>
        }
        lede="Learning to be understood — and to understand — across borders. Kaycee's language teaching includes Speak French Fast."
        actions={
          <ButtonLink href="/speak-french-fast" variant="primary" arrow>
            Discover Speak French Fast
          </ButtonLink>
        }
        visual={portraits.language}
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
              coaching and interpretation: to develop leaders and equip them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--sage-wash" aria-labelledby="learn-title">
        <div className="container">
          <SectionHeader id="learn-title" eyebrow="Ways to learn" title="Start where you are" />
          <ul className="pathways pathways--3" role="list">
            <Reveal as="li">
              <Link className="pathway" href="/speak-french-fast">
                <h3 className="t-h3">Speak French Fast</h3>
                <p className="t-small">French learning from Kaycee, for learners who want to speak with confidence.</p>
                <span className="pathway__go">
                  Explore Speak French Fast <Icon name="arrow-right" className="kc-arrow" />
                </span>
              </Link>
            </Reveal>
            <Reveal as="li" index={1}>
              <div className="pathway">
                <h3 className="t-h3">Lessons and courses</h3>
                <p className="t-small">
                  <Pending>other languages taught, formats and how to join</Pending>
                </p>
              </div>
            </Reveal>
            <Reveal as="li" index={2}>
              <Link className="pathway" href="/media">
                <h3 className="t-h3">Free resources</h3>
                <p className="t-small">Lessons and conversations on video, from the YouTube channel.</p>
                <span className="pathway__go">
                  Watch and learn <Icon name="arrow-right" className="kc-arrow" />
                </span>
              </Link>
            </Reveal>
          </ul>
        </div>
      </section>

      <section className="section section--slate on-ground tone-slate" aria-labelledby="sff-title">
        <div className="container grid split">
          <div className="split__text stack">
            <Reveal as="p" className="t-eyebrow">
              Speak French Fast
            </Reveal>
            <Reveal index={1}>
              <h2 id="sff-title" className="t-h1">
                French, with <em>confidence</em>.
              </h2>
            </Reveal>
            <Reveal as="p" index={2} className="t-lede">
              A dedicated French-learning pathway within Kaycee&rsquo;s language education work.
            </Reveal>
            <Reveal index={3}>
              <ButtonLink href="/speak-french-fast" variant="primary" arrow>
                Discover Speak French Fast
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal variant="mask" className="split__media split__media--sm">
            <Visual visual={portraits.speakFrenchFast} sizes="(min-width: 1024px) 33vw, 100vw" dark />
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="follow-title">
        <div className="container grid follow">
          <div className="follow__head">
            <SectionHeader id="follow-title" eyebrow="Learn along" title="Follow the lessons" size="h2" />
          </div>
          <div className="follow__list">
            <SocialChannels channels={[socials.speakFrenchFast, socials.multilingualCoach, socials.youtube]} />
          </div>
        </div>
      </section>

      <ClosingInvitation
        eyebrow="Language learning"
        title={
          <>
            Begin with <em>one</em> conversation.
          </>
        }
        lede="Tell Kaycee what you would like to learn and where you are starting from."
        cta={{ label: "Enquire about learning", href: "/contact?type=language" }}
      />
    </>
  );
}
