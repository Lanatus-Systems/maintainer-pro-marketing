import { POSTS, postPath } from "@/content/blog";
import { legalPages } from "@/content/legal";
import { DEFINITION } from "@/content/landing";
import { brand, isAasaanWeb } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Generated from the post list so new posts appear automatically. */
export function GET() {
  // Butterneck-only route: 404 on the AasaanWeb site.
  if (isAasaanWeb) return new Response("Not found", { status: 404 });
  const lines = [
    `# ${brand.name}`,
    "",
    `> ${DEFINITION}`,
    "",
    "Let them ask. You decide what goes live.",
    "",
    `${brand.name} is for product teams. People ask on a live copy of the product. The AI edits the project on a computer the team connects. A developer decides what goes live.`,
    "",
    "## Pages",
    `- Home: ${siteUrl("/")}`,
    `- Pricing: ${siteUrl("/pricing")}`,
    `- Jira integration: ${siteUrl("/integrations/jira")}`,
    `- Blog: ${siteUrl("/blog")}`,
    ...Object.values(legalPages).map((p) => `- ${p.title}: ${siteUrl(p.path)}`),
    "",
    "## Blog posts",
    ...POSTS.map((p) => `- [${p.title}](${siteUrl(postPath(p.slug))}): ${p.description}`),
    "",
    "The product app (signup, login, workspaces) is at https://app.butterneck.com.",
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
