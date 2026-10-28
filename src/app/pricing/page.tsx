import { JsonLd } from "@/components/JsonLd";
import { PricingSection } from "@/components/PricingSection";
import { pageMeta } from "@/lib/meta";
import { ANNUAL_DISCOUNT_PERCENT, PRO_MONTHLY_PRICE } from "@/lib/pricing";
import { breadcrumbJsonLd } from "@/lib/schema";
import { WALKTHROUGH_URL } from "@/lib/site";

const usd = PRO_MONTHLY_PRICE.USD;

export const metadata = pageMeta({
  title: "Pricing",
  description: `Butterneck pricing: Starter is free for one developer and one requester. Pro is $${usd} per person a month (${ANNUAL_DISCOUNT_PERCENT}% off billed annually), with local prices in 8 currencies. Custom for larger teams.`,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main id="content" className="landing">
      <JsonLd data={breadcrumbJsonLd("Pricing", "/pricing")} />
      <PricingSection standalone />

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
            For startup and SaaS product teams: no new platform to adopt and nothing new to host.
            The AI coding agent your developer already uses does the work on their computer, on your
            app as it already runs there.
          </li>
        </ul>
        <div className="landing-cta">
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
        </div>
      </section>
    </main>
  );
}
