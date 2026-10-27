import { post as itera } from "@/content/posts/itera-alternative";
import { post as pms } from "@/content/posts/how-pms-can-change-a-live-app-without-waiting-on-engineering";
import { post as jira } from "@/content/posts/jira-ticket-to-pr-with-ai";
import { post as aicr } from "@/content/posts/ai-change-requests-for-product-teams";
import { post as shareLocalApp } from "@/content/posts/share-local-app-without-deploying";
import { post as sandboxOnYourMachine } from "@/content/posts/run-ai-coding-agent-sandbox-on-your-machine";
import { post as hitlArchitecture } from "@/content/posts/human-in-the-loop-architecture-for-ai-product-changes";
import { post as humanInTheLoop } from "@/content/posts/human-in-the-loop-ai-coding";
import { post as policyTemplate } from "@/content/posts/ai-change-request-policy-template";
import { post as pmsShipCode } from "@/content/posts/should-product-managers-ship-code";
import { post as aiPrsOwner } from "@/content/posts/ai-prs-need-an-owner";
import { post as clogless } from "@/content/posts/clogless-alternative";
import { post as claudeCodePms } from "@/content/posts/claude-code-for-product-managers";
import { post as changeRequestTemplate } from "@/content/posts/how-to-write-a-change-request-for-ai";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  cover: { src: string; alt: string; width: number; height: number };
  /**
   * Body in a small Markdown subset: "## " / "### " headings, "- " lists,
   * "1. " lists, "> " quotes, ![alt](src "WxH") images, [text](href) links,
   * **bold**, `code`, fenced ``` blocks, and "| a | b |" pipe tables (header row,
   * "|---|---|" separator, then rows; each row's first cell is a row header).
   * Blocks are separated by a blank line.
   * A "## FAQ" section ("### " question + answer paragraphs) is also emitted as FAQPage JSON-LD.
   */
  body: string;
};

export const POSTS: BlogPost[] = [changeRequestTemplate, claudeCodePms, clogless, aiPrsOwner, policyTemplate, pmsShipCode, itera, pms, jira, aicr, sandboxOnYourMachine, hitlArchitecture, humanInTheLoop, shareLocalApp].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function postPath(slug: string): string {
  return `/blog/${slug}`;
}

export function readingMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(post.body.split(/\s+/).length / 220));
}

/** "28 October 2026": used for the visible "Updated <date>" byline note. */
export function formatUpdatedDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
