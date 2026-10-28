import type { Metadata } from "next";
import { site } from "@/content/site";

/** Production origin from NEXT_PUBLIC_SITE_URL; undefined until the domain is known. */
export function siteUrl(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;
  try {
    return new URL(raw);
  } catch {
    return undefined;
  }
}

type PageMeta = {
  title: string;
  description: string;
  /** Route path, e.g. "/coaching". */
  path: string;
  noindex?: boolean;
};

/** Page-specific metadata: title, description, canonical (when the domain is known) and Open Graph. */
export function pageMetadata({ title, description, path, noindex }: PageMeta): Metadata {
  const hasDomain = Boolean(siteUrl());
  return {
    title,
    description,
    alternates: hasDomain ? { canonical: path } : undefined,
    openGraph: {
      title: `${title} · ${site.fullName}`,
      description,
      url: hasDomain ? path : undefined,
      siteName: site.fullName,
      locale: "en_GB",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${title} · ${site.fullName}`, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
