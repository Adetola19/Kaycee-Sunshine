import type { Metadata } from "next";
import { site, socialList, socials } from "@/content/site";
import { portraits, speakingGallery, videos } from "@/content/media";
import { sortedArticles } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Pending } from "@/components/ui/Pending";
import { Visual } from "@/components/media/Visual";
import { Gallery } from "@/components/media/Gallery";
import { VideoGrid } from "@/components/media/VideoGrid";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PillarStack } from "@/components/sections/Pillars";
import { ArticleFeature } from "@/components/sections/ArticleCards";
import { SocialChannels } from "@/components/sections/SocialChannels";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Home", description: site.description, path: "/" }),
  title: { absolute: `${site.fullName} · Global Leadership Coach, Interpreter and Language Educator` },
};

export default function HomePage() {
  return (
    <>
      {/* 1 · Hero — ivory */}
      <section className="home-hero hero-anim" aria-labelledby="hero-title">
        <div className="container home-hero__grid">
          <div className="home-hero__text">
            <h1 id="hero-title" className="t-display-xl">
              <span className="line-mask" style={{ ["--i" as string]: 0 }}>
                <span>Leadership that</span>
              </span>
              <span className="line-mask" style={{ ["--i" as string]: 1 }}>
                <span>travels beyond</span>
              </span>
              <span className="line-mask" style={{ ["--i" as string]: 2 }}>
                <span>
                  <em>borders</em>.
                </span>
              </span>
            </h1>
            <ul className="eyebrow-stack home-hero__titles hero-follow" role="list" aria-label="Professional titles">
              {site.titles.map((t) => (
                <li key={t} className="t-eyebrow">
                  {t}
                </li>
              ))}
            </ul>
            <p className="t-lede hero-follow" style={{ ["--i" as string]: 1 }}>
              Kaycee Sunshine develops leaders and equips them — to think clearly, communicate across boundaries and
              lead with purpose.
            </p>
            <div className="actions hero-follow" style={{ ["--i" as string]: 2 }}>
              <ButtonLink href="/contact" variant="primary" arrow>
                Work with Kaycee
              </ButtonLink>
              <ButtonLink href="/contact?type=speaking">Invite Kaycee to speak</ButtonLink>
            </div>
          </div>
          <Parallax className="home-hero__portrait hero-portrait" style={{ aspectRatio: "4 / 5" }}>
            <Visual visual={portraits.hero} sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </Parallax>
        </div>
      </section>

      {/* 2 · Introduction — sage-wash */}
      <section className="section section--sage-wash" aria-labelledby="intro-title">
        <div className="container grid intro">
          <div className="intro__lead">
            <Reveal as="p" className="t-eyebrow">
              One practice
            </Reveal>
            <Reveal index={1}>
              <h2 id="intro-title" className="t-h1">
                Where leadership, communication and <em>language</em> meet.
              </h2>
            </Reveal>
          </div>
          <Reveal index={2} className="intro__body stack">
            <p className="t-lede">
              Coaching sharpens how a leader thinks. Interpretation carries meaning faithfully between languages.
              Language education gives people the confidence to be understood.
            </p>
            <p>
              Kaycee brings the three together in service of one mission: to develop leaders and equip them for work that
              crosses borders, cultures and languages.
            </p>
            <p>
              <Pending>where Kaycee is based and the regions served</Pending>
            </p>
            <p>
              <TextLink href="/about" arrow>
                Read Kaycee&rsquo;s story
              </TextLink>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 · Pillars — one stacked dark set */}
      <section aria-labelledby="pillars-title">
        <div className="section section--ivory pillars-intro">
          <div className="container">
            <SectionHeader
              id="pillars-title"
              eyebrow="What Kaycee does"
              title={
                <>
                  Three disciplines, <em>one purpose</em>
                </>
              }
              lede="Each discipline has its own path and its own way to begin — all of them serve the same mission."
            />
          </div>
        </div>
        <PillarStack />
      </section>

      {/* 4 · Speaking gallery — ivory */}
      <section className="section section--ivory gallery-section" aria-labelledby="stage-title">
        <div className="container">
          <SectionHeader
            id="stage-title"
            eyebrow="On stage"
            title="Speaking and conferences"
            lede="Conferences, workshops, interviews and leadership sessions."
            aside={<ButtonLink href="/speaking">Invite Kaycee to speak</ButtonLink>}
          />
        </div>
        <Gallery items={speakingGallery} label="Speaking and conference photographs" />
      </section>

      {/* 5 · Mission — sage-wash */}
      <section className="section section--sage-wash" aria-labelledby="mission-title">
        <div className="container grid mission">
          <Reveal as="p" className="t-eyebrow mission__label">
            The mission
          </Reveal>
          <div className="mission__body">
            <Reveal>
              <h2 id="mission-title" className="t-display-l">
                Develop the leader. <em>Equip</em> the leader.
              </h2>
            </Reveal>
            <Reveal index={1} className="stack" style={{ marginTop: "var(--space-6)" }}>
              <p className="t-lede muted">
                Leadership is not a title. It is the capacity to see clearly, communicate well and carry responsibility
                for others — and it can be developed.
              </p>
              <Pending block>a short leadership philosophy statement in Kaycee&rsquo;s own words</Pending>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6 · Videos — charcoal */}
      <section className="section section--charcoal on-ground" aria-labelledby="videos-title">
        <div className="container">
          <SectionHeader
            id="videos-title"
            eyebrow="Watch"
            title="Videos and interviews"
            lede="Talks, lessons and conversations from the YouTube channel."
            aside={<TextLink href={socials.youtube.href}>Visit the YouTube channel</TextLink>}
          />
          <VideoGrid videos={videos} limit={3} placeholderSlots={["Featured talk", "Leadership lesson", "Interview"]} />
        </div>
      </section>

      {/* 7 · Insights — ivory */}
      <section className="section section--ivory" aria-labelledby="insights-title">
        <div className="container">
          <SectionHeader
            id="insights-title"
            eyebrow="Insights"
            title="Notes on leadership, communication and language"
            aside={
              <TextLink href="/insights" arrow>
                All insights
              </TextLink>
            }
          />
          <ArticleFeature articles={sortedArticles()} />
        </div>
      </section>

      {/* 8 · BGYCC — sage */}
      <section className="section section--sage" aria-labelledby="bgycc-title">
        <div className="container grid bgycc-band">
          <Reveal variant="mask" className="bgycc-band__media">
            <Visual visual={portraits.bgycc} sizes="(min-width: 1024px) 33vw, 100vw" />
          </Reveal>
          <div className="bgycc-band__text stack">
            <Reveal as="p" className="t-eyebrow">
              BGYCC School of Leadership
            </Reveal>
            <Reveal index={1}>
              <h2 id="bgycc-title" className="t-h1">
                Leadership development through <em>classes and events</em>
              </h2>
            </Reveal>
            <Reveal index={2} className="stack">
              <p>
                <Pending>Kaycee&rsquo;s relationship to BGYCC School of Leadership, and what it offers</Pending>
              </p>
              <ButtonLink href="/bgycc-school-of-leadership" arrow>
                Explore BGYCC School of Leadership
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9 · Follow — ivory */}
      <section className="section section--ivory" aria-labelledby="follow-title">
        <div className="container grid follow">
          <div className="follow__head">
            <SectionHeader
              id="follow-title"
              eyebrow="Follow the work"
              title={
                <>
                  Five channels, <em>one practice</em>
                </>
              }
              size="h2"
            />
          </div>
          <div className="follow__list">
            <SocialChannels channels={socialList} />
          </div>
        </div>
      </section>

      {/* 10 · Closing invitation — forest, flows into the footer */}
      <ClosingInvitation />
    </>
  );
}
