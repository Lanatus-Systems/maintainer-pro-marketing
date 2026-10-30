import type { MetadataRoute } from "next";
import { POSTS, postPath } from "@/content/blog";
import { LEGAL_UPDATED, legalPages } from "@/content/legal";
import { AASAANWEB_ABOUT_UPDATED, AASAANWEB_HOME_UPDATED } from "@/lib/aasaanweb";
import { AASAANWEB_LEGAL, AASAANWEB_LEGAL_UPDATED } from "@/content/aasaanweb-legal";
import { isAasaanWeb } from "@/lib/brand";
import { AASAANWEB_PUBLISHED_POSTS, aasaanWebPostPath } from "@/content/aasaanweb-blog";
import { siteUrl } from "@/lib/site";

/**
 * Real per-page modified dates. Posts use their own date (or `updated`), legal pages use the
 * "Last updated" date they show, and the product pages use the date their copy last changed.
 * Bump PRODUCT_PAGES_UPDATED when home, /pricing or /integrations/jira copy changes.
 */
const PRODUCT_PAGES_UPDATED = "2026-10-30";
const LEGAL_LAST_MODIFIED = new Date(`${LEGAL_UPDATED} 00:00:00 UTC`);

function latestPostDate(): string {
  return POSTS.map((p) => p.updated ?? p.date).sort().at(-1) ?? PRODUCT_PAGES_UPDATED;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // AasaanWeb: the same public pages as aasaan.butterneck.com, minus the Jira legal pages,
  // plus the blog. Drafts (draft: true in src/content/aasaanweb-blog.ts) never appear here.
  if (isAasaanWeb) {
    const legalModified = new Date(`${AASAANWEB_LEGAL_UPDATED} 00:00:00 UTC`);
    const posts = AASAANWEB_PUBLISHED_POSTS;
    const latestPost = posts.map((p) => p.updated ?? p.date).sort().at(-1);
    return [
      { url: siteUrl("/"), lastModified: new Date(AASAANWEB_HOME_UPDATED), changeFrequency: "monthly", priority: 1 },
      { url: siteUrl("/work"), lastModified: new Date(AASAANWEB_HOME_UPDATED), changeFrequency: "monthly", priority: 0.8 },
      { url: siteUrl("/pricing"), lastModified: new Date(AASAANWEB_HOME_UPDATED), changeFrequency: "monthly", priority: 0.8 },
      { url: siteUrl("/about"), lastModified: new Date(AASAANWEB_ABOUT_UPDATED), changeFrequency: "monthly", priority: 0.7 },
      {
        url: siteUrl("/blog"),
        lastModified: new Date(latestPost ?? AASAANWEB_HOME_UPDATED),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      ...posts.map((p) => ({
        url: siteUrl(aasaanWebPostPath(p.slug)),
        lastModified: new Date(p.updated ?? p.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...Object.values(AASAANWEB_LEGAL)
        .filter((page) => !page.path.startsWith("/jira/"))
        .map((page) => ({
        url: siteUrl(page.path),
        lastModified: legalModified,
        changeFrequency: "yearly" as const,
        priority: 0.3,
      })),
    ];
  }
  const legal = Object.values(legalPages).map((page) => ({
    url: siteUrl(page.path),
    lastModified: LEGAL_LAST_MODIFIED,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));
  return [
    { url: siteUrl("/"), lastModified: new Date(PRODUCT_PAGES_UPDATED), changeFrequency: "weekly", priority: 1 },
    {
      url: siteUrl("/blog"),
      lastModified: new Date(latestPostDate()),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...POSTS.map((p) => ({
      url: siteUrl(postPath(p.slug)),
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: siteUrl("/pricing"), lastModified: new Date(PRODUCT_PAGES_UPDATED), changeFrequency: "monthly", priority: 0.8 },
    { url: siteUrl("/integrations/jira"), lastModified: new Date(PRODUCT_PAGES_UPDATED), changeFrequency: "monthly", priority: 0.8 },
    ...legal,
  ];
}
