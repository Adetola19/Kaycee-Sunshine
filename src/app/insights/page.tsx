import type { Metadata } from "next";
import { socials } from "@/content/site";
import { sortedArticles } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ArticleFeature } from "@/components/sections/ArticleCards";
import { InsightsList } from "@/components/sections/InsightsList";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Articles and notes from Kaycee Sunshine on leadership, personal development, communication, language learning, speaking and ideas.",
  path: "/insights",
});

export default function InsightsPage() {
  const articles = sortedArticles();
  const [, , , ...more] = articles;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Notes on leadership, communication and <em>language</em>.
          </>
        }
        lede="Leadership, personal development, communication, language learning, and speaking and ideas."
        actions={<ButtonLink href={socials.linkedin.href}>Follow on LinkedIn</ButtonLink>}
      />

      <section className="section section--ivory insights-section" aria-labelledby="latest-title">
        <div className="container stack stack-lg">
          <SectionHeader
            id="latest-title"
            eyebrow="Latest"
            title="Recent writing"
            size="h2"
            lede={
              articles.length === 0
                ? "Articles will appear here as they are published. The cards below show where they will sit."
                : undefined
            }
          />
          <ArticleFeature articles={articles} />
        </div>
      </section>

      {more.length > 0 && (
        <section className="section section--ivory insights-archive" aria-labelledby="archive-title">
          <div className="container">
            <SectionHeader id="archive-title" eyebrow="Archive" title="All insights" size="h2" />
            <InsightsList articles={more} />
          </div>
        </section>
      )}

      <section className="section section--sage-wash" aria-labelledby="media-title">
        <div className="container grid split-head">
          <div className="split-head__label">
            <SectionHeader id="media-title" eyebrow="Watch and listen" title="Videos and media" size="h2" />
          </div>
          <Reveal index={1} className="split-head__body stack">
            <p className="t-lede">Talks, lessons, interviews and speaking highlights.</p>
            <p>
              <TextLink href="/media" arrow>
                Go to videos and media
              </TextLink>
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingInvitation />
    </>
  );
}
