"use client";

import { type ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import {
  ANNUAL_DISCOUNT_PERCENT,
  BILLING_MARKETS,
  BILLING_PLANS,
  type BillingInterval,
  checkoutPath,
  countryFromTimeZone,
  formatMoney,
  quotePro,
} from "@/lib/pricing";
import { appUrl } from "@/lib/site";

export function PricingSection({
  standalone = false,
  intro,
}: { standalone?: boolean; intro?: ReactNode } = {}) {
  const Heading = standalone ? "h1" : "h2";
  const [interval, setInterval] = useState<BillingInterval>("month");
  const [country, setCountry] = useState("US");
  const quote = quotePro(country, interval);

  useEffect(() => {
    const detected = countryFromTimeZone(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    setCountry(detected);
  }, []);

  return (
    <section id="pricing" className="landing-section" aria-labelledby="pricing-heading">
      <div className="landing-prices-head">
        <div>
          <p className="landing-kicker">Pricing</p>
          <Heading id="pricing-heading">{standalone ? "Pricing" : "Start with your product team"}</Heading>
          <p className="landing-section-lead">
            Starter is free for one developer and one person who requests changes. Pro is priced
            per person each month. A larger team is a conversation with us.
          </p>
          {intro}
        </div>
        <div className="landing-price-controls">
          <label>
            Country
            <select value={country} onChange={(event) => setCountry(event.target.value)}>
              {BILLING_MARKETS.map((market) => (
                <option key={market.country} value={market.country}>
                  {market.label}
                </option>
              ))}
            </select>
          </label>
          <div className="landing-billing-toggle" role="group" aria-label="Billing interval">
            <button
              type="button"
              className={interval === "month" ? "is-active" : undefined}
              aria-pressed={interval === "month"}
              onClick={() => setInterval("month")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={interval === "year" ? "is-active" : undefined}
              aria-pressed={interval === "year"}
              onClick={() => setInterval("year")}
            >
              Annual
              <span>Save {ANNUAL_DISCOUNT_PERCENT}%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="landing-prices">
        {BILLING_PLANS.map((plan) => {
          const amount = plan.contact
            ? "Custom"
            : plan.priced
              ? formatMoney(quote.perUserMonthlyMinor, quote.currency)
              : "Free";
          const note = plan.contact
            ? "We set the limits with you"
            : plan.priced
              ? interval === "year"
                ? `${formatMoney(quote.totalMinor, quote.currency)} billed annually`
                : "per person, billed monthly"
              : "No credit card required";
          return (
            <article
              key={plan.id}
              className={plan.highlighted ? "card landing-price is-highlight" : "card landing-price"}
            >
              <p className="landing-price-badge">{plan.badge}</p>
              <h3>{plan.name}</h3>
              <p className="landing-price-blurb">{plan.blurb}</p>
              <p className="landing-price-amount">
                {plan.priced && interval === "year" ? (
                  <s>{formatMoney(quote.unitMinor, quote.currency)}</s>
                ) : null}
                <strong>{amount}</strong>
                {plan.priced ? <span> / person / month</span> : null}
              </p>
              <p className="landing-price-note">{note}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              {plan.contact ? (
                <Link className="landing-btn" href="/contact" data-ga-event="select_plan" data-ga-plan={plan.id} data-ga-location="pricing">
                  Contact us
                </Link>
              ) : plan.priced ? (
                <a
                  className={plan.highlighted ? "landing-btn primary" : "landing-btn"}
                  href={appUrl(checkoutPath(plan.id, interval, quote.country))}
                  data-ga-event="select_plan"
                  data-ga-plan={plan.id}
                  data-ga-interval={interval}
                  data-ga-location="pricing"
                >
                  Continue to checkout
                </a>
              ) : (
                <a className="landing-btn" href={appUrl("/signup")} data-ga-event="select_plan" data-ga-plan={plan.id} data-ga-location="pricing">
                  Create a free workspace
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
