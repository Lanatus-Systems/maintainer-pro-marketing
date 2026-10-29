import { readFileSync } from "node:fs";
import path from "node:path";
import { AASAANWEB_ROUTABLE_POSTS, type AasaanWebPostEntry } from "@/content/aasaanweb-blog";

export type AasaanWebPost = AasaanWebPostEntry & {
  title: string;
  description: string;
  keywords: string[];
  /** Markdown body without the frontmatter and the leading "# " title (the page renders the h1). */
  body: string;
};

function unquote(value: string): string {
  const v = value.trim();
  return /^".*"$/.test(v) ? v.slice(1, -1) : v;
}

/** Reads <slug>.md at build time. Only simple `key: value` frontmatter is supported. */
function loadPost(entry: AasaanWebPostEntry): AasaanWebPost {
  const file = path.join(process.cwd(), "src/content/aasaanweb-posts", `${entry.slug}.md`);
  const raw = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const front: Record<string, string> = {};
  for (const line of (match?.[1] ?? "").split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) front[line.slice(0, i).trim()] = unquote(line.slice(i + 1));
  }
  const body = (match?.[2] ?? raw).trim().replace(/^# [^\n]*\n+/, "");
  const keywords = [front.target_keyword, ...(front.secondary ?? "").split(",")]
    .map((k) => k?.trim())
    .filter((k): k is string => Boolean(k));
  return {
    ...entry,
    title: front.title ?? entry.slug,
    description: front.meta_description ?? "",
    keywords,
    body,
  };
}

/** A post that may have a page (published, or a draft in preview mode); undefined otherwise. */
export function getAasaanWebPost(slug: string): AasaanWebPost | undefined {
  const entry = AASAANWEB_ROUTABLE_POSTS.find((p) => p.slug === slug);
  return entry ? loadPost(entry) : undefined;
}

export function getAasaanWebPosts(entries: AasaanWebPostEntry[]): AasaanWebPost[] {
  return entries.map(loadPost);
}

export function aasaanWebReadingMinutes(post: AasaanWebPost): number {
  return Math.max(1, Math.round(post.body.split(/\s+/).length / 200));
}

export function formatAasaanWebDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
