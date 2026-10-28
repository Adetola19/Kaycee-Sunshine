import Link from "next/link";
import type { Visual as VisualData } from "@/content/media";
import { Visual } from "@/components/media/Visual";
import { Parallax } from "@/components/motion/Parallax";

export type Tone = "ivory" | "sage-wash" | "sage" | "forest" | "charcoal" | "slate";

const toneClass: Record<Tone, string> = {
  ivory: "section--ivory",
  "sage-wash": "section--sage-wash",
  sage: "section--sage",
  forest: "section--forest on-ground",
  charcoal: "section--charcoal on-ground",
  slate: "section--slate on-ground tone-slate",
};

export function toneClassName(tone: Tone) {
  return toneClass[tone];
}

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  actions?: React.ReactNode;
  visual?: VisualData;
  tone?: Tone;
  /** Parent page for the breadcrumb, e.g. { label: "Language", href: "/language" }. */
  parent?: { label: string; href: string };
  children?: React.ReactNode;
};

/** Inner-page hero: display-l title, lede, CTAs and an optional unmasking photograph. */
export function PageHero({ eyebrow, title, lede, actions, visual, tone = "ivory", parent, children }: PageHeroProps) {
  const dark = tone === "forest" || tone === "charcoal" || tone === "slate";
  return (
    <section className={`page-hero hero-anim ${toneClass[tone]}`} aria-labelledby="page-title">
      <div className="container">
        <div className={visual ? "page-hero__grid page-hero__grid--media" : "page-hero__grid"}>
          <div className="page-hero__text">
            {parent && (
              <nav aria-label="Breadcrumb" className="hero-follow">
                <ol className="breadcrumb t-meta">
                  <li>
                    <Link href={parent.href}>{parent.label}</Link>
                  </li>
                  <li aria-current="page">{eyebrow}</li>
                </ol>
              </nav>
            )}
            <p className="t-eyebrow hero-follow">{eyebrow}</p>
            <h1 id="page-title" className="t-display-l">
              <span className="line-mask">
                <span>{title}</span>
              </span>
            </h1>
            {lede && (
              <p className="t-lede hero-follow" style={{ ["--i" as string]: 1 }}>
                {lede}
              </p>
            )}
            {actions && (
              <div className="actions hero-follow" style={{ ["--i" as string]: 2, marginTop: "var(--space-3)" }}>
                {actions}
              </div>
            )}
            {children}
          </div>
          {visual && (
            <Parallax className="page-hero__media hero-portrait" style={{ aspectRatio: visual.placeholder.ratio }}>
              <Visual visual={visual} sizes="(min-width: 1024px) 45vw, 100vw" priority dark={dark} />
            </Parallax>
          )}
        </div>
      </div>
    </section>
  );
}
