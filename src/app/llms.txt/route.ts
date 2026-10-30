import { POSTS, postPath } from "@/content/blog";
import { legalPages } from "@/content/legal";
import { DEFINITION } from "@/content/landing";
import { AASAANWEB_PUBLISHED_POSTS, aasaanWebPostPath } from "@/content/aasaanweb-blog";
import { getAasaanWebPosts } from "@/lib/aasaanweb-blog";
import { brand, isAasaanWeb } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Generated from the post list so new posts appear automatically. */
export function GET() {
  if (isAasaanWeb) return aasaanWebLlms();
  const lines = [
    `# ${brand.name}`,
    "",
    `> ${DEFINITION}`,
    "",
    "Let them ask. You decide what goes live.",
    "",
    `${brand.name} is AI change requests for product teams. People ask on a live copy of the product. The AI edits the project on a computer the team connects. A developer decides what goes live.`,
    "",
    "## Key facts",
    "- Who asks: product managers, designers, support leads and other non-technical teammates, from a link to a live copy of the app (no install), or by labeling a Jira Cloud ticket `butterneck` and assigning it to a teammate whose Jira account is mapped to a computer that has the project.",
    "- Who edits: the AI coding agent the developer already uses (Cursor, Claude Code or Antigravity CLI), running on a computer the team connects (Node.js 22 or newer). Butterneck does not ship its own model.",
    "- What it never does: open a pull request, merge, or deploy. A developer decides what goes live and ships it the team's usual way.",
    "- Guardrails: the agent is limited to the connected folder and told to stay out of `.env` and any ignored paths; these are instructions plus the CLI's workspace setting, not an operating-system sandbox. Each turn is snapshotted so it can usually be undone.",
    "- Pricing: Starter is free (1 developer and 1 person who requests changes, 1 private copy). Pro is USD 19 per person per month, 20% off annual billing; a workspace owner on Starter can try Pro for one month. Custom plans by email.",
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

/** AasaanWeb build: its own llms.txt (the Butterneck text above is unchanged). */
function aasaanWebLlms() {
  const lines = [
    "# AasaanWeb",
    "",
    "> AasaanWeb helps small Indian businesses (shops, studios, clinics, manufacturers) create a landing page and keep it up to date by describing changes in plain words. Every change shows on a preview first, and the owner publishes it. Small changes go live in about 10 minutes.",
    "",
    "- Pricing: ₹5,000, paid at the end, after the page is built and 15 days of changes. Hosting and the domain name are not included; the team helps put the finished site online.",
    "- The app is at https://aasaan.butterneck.com/. AasaanWeb is made by Butterneck (https://www.butterneck.com/).",
    "",
    "## Pages",
    `- [Home](${siteUrl("/")}): what AasaanWeb does, how it works, questions`,
    `- [Our work](${siteUrl("/work")}): live pages made for real businesses (Parmanand Industries, Shivam Industries, EL360)`,
    `- [Pricing](${siteUrl("/pricing")})`,
    `- [Blog](${siteUrl("/blog")}): guides for small Indian businesses`,
    `- [About](${siteUrl("/about")}): what AasaanWeb is, who it is for, and who makes it`,
    `- [Contact](${siteUrl("/contact")})`,
    "",
    "## Guides",
    ...getAasaanWebPosts(AASAANWEB_PUBLISHED_POSTS).map(
      (p) => `- [${p.title}](${siteUrl(aasaanWebPostPath(p.slug))}): ${p.description}`,
    ),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
