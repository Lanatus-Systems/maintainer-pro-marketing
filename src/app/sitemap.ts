import type { MetadataRoute } from "next";
import { legalPages } from "@/content/legal";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...Object.values(legalPages).map((page) => page.path)];
  return paths.map((path) => ({
    url: siteUrl(path),
    lastModified: new Date("2026-10-27"),
    changeFrequency: path === "/" ? "weekly" : "yearly",
    priority: path === "/" ? 1 : 0.4,
  }));
}
