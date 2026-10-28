type PendingProps = {
  /** What the owner needs to confirm, e.g. "language combinations". */
  children: React.ReactNode;
  block?: boolean;
};

/**
 * A visible `[OWNER TO CONFIRM: …]` marker (design/BRAND.md § Content fundamentals).
 * Every use is logged in docs/OWNER-INPUTS.md. Replace with verified content.
 */
export function Pending({ children, block }: PendingProps) {
  const Tag = block ? "p" : "span";
  return <Tag className={block ? "pending pending--block" : "pending"}>[OWNER TO CONFIRM: {children}]</Tag>;
}
