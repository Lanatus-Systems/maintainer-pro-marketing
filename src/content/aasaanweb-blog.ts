/**
 * AasaanWeb blog (APP_NAME=maintainer-pro only). Each post's text lives verbatim in
 * src/content/aasaanweb-posts/<slug>.md; this registry holds the publishing state.
 *
 * To publish a post, flip `draft: true` to `draft: false` (and set `date` to the publish day).
 * A draft is not on /blog, not in the sitemap, and its page 404s in production. It renders only
 * under `next dev` with AASAANWEB_BLOG_PREVIEW=1, with a noindex "Draft preview" banner.
 */
export type AasaanWebPostEntry = {
  slug: string;
  draft: boolean;
  /** ISO date (YYYY-MM-DD) shown on the post and used for datePublished and the sitemap. */
  date: string;
  updated?: string;
  /** BCP 47 language of the text, for <article lang> and JSON-LD inLanguage. */
  lang: string;
  author: string;
};

export const AASAANWEB_POSTS: AasaanWebPostEntry[] = [
  {
    slug: "dukan-ki-website-kaise-banaye",
    draft: true,
    date: "2026-10-29",
    lang: "hi-Latn-IN",
    author: "AasaanWeb team",
  },
];

/** Drafts render only in a local dev server started with AASAANWEB_BLOG_PREVIEW=1. Never in a build. */
export const AASAANWEB_BLOG_PREVIEW =
  process.env.NODE_ENV === "development" && process.env.AASAANWEB_BLOG_PREVIEW === "1";

/** Published posts, newest first. Drafts are never listed, not even in preview. */
export const AASAANWEB_PUBLISHED_POSTS = AASAANWEB_POSTS.filter((p) => !p.draft).sort((a, b) =>
  (b.date).localeCompare(a.date),
);

/** Posts that get a page: published ones, plus drafts in preview mode. */
export const AASAANWEB_ROUTABLE_POSTS = AASAANWEB_POSTS.filter((p) => !p.draft || AASAANWEB_BLOG_PREVIEW);

export function aasaanWebPostPath(slug: string): string {
  return `/blog/${slug}`;
}
