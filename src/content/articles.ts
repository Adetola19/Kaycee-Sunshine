import type { ImageAsset } from "./media";

/**
 * Insights journal.
 *
 * Add an entry to publish an article. Articles either live on this site
 * (`body`) or elsewhere (`externalUrl`, e.g. a LinkedIn article), in which
 * case the card links out. Only real, owner-approved articles belong here.
 */

export const articleCategories = [
  "Leadership",
  "Personal Development",
  "Communication",
  "Language Learning",
  "Speaking & Ideas",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "ul"; items: string[] };

type ArticleBase = {
  slug: string;
  title: string;
  category: ArticleCategory;
  /** ISO date, e.g. "2026-03-14". */
  date: string;
  readingMinutes?: number;
  excerpt: string;
  image?: ImageAsset;
};

export type Article =
  | (ArticleBase & { body: ArticleBlock[]; externalUrl?: never })
  | (ArticleBase & { externalUrl: string; body?: never });

export const articles: Article[] = [];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function sortedArticles(): Article[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export function articleHref(article: Article): string {
  return article.externalUrl ?? `/insights/${article.slug}`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
