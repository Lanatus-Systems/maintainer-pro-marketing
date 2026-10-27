import Link from "next/link";
import type { ReactNode } from "react";
import { splitBlocks } from "@/lib/markdown";

/** Renders the small Markdown subset documented on BlogPost.body. No dependencies. */
export function PostBody({ body }: { body: string }) {
  return <div className="post-body">{splitBlocks(body).map((block, i) => renderBlock(block, i))}</div>;
}

function renderBlock(block: string, key: number): ReactNode {
  if (block.startsWith("```\n")) {
    return <pre key={key} className="post-code"><code>{block.slice(4)}</code></pre>;
  }
  if (block.startsWith("### ")) {
    const text = block.slice(4);
    return <h3 key={key} id={slugify(text)}>{inline(text)}</h3>;
  }
  if (block.startsWith("## ")) {
    const text = block.slice(3);
    return <h2 key={key} id={slugify(text)}>{inline(text)}</h2>;
  }
  const image = block.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"(\d+)x(\d+)")?\)$/);
  if (image) {
    const [, alt, src, w, h] = image;
    return (
      <figure key={key}>
        <img src={src} alt={alt} width={w ? Number(w) : undefined} height={h ? Number(h) : undefined} loading="lazy" decoding="async" />
        <figcaption>{alt}</figcaption>
      </figure>
    );
  }
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
  return <p key={key}>{inline(lines.join(" "))}</p>;
}

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const href = m[2];
      out.push(
        href.startsWith("/") ? (
          <Link key={k++} href={href}>{m[1]}</Link>
        ) : (
          <a key={k++} href={href} rel="noopener">{m[1]}</a>
        )
      );
    } else if (m[3]) out.push(<strong key={k++}>{m[3]}</strong>);
    else if (m[4]) out.push(<code key={k++}>{m[4]}</code>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
