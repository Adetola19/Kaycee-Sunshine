import Link from "next/link";
import { Icon } from "./Icon";

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  /** Trailing arrow that nudges on hover. External links always show ↗. */
  arrow?: boolean;
  size?: "default" | "nav";
  className?: string;
};

/** Button — design/components/Button.md. Navigational, so always an anchor. */
export function ButtonLink({ href, children, variant = "outline", arrow, size = "default", className }: ButtonLinkProps) {
  const cls = ["kc-btn", variant === "primary" && "kc-btn-primary", size === "nav" && "kc-btn--nav", className]
    .filter(Boolean)
    .join(" ");

  if (isExternal(href)) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <Icon name="arrow-up-right" className="kc-arrow-ext" />
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link className={cls} href={href}>
      {children}
      {arrow && <Icon name="arrow-right" className="kc-arrow" />}
    </Link>
  );
}
