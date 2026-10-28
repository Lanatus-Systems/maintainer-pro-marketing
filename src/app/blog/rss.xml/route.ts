import { POSTS, postPath } from "@/content/blog";
import { brand, isAasaanWeb } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function GET() {
  // Butterneck-only route: 404 on the AasaanWeb site.
  if (isAasaanWeb) return new Response("Not found", { status: 404 });
  const items = POSTS.map((p) => {
    const url = siteUrl(postPath(p.slug));
    return `<item><title>${esc(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate><description>${esc(p.description)}</description>${p.tags.map((t) => `<category>${esc(t)}</category>`).join("")}</item>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(brand.name)} blog</title><link>${siteUrl("/blog")}</link><atom:link href="${siteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml"/><description>Notes from the ${esc(brand.name)} team.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
