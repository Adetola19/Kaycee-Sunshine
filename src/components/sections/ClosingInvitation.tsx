import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

type ClosingInvitationProps = {
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  cta?: { label: string; href: string };
};

/** Centred closing invitation on forest-ground; flows into the footer. */
export function ClosingInvitation({
  eyebrow = "Begin a conversation",
  title = (
    <>
      Develop the <em>leader</em>.
    </>
  ),
  lede = "Tell Kaycee what you are working towards — coaching, a speaking engagement, interpretation or language learning.",
  cta = { label: "Work with Kaycee", href: "/contact" },
}: ClosingInvitationProps) {
  return (
    <section className="section section--forest on-ground closing" aria-labelledby="closing-title">
      <div className="container closing__inner">
        <Reveal as="p" className="t-eyebrow">
          {eyebrow}
        </Reveal>
        <Reveal index={1}>
          <h2 id="closing-title" className="t-display-l">
            {title}
          </h2>
        </Reveal>
        <Reveal as="p" index={2} className="t-lede">
          {lede}
        </Reveal>
        <Reveal index={3}>
          <ButtonLink href={cta.href} variant="primary" arrow>
            {cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
