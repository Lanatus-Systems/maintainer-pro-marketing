import type { ReactNode } from "react";
import { splitBlocks } from "@/lib/markdown";

/**
 * AasaanWeb post renderer: the same Markdown subset as the Butterneck PostBody, kept separate so
 * Butterneck pages never change. Bold may wrap a link, and a paragraph's line breaks are kept.
 */
export function AasaanWebPostBody({ body }: { body: string }) {
  return <div className="aw-post-body">{splitBlocks(body).map((block, i) => renderBlock(block, i))}</div>;
}

function renderBlock(block: string, key: number): ReactNode {
  if (block.startsWith("```\n")) return <pre key={key}><code>{block.slice(4)}</code></pre>;
  if (block.startsWith("### ")) return <h3 key={key} id={slugify(block.slice(4))}>{inline(block.slice(4))}</h3>;
  if (block.startsWith("## ")) return <h2 key={key} id={slugify(block.slice(3))}>{inline(block.slice(3))}</h2>;
  const lines = block.split("\n");
  if (lines.every((l) => l.startsWith("- "))) {
    return <ul key={key}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
  }
  if (lines.every((l) => /^\d+\. /.test(l))) {
    return <ol key={key}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\d+\. /, ""))}</li>)}</ol>;
  }
  if (lines.every((l) => l.startsWith("> "))) {
    return <blockquote key={key}><p>{inline(lines.map((l) => l.slice(2)).join(" "))}</p></blockquote>;
  }
  return (
    <p key={key}>
      {lines.map((l, j) => (
        <span key={j}>
          {j > 0 ? <br /> : null}
          {inline(l)}
        </span>
      ))}
    </p>
  );
}

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={k++}>{inline(m[1])}</strong>);
    else if (m[2] !== undefined) {
      const href = m[3];
      out.push(
        <a key={k++} href={href} {...(/^https?:/.test(href) && !href.includes("aasaanweb.butterneck.com") ? { rel: "noopener" } : {})}>
          {m[2]}
        </a>,
      );
    } else if (m[4] !== undefined) out.push(<code key={k++}>{m[4]}</code>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
