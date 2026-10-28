/** Thin-stroke line icons (1.5px, square caps) — design/BRAND.md § Iconography. */

export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "play"
  | "plus"
  | "close"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "check"
  | "menu"
  | "linkedin"
  | "youtube"
  | "instagram";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M4 12h15M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  plus: <path d="M12 4.5v15M4.5 12h15" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-left": <path d="m15 6-6 6 6 6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  menu: <path d="M4 8h16M4 16h16" />,
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 10.5V16.5M8 7.5v.01M11.5 16.5v-6M11.5 13c0-1.6 1.1-2.6 2.5-2.6s2.5.9 2.5 2.6v3.5" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.75" y="5.75" width="18.5" height="12.5" rx="3" />
      <path d="m10.25 9.25 4.5 2.75-4.5 2.75z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.75" />
      <path d="M16.9 7.1v.01" />
    </>
  ),
};

type IconProps = {
  name: IconName;
  className?: string;
  /** Accessible label; omit for decorative icons. */
  label?: string;
};

export function Icon({ name, className, label }: IconProps) {
  return (
    <svg
      className={["kc-icon", className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
