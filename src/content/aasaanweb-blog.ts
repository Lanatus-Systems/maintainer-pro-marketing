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
  /** Cover image under /public (1200x630 PNG/JPG), used on the card, the post hero and og:image. */
  cover?: string;
  coverAlt?: string;
};

/** Branded navy/teal card with the AasaanWeb logo, for posts without their own cover. */
export const AASAANWEB_BLOG_FALLBACK_COVER = "/aasaanweb/blog/cover-fallback.png";

export const AASAANWEB_POSTS: AasaanWebPostEntry[] = [
  {
    slug: "google-par-apni-dukan-kaise-daalein",
    draft: false,
    date: "2026-10-31",
    lang: "hi-Latn-IN",
    author: "AasaanWeb team",
  },
  {
    slug: "dukan-ki-website-kaise-banaye",
    draft: true,
    date: "2026-10-29",
    lang: "hi-Latn-IN",
    author: "AasaanWeb team",
    cover: "/aasaanweb/blog/dukan-ki-website-kaise-banaye.png",
    coverAlt: "Cover for the guide: how to make a website for your shop, without coding.",
  },
  {
    slug: "business-website-kaise-banaye",
    draft: false,
    date: "2026-10-30",
    lang: "hi-Latn-IN",
    author: "AasaanWeb team",
  },
  {
    slug: "how-to-create-a-small-business-website-in-india-without-coding",
    draft: false,
    date: "2026-10-29",
    lang: "en-IN",
    author: "AasaanWeb team",
    cover: "/aasaanweb/blog/how-to-create-a-small-business-website-in-india-without-coding.png",
    coverAlt: "Cover for the guide: how to create a website for your small business in India without coding.",
  },
  {
    slug: "website-vs-google-business-profile",
    draft: false,
    date: "2026-10-29",
    lang: "en-IN",
    author: "AasaanWeb team",
    cover: "/aasaanweb/blog/website-vs-google-business-profile.png",
    coverAlt: "Cover comparing a business website with a Google Business Profile for an Indian shop.",
  },
  {
    slug: "how-to-update-website-content",
    draft: false,
    date: "2026-10-30",
    lang: "en-IN",
    author: "AasaanWeb team",
  },
  {
    slug: "small-business-website-must-haves",
    draft: false,
    date: "2026-10-29",
    lang: "en-IN",
    author: "AasaanWeb team",
    cover: "/aasaanweb/blog/small-business-website-must-haves.png",
    coverAlt: "Cover for the checklist: 7 things every small business website must have.",
  },
];

/** Drafts render only in a local dev server started with AASAANWEB_BLOG_PREVIEW=1. Never in a build. */
export const AASAANWEB_BLOG_PREVIEW =
  process.env.NODE_ENV === "development" && process.env.AASAANWEB_BLOG_PREVIEW === "1";

/** Published posts, newest first. Drafts are never listed, not even in preview. */
export const AASAANWEB_PUBLISHED_POSTS = AASAANWEB_POSTS.filter((p) => !p.draft).sort((a, b) =>
  b.date.localeCompare(a.date) || AASAANWEB_POSTS.indexOf(a) - AASAANWEB_POSTS.indexOf(b),
);

/** Posts that get a page: published ones, plus drafts in preview mode. */
export const AASAANWEB_ROUTABLE_POSTS = AASAANWEB_POSTS.filter((p) => !p.draft || AASAANWEB_BLOG_PREVIEW);

export function aasaanWebPostPath(slug: string): string {
  return `/blog/${slug}`;
}
