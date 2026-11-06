import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = [
  "/",
  "/about",
  "/speaking",
  "/speak-french-fast",
  "/bgycc-school-of-leadership",
  "/media",
  "/contact",
  "/privacy",
];

/** Absolute URLs need the production origin (NEXT_PUBLIC_SITE_URL); without it the sitemap is empty. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  if (!base) return [];
  return routes.map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
