import { SITE_DESCRIPTION, SITE_TITLE, siteUrl, X_HANDLE } from "@/lib/site";
import type { Metadata } from "next";
import { brand } from "@/lib/brand";

/** Site-wide Open Graph defaults (layout), reused by the home page so it can add og:url. */
export const SITE_OPEN_GRAPH: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: brand.name,
  locale: "en_US",
  title: SITE_TITLE,
  // Same as the meta description, so link previews carry the quotable definition.
  description: SITE_DESCRIPTION,
  images: [
    {
      url: "/og.png",
      width: 1280,
      height: 720,
      alt: `${brand.name}: let them ask. You decide what goes live.`,
    },
  ],
};

/** Per-page metadata with its own canonical, Open Graph and Twitter tags. */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const image = opts.image ?? "/og.png";
  const ogTitle = `${opts.title} — ${brand.name}`;
  // Self-referencing absolute canonical on the www host, same form as the sitemap URL.
  const url = siteUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: brand.name,
      title: ogTitle,
      description: opts.description,
      url,
      images: [{ url: image, alt: opts.imageAlt ?? ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      site: X_HANDLE,
      creator: X_HANDLE,
      title: ogTitle,
      description: opts.description,
      images: [image],
    },
  };
}
