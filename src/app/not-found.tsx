import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: "Leadership & Coaching", href: "/coaching" },
  { label: "Speaking", href: "/speaking" },
  { label: "Interpretation", href: "/interpretation" },
  { label: "Language Education", href: "/language" },
  { label: "Insights", href: "/insights" },
];

export default function NotFound() {
  return (
    <section className="section section--ivory not-found hero-anim" aria-labelledby="nf-title">
      <div className="container not-found__inner">
        <p className="t-eyebrow hero-follow">Page not found</p>
        <h1 id="nf-title" className="t-display-l">
          <span className="line-mask">
            <span>
              This page has <em>moved on</em>.
            </span>
          </span>
        </h1>
        <p className="t-lede muted hero-follow" style={{ ["--i" as string]: 1 }}>
          The address may be mistyped, or the page may no longer exist. These are good places to continue.
        </p>
        <ul className="not-found__links hero-follow" role="list" style={{ ["--i" as string]: 2 }}>
          {suggestions.map((s) => (
            <li key={s.href}>
              <TextLink href={s.href} arrow>
                {s.label}
              </TextLink>
            </li>
          ))}
        </ul>
        <div className="actions hero-follow" style={{ ["--i" as string]: 3 }}>
          <ButtonLink href="/" variant="primary" arrow>
            Return home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
