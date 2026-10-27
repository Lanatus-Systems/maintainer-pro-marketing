import { SITE_OG_DESCRIPTION, SITE_TITLE, X_HANDLE } from "@/lib/site";
import type { Metadata } from "next";
import { brand } from "@/lib/brand";

/** Site-wide Open Graph defaults (layout), reused by the home page so it can add og:url. */
export const SITE_OPEN_GRAPH: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: brand.name,
  locale: "en_US",
  title: SITE_TITLE,
  description: SITE_OG_DESCRIPTION,
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
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "website",
      siteName: brand.name,
      title: ogTitle,
      description: opts.description,
      url: opts.path,
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
