/**
 * Display prices for the marketing site.
 * Keep in step with maintainer-pro-admin/server/src/lib/pricing.ts.
 * These are fixed prices, not converted from USD.
 */

export const ANNUAL_DISCOUNT_PERCENT = 20;

export type BillingInterval = "month" | "year";
export type PlanId = "starter" | "pro" | "custom";

export const PRO_MONTHLY_PRICE = {
  USD: 19,
  INR: 1499,
  AUD: 29,
  EUR: 18,
  GBP: 15,
  CAD: 25,
  SGD: 25,
  AED: 70,
} as const;

export type BillingCurrency = keyof typeof PRO_MONTHLY_PRICE;

export const BILLING_MARKETS = [
  { country: "US", currency: "USD", label: "United States" },
  { country: "IN", currency: "INR", label: "India" },
  { country: "AU", currency: "AUD", label: "Australia" },
  { country: "EU", currency: "EUR", label: "Eurozone" },
  { country: "GB", currency: "GBP", label: "United Kingdom" },
  { country: "CA", currency: "CAD", label: "Canada" },
  { country: "SG", currency: "SGD", label: "Singapore" },
  { country: "AE", currency: "AED", label: "UAE" },
] as const;

export type BillingPlan = {
  id: PlanId;
  name: string;
  blurb: string;
  priced: boolean;
  contact: boolean;
  badge: string;
  features: string[];
  highlighted: boolean;
};

export const BILLING_PLANS: BillingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    blurb: "One product, and the person who requests the changes.",
    priced: false,
    contact: false,
    badge: "",
    highlighted: false,
    features: [
      "1 developer and 1 person who requests changes",
      "1 private copy of the product",
      "1 GB of preview traffic a month",
      "1 connected computer per person",
      "A live preview and chat on that copy",
      "The AI only edits the project you connect",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "For a company that reviews changes with more than a couple of people.",
    priced: true,
    contact: false,
    badge: "Most teams",
    highlighted: true,
    features: [
      "Priced per person. Developers and people who request changes both count.",
      "50 private copies of the product",
      "50 GB of preview traffic a month",
      "1 connected computer per person",
      "Everything in Starter",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    blurb: "More than Pro. We agree the limits with you.",
    priced: false,
    contact: true,
    badge: "Enterprise",
    highlighted: false,
    features: [
      "People, copies, and traffic limits agreed with you",
      "As many connected computers as you need",
      "Everything in Pro",
      "A conversation about how your team will use it",
    ],
  },
];

const MONEY_PREFIX: Record<string, string> = {
  USD: "$",
  INR: "₹",
  AUD: "A$",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  SGD: "S$",
  AED: "AED ",
};

const TIMEZONE_COUNTRY: Record<string, string> = {
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "Asia/Singapore": "SG",
  "Asia/Dubai": "AE",
  "Europe/London": "GB",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Perth": "AU",
  "Australia/Adelaide": "AU",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Edmonton": "CA",
  "America/Winnipeg": "CA",
  "America/Halifax": "CA",
  "Europe/Paris": "EU",
  "Europe/Berlin": "EU",
  "Europe/Madrid": "EU",
  "Europe/Rome": "EU",
  "Europe/Amsterdam": "EU",
  "Europe/Brussels": "EU",
  "Europe/Vienna": "EU",
  "Europe/Dublin": "EU",
  "Europe/Lisbon": "EU",
  "Europe/Helsinki": "EU",
  "Europe/Athens": "EU",
};

export function countryFromTimeZone(timeZone: string): string {
  return TIMEZONE_COUNTRY[timeZone] ?? "US";
}

export function formatMoney(minor: number, currency: string): string {
  const prefix = MONEY_PREFIX[currency] ?? `${currency} `;
  const amount = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(minor / 100);
  return `${prefix}${amount}`;
}

export function quotePro(country: string, interval: BillingInterval) {
  const market =
    BILLING_MARKETS.find((item) => item.country === country) ?? BILLING_MARKETS[0];
  const currency = market.currency;
  const unitMajor = PRO_MONTHLY_PRICE[currency];
  const monthlyMajor =
    interval === "month"
      ? unitMajor
      : Math.round((unitMajor * (100 - ANNUAL_DISCOUNT_PERCENT)) / 100);
  const unitMinor = unitMajor * 100;
  const perUserMonthlyMinor = monthlyMajor * 100;
  const months = interval === "year" ? 12 : 1;
  return {
    country: market.country,
    currency,
    unitMinor,
    perUserMonthlyMinor,
    totalMinor: perUserMonthlyMinor * months,
  };
}

export function checkoutPath(
  planId: PlanId,
  interval: BillingInterval,
  country: string
): string {
  const params = new URLSearchParams({
    plan: planId,
    interval,
    seats: "1",
    country,
  });
  return `/checkout?${params.toString()}`;
}
