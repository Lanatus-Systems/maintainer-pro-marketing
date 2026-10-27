/** Splits on blank lines, but keeps a fenced ``` block (which may contain blank lines) whole. */
export function splitBlocks(body: string): string[] {
  const out: string[] = [];
  const parts = body.trim().split(/^```[^\n]*$/m);
  parts.forEach((part, i) => {
    if (i % 2 === 1) out.push("```\n" + part.replace(/^\n|\n$/g, ""));
    else out.push(...part.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean));
  });
  return out;
}

/** Plain visible text of an inline Markdown string, as PostBody renders it (links keep their text). */
export function plainInline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

/** Plain visible text of one body block (paragraph, list or quote). */
function plainBlock(block: string): string {
  return block
    .split("\n")
    .map((l) => plainInline(l.replace(/^(- |\d+\. |> )/, "")))
    .join(" ");
}

export type FaqItem = { q: string; a: string };

/**
 * Q&A pairs from a post's "## FAQ" section: each "### " heading is a question and the
 * blocks under it, up to the next heading, are its answer. Text matches what the page shows.
 */
export function extractFaq(body: string): FaqItem[] {
  const blocks = splitBlocks(body);
  const start = blocks.findIndex((b) => /^## (FAQ|Frequently asked questions)\s*$/i.test(b));
  if (start < 0) return [];
  const items: FaqItem[] = [];
  for (let i = start + 1; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.startsWith("## ")) break;
    if (b.startsWith("### ")) {
      items.push({ q: plainInline(b.slice(4)), a: "" });
    } else if (items.length && !b.startsWith("```")) {
      const last = items[items.length - 1];
      last.a = last.a ? `${last.a} ${plainBlock(b)}` : plainBlock(b);
    }
  }
  return items.filter((it) => it.q && it.a);
}
