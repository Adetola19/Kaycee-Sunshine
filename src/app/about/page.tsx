import type { Metadata } from "next";
import { site, socialList } from "@/content/site";
import { portraits } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Pending } from "@/components/ui/Pending";
import { Visual } from "@/components/media/Visual";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SocialChannels } from "@/components/sections/SocialChannels";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";

export const metadata: Metadata = pageMetadata({
  title: "About Kaycee",
  description:
    "Kaycee Sunshine is a global leadership coach, international interpreter and language educator with a mission to develop leaders and equip them.",
  path: "/about",
});

const disciplines = [
  {
    title: "Leadership coaching",
    text: "Helping leaders think clearly, decide well and grow the capacity to carry responsibility for others.",
    href: "/coaching",
    link: "Leadership & Coaching",
  },
  {
    title: "Speaking and conferences",
    text: "Keynotes, workshops and leadership sessions that give audiences ideas they can act on.",
    href: "/speaking",
    link: "Speaking",
  },
  {
    title: "International interpretation",
    text: "Carrying meaning faithfully between languages, so people can understand one another.",
    href: "/interpretation",
    link: "Interpretation",
  },
  {
    title: "Language education",
    text: "Teaching language as a leadership skill, including through Speak French Fast.",
    href: "/language",
    link: "Language Education",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Kaycee"
        title={
          <>
            A practice between leadership and <em>language</em>.
          </>
        }
        lede={`${site.fullName} is a global leadership coach, international interpreter and language educator, with a mission to develop leaders and equip them.`}
        actions={
          <ButtonLink href="/contact" variant="primary" arrow>
            Work with Kaycee
          </ButtonLink>
        }
        visual={portraits.about}
      />

      <section className="section section--sage-wash" aria-labelledby="bio-title">
        <div className="container grid split-head">
          <div className="split-head__label">
            <Reveal as="p" className="t-eyebrow">
              Biography
            </Reveal>
            <Reveal index={1}>
              <h2 id="bio-title" className="t-h1">
                The story so far
              </h2>
            </Reveal>
          </div>
          <Reveal index={2} className="split-head__body prose">
            <Pending block>
              verified biography — background, professional journey and current work, written in the third person
            </Pending>
            <Pending block>qualifications, certifications and professional memberships</Pending>
            <Pending block>selected organisations, events or institutions Kaycee has worked with, with permission to name them</Pending>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="disciplines-title">
        <div className="container">
          <SectionHeader id="disciplines-title" eyebrow="The work" title="One mission, several disciplines" />
          <ol className="num-list num-list--2" role="list">
            {disciplines.map((d, i) => (
              <Reveal as="li" key={d.href} index={i}>
                <div className="stack stack-sm">
                  <h3 className="t-h3">{d.title}</h3>
                  <p>{d.text}</p>
                  <p>
                    <TextLink href={d.href} arrow>
                      {d.link}
                    </TextLink>
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--sage-wash" aria-labelledby="glance-title">
        <div className="container grid split">
          <Reveal variant="mask" className="split__media split__media--sm">
            <Visual visual={portraits.aboutDetail} sizes="(min-width: 1024px) 33vw, 100vw" />
          </Reveal>
          <div className="split__text">
            <SectionHeader id="glance-title" eyebrow="At a glance" title="Kaycee in brief" size="h2" />
            <Reveal index={1}>
              <dl className="facts">
                <div>
                  <dt className="t-eyebrow">Roles</dt>
                  <dd>{site.titles.join(", ")}</dd>
                </div>
                <div>
                  <dt className="t-eyebrow">Mission</dt>
                  <dd>{site.mission}</dd>
                </div>
                <div>
                  <dt className="t-eyebrow">Based in</dt>
                  <dd>
                    <Pending>city and country</Pending>
                  </dd>
                </div>
                <div>
                  <dt className="t-eyebrow">Working languages</dt>
                  <dd>
                    <Pending>languages Kaycee coaches, speaks and teaches in</Pending>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="channels-title">
        <div className="container grid follow">
          <div className="follow__head">
            <SectionHeader id="channels-title" eyebrow="Follow the work" title="Where to find Kaycee" size="h2" />
          </div>
          <div className="follow__list">
            <SocialChannels channels={socialList} />
          </div>
        </div>
      </section>

      <ClosingInvitation />
    </>
  );
}
