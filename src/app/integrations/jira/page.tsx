import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { JIRA } from "@/content/landing";
import { pageMeta } from "@/lib/meta";
import { breadcrumbJsonLd } from "@/lib/schema";
import { appUrl, WALKTHROUGH_URL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Jira integration: a Jira label is the new prompt",
  description:
    "Label a Jira Cloud ticket butterneck and assign it. Butterneck opens a private copy named after the ticket, the AI works from the ticket, and a preview link is posted back. Nothing merges.",
  path: "/integrations/jira",
});

export default function JiraIntegrationPage() {
  return (
    <main id="content" className="landing">
      <JsonLd data={breadcrumbJsonLd("Jira integration", "/integrations/jira")} />

      <section className="landing-section">
        <p className="landing-kicker">Jira Cloud integration</p>
        <h1>A Jira label is the new prompt</h1>
        <p className="landing-section-lead">
          Add the label <code>butterneck</code> to a ticket and assign it to someone whose computer
          has the project. The ticket becomes the request. The preview link comes back on the
          ticket. A developer decides what goes live.
        </p>
        <div className="landing-cta">
          <a href={appUrl("/signup")} className="landing-btn primary" data-ga-location="jira_page">
            Create a free workspace
          </a>
          <a
            href={WALKTHROUGH_URL}
            className="landing-btn"
            target="_blank"
            rel="noopener noreferrer"
            data-ga-event="book_walkthrough_click"
            data-ga-location="jira_page"
          >
            Book a walkthrough
          </a>
        </div>
      </section>

      {/* Placeholder: label -> preview-link-on-ticket GIF goes here when recorded. */}
      <section className="landing-section" aria-labelledby="jira-steps-heading">
        <h2 id="jira-steps-heading">How it works</h2>
        <div className="landing-grid">
          {JIRA.map((item) => (
            <article key={item.title} className="card landing-card">
              <h3>{item.title}</h3>
              <ul className="landing-points">
                {item.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" aria-labelledby="jira-screens-heading">
        <h2 id="jira-screens-heading">What it looks like</h2>
        <figure>
          <img
            src="/integrations/jira-settings.png"
            alt="Butterneck workspace settings with the Jira Cloud integration ready to connect"
            width={1024}
            height={594}
            loading="lazy"
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
          <figcaption className="muted">Connect Jira Cloud once from your workspace.</figcaption>
        </figure>
        <figure>
          <img
            src="/blog/product-app-with-chat.png"
            alt="A live preview of the product with the Butterneck chat open beside it"
            width={1280}
            height={720}
            loading="lazy"
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
          <figcaption className="muted">
            The full conversation stays on the live copy. The ticket gets a short note and the link.
          </figcaption>
        </figure>
      </section>

      <section className="landing-section" aria-labelledby="jira-limits-heading">
        <h2 id="jira-limits-heading">What it does not do</h2>
        <ul className="landing-points">
          <li>It does not merge, open pull requests, or deploy. Your team publishes the usual way.</li>
          <li>
            The AI runs through the coding assistant on the assignee’s computer (Cursor, Claude
            Code, or Antigravity), under that assistant’s own data terms.
          </li>
          <li>Updating the same ticket later does not open a second copy.</li>
        </ul>
        <p className="landing-quiet">
          Read more: <Link href="/blog">the blog</Link> · <Link href="/jira/privacy">Jira privacy</Link>{" "}
          · <Link href="/jira/terms">Jira terms</Link> · <Link href="/pricing">Pricing</Link>
        </p>
      </section>
    </main>
  );
}
