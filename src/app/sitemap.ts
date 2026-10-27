import type { MetadataRoute } from "next";
import { POSTS, postPath } from "@/content/blog";
import { legalPages } from "@/content/legal";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const legal = Object.values(legalPages).map((page) => ({
    url: siteUrl(page.path),
    lastModified: new Date("2026-10-27"),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));
  return [
    { url: siteUrl("/"), lastModified: new Date("2026-10-27"), changeFrequency: "weekly", priority: 1 },
    {
      url: siteUrl("/blog"),
      lastModified: new Date(POSTS[0]?.date ?? "2026-10-27"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...POSTS.map((p) => ({
      url: siteUrl(postPath(p.slug)),
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...legal,
  ];
}
