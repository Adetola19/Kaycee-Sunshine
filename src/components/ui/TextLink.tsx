import Link from "next/link";
import { Icon } from "./Icon";
import { isExternal } from "./Button";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  /** Underline visible by default — use inside running copy. */
  inline?: boolean;
  arrow?: boolean;
  className?: string;
};

/** TextLink — design/components/TextLink.md. External links get ↗ and open in a new tab. */
export function TextLink({ href, children, inline, arrow, className }: TextLinkProps) {
  const cls = ["kc-link", inline && "kc-link-static", className].filter(Boolean).join(" ");

  if (isExternal(href)) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <Icon name="arrow-up-right" />
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link className={cls} href={href}>
      {children}
      {arrow && <Icon name="arrow-right" />}
    </Link>
  );
}
