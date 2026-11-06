import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

const pillars = [
  {
    id: "pillar-1",
    num: "01",
    tone: "leadership",
    eyebrow: "Pillar one · Leadership & coaching",
    title: "BGYCC School of Leadership",
    text: "Developing leaders who know themselves, decide with clarity and carry responsibility well — through coaching, classes and events.",
    cta: { label: "Explore BGYCC", href: "/bgycc-school-of-leadership" },
  },
  {
    id: "pillar-2",
    num: "02",
    tone: "voice",
    eyebrow: "Pillar two",
    title: "Public Speaking",
    text: "Keynotes, conferences, workshops and leadership sessions for organisations and events.",
    cta: { label: "Invite Kaycee to speak", href: "/speaking" },
  },
  {
    id: "pillar-3",
    num: "03",
    tone: "language",
    eyebrow: "Pillar three · Language education",
    title: "SFF · Speak French Fast",
    text: "Language as a leadership skill — learning to be understood, and to understand, across borders.",
    cta: { label: "Discover Speak French Fast", href: "/speak-french-fast" },
  },
] as const;

/**
 * The three professional pillars as one stacked set (space-1 between),
 * so the homepage never shows unrelated dark bands back to back.
 * design/components/PillarPanel.md
 */
export function PillarStack() {
  return (
    <div className="pillar-stack">
      {pillars.map((p) => (
        <section key={p.id} className={`kc-pillar kc-pillar--${p.tone} on-ground`} aria-labelledby={p.id}>
          <div className="kc-pillar__inner">
            <Reveal>
              <span className="kc-num" aria-hidden="true">
                {p.num}
              </span>
              <p className="t-eyebrow">{p.eyebrow}</p>
              <h3 id={p.id} className="t-h2">
                {p.title}
              </h3>
              <hr className="rule-champagne" />
            </Reveal>
            <Reveal index={1} className="kc-pillar__copy">
              <p>{p.text}</p>
              <ButtonLink href={p.cta.href} variant="primary" arrow>
                {p.cta.label}
              </ButtonLink>
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
