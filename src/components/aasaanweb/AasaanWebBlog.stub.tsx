import type { Metadata } from "next";
import type { AasaanWebPost } from "@/lib/aasaanweb-blog";

/**
 * Butterneck build stand-in for AasaanWebBlog.tsx (see turbopack.resolveAlias in next.config.ts).
 * The real module imports the AasaanWeb stylesheets; aliasing it away keeps those styles and
 * scripts out of www.butterneck.com's /blog pages, so the Butterneck build output is unchanged.
 */
export const aasaanWebBlogIndexMeta: Metadata = {};

export function aasaanWebPostMeta(_post: AasaanWebPost, _preview: boolean): Metadata {
  return {};
}

export function AasaanWebBlogIndex() {
  return null;
}

export function AasaanWebBlogPost(_props: { post: AasaanWebPost; preview: boolean }) {
  return null;
}
