import { isAasaanWeb } from "@/lib/brand";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PricingSection } from "@/components/PricingSection";
import { pageMeta } from "@/lib/meta";
import { ANNUAL_DISCOUNT_PERCENT, PRO_MONTHLY_PRICE } from "@/lib/pricing";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { siteUrl, WALKTHROUGH_URL } from "@/lib/site";

const usd = PRO_MONTHLY_PRICE.USD;

/** One quotable sentence for AI assistants and search snippets, built from the plan facts below. */
const PRICING_DEFINITION = `Butterneck pricing, in short: Starter is free for one developer and one person who requests changes, with one private copy of the product. Pro is $${usd} per person a month (${ANNUAL_DISCOUNT_PERCENT}% off with annual billing), developers and people who request changes both count, and a workspace owner on Starter can try Pro for one month. AI usage isn't included: Butterneck runs on the developer's computer with the coding agent they already use (Claude Code, Cursor or Antigravity), on your team's own plan.`;

/** Visible FAQ on this page; the FAQPage JSON-LD is built from the same items. */
const PRICING_FAQS = [
  {
    q: "Is Butterneck free?",
    lines: [
      "Yes, on Starter. It is free for one developer and one person who requests changes, with one private copy of the product and 1 GB of preview traffic a month.",
      "No credit card is required.",
    ],
  },
  {
    q: "How much does Butterneck Pro cost?",
    lines: [
      `$${usd} per person a month, billed monthly. Annual billing saves ${ANNUAL_DISCOUNT_PERCENT}%.`,
      "Pro includes 50 private copies of the product and 50 GB of preview traffic a month.",
      "Prices are set per currency, not converted from US dollars.",
    ],
  },
  {
    q: "Who counts as a person on Pro?",
    lines: [
      "Developers and people who request changes both count.",
      "People who only open a share link to look at the preview don’t need an account, so they don’t take a seat.",
      `Example: 2 developers and 3 product managers is 5 people, so $${usd * 5} a month billed monthly.`,
    ],
  },
  {
    q: "Is the Jira integration included?",
    lines: [
      "Yes, on every plan, including Starter.",
      "Each labeled ticket opens its own private copy, and private copies count toward your plan: 1 on Starter, 50 on Pro. So Starter fits one ticket or one chat copy at a time, and regular Jira use needs Pro.",
      "You can try it on Pro for a month first.",
    ],
  },
  {
    q: "Is AI usage included in the price?",
    lines: [
      "No. Butterneck runs on your team’s Claude Code, Cursor or Antigravity plan, on the developer’s computer. Team, enterprise or API plans are recommended.",
      "Butterneck doesn’t run its own model or resell AI usage, so there’s no markup on your AI plan.",
    ],
  },
  {
    q: "Can I try Pro before paying?",
    lines: [
      "Yes. A workspace owner on Starter can start a one-month Pro trial from the Billing page, once per workspace. The trial covers up to 20 people.",
      "When the month ends, the workspace goes back to Starter limits unless you subscribe to Pro.",
    ],
  },
] as const;

export const metadata = pageMeta({
  title: `Pricing: free Starter, Pro $${usd} per person, one-month trial`,
  description: `Pricing for AI change requests. Starter is free for one developer and one requester. Pro is $${usd} per person a month, ${ANNUAL_DISCOUNT_PERCENT}% off yearly, with a one-month Pro trial. AI runs on your own coding agent.`,
  path: "/pricing",
});

export default function PricingPage() {
  // Butterneck-only page: 404 on the AasaanWeb site.
  if (isAasaanWeb) notFound();
  return (
    <main id="content" className="landing">
      <JsonLd data={breadcrumbJsonLd("Pricing", "/pricing")} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...faqPageJsonLd(PRICING_FAQS, siteUrl("/pricing")),
        }}
      />
      <PricingSection
        standalone
        intro={<p className="landing-quiet landing-definition">{PRICING_DEFINITION}</p>}
      />

      <section className="landing-section" aria-labelledby="trial-heading">
        <h2 id="trial-heading">Try Pro for one month</h2>
        <ul className="landing-points">
          <li>
            A workspace owner on Starter can start a one-month Pro trial from the Billing page, once
            per workspace. When the month ends, the workspace goes back to Starter limits unless you
            subscribe to Pro. The trial includes Pro’s limits for up to 20 people.
          </li>
          <li>
            Each labeled Jira ticket opens its own private copy, and Starter has one, so regular{" "}
            <a href="/integrations/jira">Jira use</a> needs Pro. A trial month is enough to try it
            for real, or to run a{" "}
            <a href="/blog/pm-change-request-pilot-proposal">4-week PM change request pilot</a>.
          </li>
        </ul>
      </section>

      <section className="landing-section" aria-labelledby="seats-heading">
        <h2 id="seats-heading">Who counts as a person</h2>
        <ul className="landing-points">
          <li>On Pro, developers and people who request changes both count as a person.</li>
          <li>
            People who only open a share link to look at the preview don’t need an account, so they
            don’t take a seat.
          </li>
          <li>
            Example: 2 developers and 3 product managers on Pro is 5 people, so ${usd * 5} a month
            billed monthly.
          </li>
          <li>Prices are set per currency, not converted from US dollars.</li>
        </ul>
        <h2 id="ai-usage-heading">What about AI usage?</h2>
        <ul className="landing-points">
          <li>AI usage isn’t included in the seat price.</li>
          <li>
            Butterneck runs on your team’s Claude Code, Cursor or Antigravity plan. Team, enterprise
            or API plans are recommended.
          </li>
          <li>Butterneck doesn’t run its own model.</li>
          <li>
            For startup and SaaS product teams: no new coding agent to adopt and nothing new to host.
            A developer installs a small connector, and the AI coding agent they already use does the
            work on their computer, on your app as it already runs there.
          </li>
        </ul>
      </section>

      <section className="landing-section" aria-labelledby="pricing-faq-heading">
        <h2 id="pricing-faq-heading">Pricing questions</h2>
        <div className="landing-faq">
          {PRICING_FAQS.map((item) => (
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
        <div className="landing-cta">
          {WALKTHROUGH_URL && (
            <a
              href={WALKTHROUGH_URL}
              className="landing-btn"
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="book_walkthrough_click"
              data-ga-location="pricing_page"
            >
              Book a walkthrough
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
