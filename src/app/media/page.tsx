import type { Metadata } from "next";
import { socials } from "@/content/site";
import { speakingGallery, videos } from "@/content/media";
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
  title: "Videos & Media",
  description:
    "Watch talks, lessons, interviews and speaking highlights from Kaycee Sunshine, and find media and interview enquiries.",
  path: "/media",
});

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Videos & media"
        title={
          <>
            Watch, listen and <em>learn</em>.
          </>
        }
        lede="Talks, lessons, interviews and speaking highlights. Videos play only when you choose to watch them."
        actions={<ButtonLink href={socials.youtube.href}>Visit the YouTube channel</ButtonLink>}
      />

      <section className="section section--charcoal on-ground" aria-labelledby="talks-title">
        <div className="container">
          <SectionHeader
            id="talks-title"
            eyebrow="Watch"
            title="Talks and highlights"
            aside={<TextLink href={socials.youtube.href}>All videos on YouTube</TextLink>}
          />
          <VideoGrid
            videos={videos.filter((v) => v.kind === "talk" || v.kind === "highlight")}
            placeholderSlots={["Featured talk", "Speaking highlight", "Leadership session"]}
          />
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="lessons-title">
        <div className="container">
          <SectionHeader id="lessons-title" eyebrow="Learn" title="Lessons and interviews" />
          <VideoGrid
            videos={videos.filter((v) => v.kind === "lesson" || v.kind === "interview")}
            placeholderSlots={["Language lesson", "Leadership lesson", "Interview"]}
          />
        </div>
      </section>

      <section className="section section--sage-wash gallery-section" aria-labelledby="photos-title">
        <div className="container">
          <SectionHeader id="photos-title" eyebrow="Photographs" title="From conferences and sessions" />
        </div>
        <Gallery items={speakingGallery} label="Conference and session photographs" />
      </section>

      <section className="section section--ivory" aria-labelledby="press-title">
        <div className="container grid split-head">
          <div className="split-head__label">
            <SectionHeader
              id="press-title"
              eyebrow="Press and interviews"
              title="For media"
              lede="Interview requests, podcasts and press enquiries are welcome."
              size="h2"
            />
          </div>
          <Reveal index={1} className="split-head__body stack">
            <Pending block>published interviews, podcasts and press features, with links</Pending>
            <Pending block>approved press biography and headshots for download</Pending>
            <div className="actions">
              <ButtonLink href="/contact?type=partnership" variant="primary" arrow>
                Make a media enquiry
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingInvitation />
    </>
  );
}
