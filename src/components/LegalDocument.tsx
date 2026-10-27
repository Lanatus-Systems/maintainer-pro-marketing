import Link from "next/link";
import type { LegalPage } from "@/content/legal";
import { LEGAL_UPDATED } from "@/content/legal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { SUPPORT_EMAIL } from "@/lib/site";

export function LegalDocument({ page }: { page: LegalPage }) {
  return (
    <main id="content" className="legal-page">
      <JsonLd data={breadcrumbJsonLd(page.title, page.path)} />
      <p className="legal-kicker">{page.kicker}</p>
      <h1>{page.title}</h1>
      <p className="muted">Last updated {LEGAL_UPDATED}</p>
      {page.blocks.map((block) => (
        <section key={block.heading}>
          <h2>{block.heading}</h2>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{linkKnownPhrases(paragraph)}</p>
          ))}
        </section>
      ))}
      <p className="muted legal-links">
        Questions: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        {" · "}
        <Link href="/contact">Contact</Link>
        {" · "}
        <Link href="/privacy">Privacy</Link>
        {" · "}
        <Link href="/terms">Terms</Link>
        {" · "}
        <Link href="/jira/privacy">Jira privacy</Link>
        {" · "}
        <Link href="/jira/terms">Jira terms</Link>
      </p>
    </main>
  );
}

function linkKnownPhrases(paragraph: string) {
  const email = SUPPORT_EMAIL;
  if (!paragraph.includes(email) && !paragraph.includes("Jira privacy policy") && !paragraph.includes("Butterneck privacy policy") && !paragraph.includes("Butterneck terms")) {
    return paragraph;
  }

  const parts = paragraph.split(
    new RegExp(`(${escapeRegExp(email)}|Jira privacy policy|Butterneck privacy policy|Butterneck terms)`)
  );

  return parts.map((part, index) => {
    if (part === email) {
      return (
        <a key={index} href={`mailto:${email}`}>
          {email}
        </a>
      );
    }
    if (part === "Jira privacy policy") {
      return (
        <Link key={index} href="/jira/privacy">
          {part}
        </Link>
      );
    }
    if (part === "Butterneck privacy policy") {
      return (
        <Link key={index} href="/privacy">
          {part}
        </Link>
      );
    }
    if (part === "Butterneck terms") {
      return (
        <Link key={index} href="/terms">
          {part}
        </Link>
      );
    }
    return part;
  });
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
