import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { siteUrl } from "@/lib/seo";

const routes = [
  "/",
  "/about",
  "/coaching",
  "/speaking",
  "/interpretation",
  "/language",
  "/speak-french-fast",
  "/bgycc-school-of-leadership",
  "/insights",
  "/media",
  "/contact",
  "/privacy",
];

/** Absolute URLs need the production origin (NEXT_PUBLIC_SITE_URL); without it the sitemap is empty. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  if (!base) return [];
  const articleRoutes = articles.filter((a) => a.body).map((a) => `/insights/${a.slug}`);
  return [...routes, ...articleRoutes].map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: path === "/" || path === "/insights" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
