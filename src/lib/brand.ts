/**
 * Product id. Same variable as the admin app: APP_NAME.
 *
 * To add a product: append its id to APP_NAMES, add a ProductBrand in BRANDS,
 * and add that product's pages. An unknown APP_NAME stays on Butterneck.
 */
export const APP_NAMES = ["butterneck"] as const;

export type AppName = (typeof APP_NAMES)[number];

export type ProductBrand = {
  appName: AppName;
  name: string;
  title: string;
  description: string;
  ogDescription: string;
  wordmarkSrc: string;
  /** Browser theme-color. */
  themeColor: string;
  accent: string;
  accentHover: string;
  accentSoft: string;
  accentKicker: string;
  supportEmail: string;
  defaultSiteUrl: string;
  defaultAppUrl: string;
};

const butterneck: ProductBrand = {
  appName: "butterneck",
  name: "Butterneck",
  title: "Butterneck — let them ask. You decide what goes live.",
  description:
    "For product teams. People on the team ask on a live copy of the product. You choose who can ask. The AI edits the project on your computer. A developer decides what goes live.",
  ogDescription: "Let them ask. You decide what goes live.",
  wordmarkSrc: "/logo-wordmark-butterneck.svg",
  themeColor: "#0084FF",
  accent: "#0084ff",
  accentHover: "#006fd6",
  accentSoft: "#eef4ff",
  accentKicker: "#e8f3ff",
  supportEmail: "support@butterneck.com",
  defaultSiteUrl: "https://butterneck.com",
  defaultAppUrl: "https://app.butterneck.com",
};

const BRANDS: Record<AppName, ProductBrand> = {
  butterneck,
};

export function resolveAppName(value: string | undefined): AppName {
  const name = value?.trim();
  if (name && (APP_NAMES as readonly string[]).includes(name)) return name as AppName;
  return "butterneck";
}

export function brandFor(appName: AppName): ProductBrand {
  return BRANDS[appName];
}

/** Resolved once from APP_NAME. Next inlines that variable for client components. */
export const brand = brandFor(resolveAppName(process.env.APP_NAME));
