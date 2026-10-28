type RevealTag = "div" | "section" | "li" | "figure" | "article" | "header" | "p" | "span" | "ul" | "ol" | "h2" | "h3";

type RevealProps = {
  as?: RevealTag;
  /** "up" (default): fade up 24px. "fade": opacity only. "mask": unmask upward. */
  variant?: "up" | "fade" | "mask";
  /** Position in a staggered sequence (max six per sequence). */
  index?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children: React.ReactNode;
};

/** Scroll-triggered entrance, played once. Observed by <RevealObserver>. */
export function Reveal({ as: Tag = "div", variant = "up", index = 0, className, style, id, children }: RevealProps) {
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={variant === "up" ? "" : variant}
      style={{ ...style, ["--i" as string]: Math.min(index, 5) }}
    >
      {children}
    </Tag>
  );
}
