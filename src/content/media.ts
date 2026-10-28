/**
 * Photography, video and gallery content.
 *
 * Every entry here must be genuine. No photographs were supplied with the
 * design, so each image slot carries a `placeholder` naming the required shot.
 * To publish a real photo: add the file under /public/images, then set
 * `image` on the entry — the placeholder is ignored once `image` is present.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PlaceholderSpec = {
  /** The shot the owner needs to supply, e.g. "Portrait of Kaycee, natural light". */
  shot: string;
  /** CSS aspect-ratio, e.g. "4 / 5". */
  ratio: string;
};

export type Visual = { image?: ImageAsset; placeholder: PlaceholderSpec };

export const portraits = {
  hero: { placeholder: { shot: "Portrait of Kaycee, natural light", ratio: "4 / 5" } },
  about: { placeholder: { shot: "Portrait of Kaycee, three-quarter length", ratio: "4 / 5" } },
  aboutDetail: { placeholder: { shot: "Kaycee in conversation, documentary", ratio: "1 / 1" } },
  coaching: { placeholder: { shot: "Coaching session or leadership class", ratio: "4 / 5" } },
  speaking: { placeholder: { shot: "Kaycee on a conference stage", ratio: "16 / 9" } },
  interpretation: { placeholder: { shot: "Kaycee interpreting at an event", ratio: "4 / 5" } },
  language: { placeholder: { shot: "Kaycee teaching a language class", ratio: "4 / 5" } },
  speakFrenchFast: { placeholder: { shot: "Speak French Fast lesson or brand image", ratio: "1 / 1" } },
  bgycc: { placeholder: { shot: "BGYCC School of Leadership class or event", ratio: "1 / 1" } },
} satisfies Record<string, Visual>;

export type GalleryItem = Visual & {
  /** Verified caption: event name, city and year. */
  caption?: string;
  wide?: boolean;
};

/** Speaking and conference moments. Replace placeholders with real event photography. */
export const speakingGallery: GalleryItem[] = [
  { wide: true, placeholder: { shot: "Conference stage, wide", ratio: "21 / 9" } },
  { placeholder: { shot: "Workshop with delegates", ratio: "4 / 3" } },
  { placeholder: { shot: "Leadership session, detail", ratio: "4 / 3" } },
  { placeholder: { shot: "Interview or panel", ratio: "4 / 3" } },
  { placeholder: { shot: "Audience during a keynote", ratio: "4 / 3" } },
];

export type Video = {
  /** YouTube video id from youtube.com/watch?v=<id>. */
  id: string;
  /** Exact title as published on the channel. */
  title: string;
  /** Duration as shown on YouTube, e.g. "12:04". */
  duration?: string;
  kind: "talk" | "lesson" | "interview" | "highlight";
};

/**
 * Verified videos from https://www.youtube.com/@coachkayceesunshine.
 * Empty until the owner supplies the ids and exact titles — the channel was
 * not reachable from the build environment, and titles must not be guessed.
 */
export const videos: Video[] = [];

export const videoKindLabel: Record<Video["kind"], string> = {
  talk: "Talk",
  lesson: "Lesson",
  interview: "Interview",
  highlight: "Speaking highlight",
};
