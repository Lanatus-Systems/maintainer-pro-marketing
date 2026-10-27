import type { Metadata } from "next";
import { brand } from "@/lib/brand";

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
      title: ogTitle,
      description: opts.description,
      images: [image],
    },
  };
}
