/**
 * Site-wide facts, navigation and external destinations.
 *
 * Only owner-supplied, verified information belongs here. Anything not yet
 * confirmed is expressed through the <Pending> component in the page that
 * needs it, and listed in docs/OWNER-INPUTS.md.
 */

export const site = {
  name: "Kaycee Sunshine",
  fullName: "Coach Kaycee Sunshine",
  titles: ["Global Leadership Coach", "International Interpreter", "Language Educator"],
  tagline: "Leadership that travels beyond borders.",
  mission: "To develop leaders and equip them.",
  description:
    "Global leadership coach, international interpreter and language educator Kaycee Sunshine develops leaders and equips them to communicate across borders.",
} as const;

export type SocialKey = "linkedin" | "youtube" | "multilingualCoach" | "speakFrenchFast" | "bgycc";

export type Social = {
  key: SocialKey;
  label: string;
  handle: string;
  href: string;
  icon: "linkedin" | "youtube" | "instagram";
  summary: string;
};

export const socials: Record<SocialKey, Social> = {
  linkedin: {
    key: "linkedin",
    label: "LinkedIn",
    handle: "in/kayceesunshine",
    href: "https://www.linkedin.com/in/kayceesunshine/",
    icon: "linkedin",
    summary: "Professional updates and leadership writing.",
  },
  youtube: {
    key: "youtube",
    label: "YouTube",
    handle: "@coachkayceesunshine",
    href: "https://www.youtube.com/@coachkayceesunshine",
    icon: "youtube",
    summary: "Talks, lessons and conversations.",
  },
  multilingualCoach: {
    key: "multilingualCoach",
    label: "The Multilingual Coach",
    handle: "@themultilingualcoach",
    href: "https://www.instagram.com/themultilingualcoach/",
    icon: "instagram",
    summary: "Leadership and language, on Instagram.",
  },
  speakFrenchFast: {
    key: "speakFrenchFast",
    label: "Speak French Fast",
    handle: "@speakfrenchfast",
    href: "https://www.instagram.com/speakfrenchfast/",
    icon: "instagram",
    summary: "French learning, on Instagram.",
  },
  bgycc: {
    key: "bgycc",
    label: "BGYCC School of Leadership",
    handle: "@bgyccschoolofleadership",
    href: "https://www.instagram.com/bgyccschoolofleadership/",
    icon: "instagram",
    summary: "Classes and events, on Instagram.",
  },
};

export const socialList: Social[] = Object.values(socials);

export type NavLink = { label: string; href: string };

/** Primary navigation: six links and one CTA (design/components/SiteNav.md). */
export const mainNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Coaching", href: "/coaching" },
  { label: "Speaking", href: "/speaking" },
  { label: "Interpretation", href: "/interpretation" },
  { label: "Language", href: "/language" },
  { label: "Insights", href: "/insights" },
];

/** Between 1024px and 1180px the three service links group under "Work". */
export const workNav: NavLink[] = [
  { label: "Leadership & Coaching", href: "/coaching" },
  { label: "Speaking", href: "/speaking" },
  { label: "Interpretation", href: "/interpretation" },
];

export const navCta: NavLink = { label: "Work with Kaycee", href: "/contact" };

/** Secondary destinations surfaced in the mobile menu and footer. */
export const secondaryNav: NavLink[] = [
  { label: "Speak French Fast", href: "/speak-french-fast" },
  { label: "BGYCC School of Leadership", href: "/bgycc-school-of-leadership" },
  { label: "Videos & media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Work",
    links: [
      { label: "Leadership & Coaching", href: "/coaching" },
      { label: "Speaking", href: "/speaking" },
      { label: "Interpretation", href: "/interpretation" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Language Education", href: "/language" },
      { label: "Speak French Fast", href: "/speak-french-fast" },
      { label: "BGYCC School of Leadership", href: "/bgycc-school-of-leadership" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About Kaycee", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "Videos & media", href: "/media" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
