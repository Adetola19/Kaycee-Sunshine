/**
 * Photography, video and gallery content.
 *
 * Every entry here must be genuine. Owner-supplied photos live in
 * /public/images and are set as `image`; slots still waiting for a photo
 * carry a `placeholder` naming the required shot, which is ignored once
 * `image` is present.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used when the photo is cropped, e.g. "50% 30%". */
  position?: string;
};

export type PlaceholderSpec = {
  /** The shot the owner needs to supply, e.g. "Portrait of Kaycee, natural light". */
  shot: string;
  /** CSS aspect-ratio, e.g. "4 / 5". */
  ratio: string;
};

export type Visual = { image?: ImageAsset; placeholder: PlaceholderSpec };

const photos = {
  portraitNavy: {
    src: "/images/kaycee-portrait-navy.jpg",
    alt: "Coach Kaycee Sunshine smiling, in a navy suit and tie",
    width: 1342,
    height: 2000,
    position: "50% 30%",
  },
  portraitCharcoal: {
    src: "/images/kaycee-portrait-charcoal.jpg",
    alt: "Coach Kaycee Sunshine smiling, in a charcoal suit with a navy tie",
    width: 1342,
    height: 2000,
    position: "50% 30%",
  },
  portraitGrey: {
    src: "/images/kaycee-portrait-grey.jpg",
    alt: "Coach Kaycee Sunshine smiling, in a grey blazer over a black T-shirt",
    width: 1342,
    height: 2000,
    position: "50% 30%",
  },
  stage: {
    src: "/images/kaycee-stage-speaking.jpg",
    alt: "Coach Kaycee Sunshine speaking on stage with a headset microphone",
    width: 2000,
    height: 1333,
    position: "45% 40%",
  },
  bgycc: {
    src: "/images/kaycee-bgycc-teaching.jpg",
    alt: "Coach Kaycee Sunshine teaching a class at BGYCC School of Leadership",
    width: 1416,
    height: 2000,
    position: "50% 25%",
  },
} satisfies Record<string, ImageAsset>;

export const portraits = {
  hero: { image: photos.portraitNavy, placeholder: { shot: "Portrait of Kaycee, natural light", ratio: "4 / 5" } },
  about: { image: photos.portraitCharcoal, placeholder: { shot: "Portrait of Kaycee, three-quarter length", ratio: "4 / 5" } },
  aboutDetail: { image: photos.stage, placeholder: { shot: "Kaycee in conversation, documentary", ratio: "1 / 1" } },
  meet: { image: photos.portraitGrey, placeholder: { shot: "Portrait of Kaycee, relaxed", ratio: "4 / 5" } },
  speaking: { image: photos.stage, placeholder: { shot: "Kaycee on a conference stage", ratio: "16 / 9" } },
  bgycc: { image: photos.bgycc, placeholder: { shot: "BGYCC School of Leadership class or event", ratio: "4 / 5" } },
  speakFrenchFast: { placeholder: { shot: "Speak French Fast lesson or brand image", ratio: "1 / 1" } },
} satisfies Record<string, Visual>;

export type GalleryItem = Visual & {
  /** Verified caption: event name, city and year. */
  caption?: string;
  wide?: boolean;
};

/** Speaking and conference moments. Remaining placeholders await more event photography. */
export const speakingGallery: GalleryItem[] = [
  { wide: true, image: photos.stage, placeholder: { shot: "Conference stage, wide", ratio: "21 / 9" } },
  {
    image: photos.bgycc,
    caption: "Teaching at BGYCC School of Leadership",
    placeholder: { shot: "Leadership session", ratio: "4 / 3" },
  },
  { placeholder: { shot: "Workshop with delegates", ratio: "4 / 3" } },
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
