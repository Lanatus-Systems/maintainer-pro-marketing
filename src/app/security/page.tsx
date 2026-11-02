import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { SECURITY } from "@/content/security";
import { isAasaanWeb } from "@/lib/brand";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata = pageMeta({
  title: SECURITY.seoTitle,
  description: SECURITY.description,
  path: SECURITY.path,
});

export default function SecurityPage() {
  // Butterneck-only page: 404 on the AasaanWeb site.
  if (isAasaanWeb) notFound();
  return (
    <main id="content" className="legal-page">
      <JsonLd data={breadcrumbJsonLd(SECURITY.title, SECURITY.path)} />
      <p className="legal-kicker">Butterneck</p>
      <h1>{SECURITY.title}</h1>
      <p className="muted">{SECURITY.lead}</p>
      {SECURITY.facts.map((fact) => (
        <section key={fact.title}>
          <h2>{fact.title}</h2>
          {fact.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      <p className="muted legal-links">
        More detail:{" "}
        {SECURITY.moreDetail.map((item, i) => (
          <span key={item.href}>
            {i > 0 ? " · " : null}
            <Link href={item.href}>{item.label}</Link>
          </span>
        ))}
      </p>
      <p className="muted legal-links">
        Questions: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        {" · "}
        <Link href="/privacy">Privacy</Link>
        {" · "}
        <Link href="/jira/privacy">Jira privacy</Link>
        {" · "}
        <Link href="/contact">Contact</Link>
      </p>
    </main>
  );
}
