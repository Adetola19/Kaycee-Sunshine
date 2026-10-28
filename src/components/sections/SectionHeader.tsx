import { Reveal } from "@/components/motion/Reveal";

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** A link or CTA aligned to the right on desktop. */
  aside?: React.ReactNode;
  id?: string;
  /** Heading level; sections default to h2. */
  level?: 2 | 3;
  size?: "h1" | "h2";
};

export function SectionHeader({ eyebrow, title, lede, aside, id, level = 2, size = "h1" }: SectionHeaderProps) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div className={aside ? "section-head section-head--split" : "section-head"}>
      <div className="section-head__titles">
        {eyebrow && (
          <Reveal as="p" className="t-eyebrow">
            {eyebrow}
          </Reveal>
        )}
        <Reveal index={1}>
          <Heading id={id} className={size === "h1" ? "t-h1" : "t-h2"}>
            {title}
          </Heading>
        </Reveal>
        {lede && (
          <Reveal as="p" index={2} className="t-lede">
            {lede}
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal index={2} className="section-head__aside">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
