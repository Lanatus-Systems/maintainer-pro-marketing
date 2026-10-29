import { isAasaanWeb } from "@/lib/brand";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FAQS, JIRA, JIRA_NO_PR_FAQ, JIRA_PREVIEW_FAQ, JIRA_TICKET_CONTENT_FAQ } from "@/content/landing";
import { pageMeta } from "@/lib/meta";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from "@/lib/schema";
import { appUrl, siteUrl, WALKTHROUGH_URL } from "@/lib/site";

const JIRA_FAQS = [
  JIRA_PREVIEW_FAQ,
  ...FAQS.filter((item) => item.q === "Can a Jira ticket start the chat?"),
  JIRA_NO_PR_FAQ,
  JIRA_TICKET_CONTENT_FAQ,
];

const PAGE_TITLE = "Jira integration: AI change requests from a ticket";
const PAGE_DESCRIPTION =
  "Label a Jira Cloud ticket and the developer's own AI coding agent builds the change on a live preview. The link comes back on the ticket; a developer decides first.";

export const metadata = pageMeta({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/integrations/jira",
});

export default function JiraIntegrationPage() {
  // Butterneck-only page: 404 on the AasaanWeb site.
  if (isAasaanWeb) notFound();
  return (
    <main id="content" className="landing">
      <JsonLd data={breadcrumbJsonLd("Jira integration", "/integrations/jira")} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [organizationJsonLd(), softwareApplicationJsonLd()],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...webPageJsonLd({ name: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/integrations/jira" }),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...faqPageJsonLd(JIRA_FAQS, siteUrl("/integrations/jira")),
        }}
      />

      <section className="landing-section">
        <p className="landing-kicker">Jira Cloud integration</p>
        <h1>Label a ticket. Get a live preview.</h1>
        <p className="landing-section-lead">
          Butterneck&apos;s Jira Cloud integration turns a labeled ticket into an AI change request with a live preview. Add the
          label <code>butterneck</code> to a ticket and assign it to a teammate whose Jira account is
          mapped to a computer that has the project. The ticket becomes the request, and the change is
          built by the AI coding agent the developer already uses (Cursor, Claude Code or Antigravity),
          on their computer. A live preview link comes back on the ticket, and the requester can keep
          refining it in plain words. No pull request is opened; a developer decides first what ships,
          and Butterneck never merges or deploys. Each labeled ticket opens its own private copy:
          Starter has one, Pro (USD 19 per person per month) has 50. A workspace owner on Starter can try Pro free for one month.
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

      <section className="landing-section">
        <video
          className="landing-demo-video"
          poster="/integrations/jira-flow-loop-poster.png"
          width={1200}
          height={676}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Diagram: Jira ticket labelled butterneck, AI builds in a sandbox, preview link posted back, developer reviews"
          style={{ width: "100%", height: "auto", borderRadius: 12 }}
        >
          <source src="/integrations/jira-flow-loop.mp4" type="video/mp4" />
        </video>
      </section>

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
            src="/integrations/jira-settings.webp"
            alt="Butterneck workspace settings with the Jira Cloud integration ready to connect"
            width={1024}
            height={594}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
          <figcaption className="muted">Connect Jira Cloud once from your workspace.</figcaption>
        </figure>
        <figure>
          <img
            src="/blog/product-app-with-chat.webp"
            alt="A live preview of the product with the Butterneck chat open beside it"
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
          <figcaption className="muted">
            The full conversation stays on the live copy. The ticket gets a short note and the link.
          </figcaption>
        </figure>
      </section>

      <section className="landing-section" aria-labelledby="jira-differs-heading">
        <h2 id="jira-differs-heading">How this differs from Jira&apos;s own coding agent</h2>
        <p className="landing-section-lead">
          Atlassian&apos;s Jira Coding Agent and Butterneck solve different problems.
        </p>
        <ul className="landing-points">
          <li>
            Jira Coding Agent runs in a cloud sandbox that Atlassian hosts, started from a work item or a
            Jira automation. Atlassian&apos;s demos show a preview of the change inside that sandbox while
            the session runs. It can push changes to a branch and open a draft pull request in the
            repository you pick (a setting), for your team to review and merge.
          </li>
          <li>
            Butterneck&apos;s preview is the app already running on the developer&apos;s computer, shared
            by a link that goes back on the ticket, and the person who asked can keep refining it in plain
            words.
          </li>
          <li>
            The change is built by the developer&apos;s own local AI agent on their computer, and the
            developer publishes it through their own process. Your release process stays yours.
          </li>
          <li>Butterneck never opens pull requests, merges, or deploys.</li>
        </ul>
        <p className="landing-quiet">
          Details on Atlassian&apos;s agent:{" "}
          <a
            href="https://support.atlassian.com/jira-software-cloud/docs/work-with-jira-coding-agent-in-automations/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Work with Jira Coding Agent in automations
          </a>{" "}
          (Atlassian support) ·{" "}
          <a href="https://www.youtube.com/watch?v=AWxt9uxRTT0" target="_blank" rel="noopener noreferrer">
            demo video
          </a>{" "}
          (Atlassian).
        </p>
      </section>

      <section className="landing-section" aria-labelledby="jira-computer-heading">
        <h2 id="jira-computer-heading">Why a connected computer, not a cloud sandbox?</h2>
        <p className="landing-section-lead">
          The AI runs on the assignee&apos;s computer, where the project already runs. Both approaches
          are reasonable. Here is the trade-off.
        </p>
        <ul className="landing-points">
          <li>
            No environment to set up for each ticket: no base image, service list, or secrets store to
            configure. The project already runs on that computer.
          </li>
          <li>
            The AI works in the real dev setup, with the same dependencies, local data, and dev
            server the developer uses, and the preview is that running app.
          </li>
          <li>
            It uses the coding assistant that is already signed in on that computer (Cursor, Claude
            Code, or Antigravity; team, enterprise or API plans recommended). Butterneck does not ship its own model.
          </li>
          <li>
            The trade-off: the computer has to be on. If it is off or asleep, the ticket waits and the
            preview link does not load.
          </li>
          <li>
            <code>.env</code> handling is a guardrail, not a hard block. Secret settings files are on
            an ignore list the AI is told to stay out of, so keep production secrets off that computer.
          </li>
        </ul>
        <p className="landing-quiet">
          More on this: <Link href="/blog/run-ai-coding-agent-sandbox-on-your-machine">how the agent runs on your machine</Link>{" "}
          · <Link href="/blog/ai-prs-need-an-owner">why AI changes need an owner</Link>{" "}
          · <Link href="/blog/clogless-alternative">compared with a cloud-sandbox tool</Link>
        </p>
      </section>

      <section className="landing-section" aria-labelledby="jira-faq-heading">
        <h2 id="jira-faq-heading">Questions</h2>
        <div className="landing-faq">
          {JIRA_FAQS.map((item) => (
            <details key={item.q} className="card landing-card">
              <summary>{item.q}</summary>
              <ul className="landing-points">
                {item.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
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
          Read more: <Link href="/blog/jira-ticket-to-pr-with-ai">from a Jira ticket to a reviewable change</Link>
          · <Link href="/blog/live-preview-before-pull-request">checking a live preview before the pull request</Link>
          · <Link href="/blog">the blog</Link> · <Link href="/jira/privacy">Jira privacy</Link>{" "}
          · <Link href="/jira/terms">Jira terms</Link> · <Link href="/pricing">Pricing</Link>
        </p>
      </section>
    </main>
  );
}
