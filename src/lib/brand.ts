/**
 * Product id. Same variable as the admin app: APP_NAME.
 *
 * To add a product: append its id to APP_NAMES, add a ProductBrand in BRANDS,
 * and add that product's pages. An unknown APP_NAME stays on Butterneck.
 */
export const APP_NAMES = ["butterneck", "maintainer-pro"] as const;

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
  title: "Butterneck — AI change requests on a live preview of your app",
  description:
    "Butterneck lets a product person request a change to a live web app and check it on a live preview. No pull request is opened; a developer decides first.",
  ogDescription: "Let them ask. You decide what goes live.",
  wordmarkSrc: "/logo-wordmark-butterneck.svg",
  themeColor: "#0084FF",
  accent: "#0084ff",
  accentHover: "#006fd6",
  accentSoft: "#eef4ff",
  accentKicker: "#e8f3ff",
  supportEmail: "support@butterneck.com",
  defaultSiteUrl: "https://www.butterneck.com",
  defaultAppUrl: "https://app.butterneck.com",
};

/** AasaanWeb (APP_NAME=maintainer-pro). Copy from the admin app's brand-data.ts. */
const maintainerPro: ProductBrand = {
  appName: "maintainer-pro",
  name: "AasaanWeb",
  title: "AasaanWeb – Website Builder for Small Businesses in India",
  description:
    "Apna business website banaiye ya edit karein — bas likhkar batayein. AasaanWeb helps small Indian businesses build and update a landing page in plain words.",
  ogDescription:
    "Create a landing page, or update the site you already have, directly on the preview.",
  wordmarkSrc: "/aasaanweb/logo-wordmark.svg",
  themeColor: "#091f41",
  accent: "#091f41",
  accentHover: "#0d2c5c",
  accentSoft: "#f6f8fb",
  accentKicker: "#e0f7f3",
  supportEmail: "support@butterneck.com",
  defaultSiteUrl: "https://aasaanweb.butterneck.com",
  defaultAppUrl: "https://aasaan.butterneck.com",
};

const BRANDS: Record<AppName, ProductBrand> = {
  butterneck,
  "maintainer-pro": maintainerPro,
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

/** True when this build serves the AasaanWeb site (APP_NAME=maintainer-pro). */
export const isAasaanWeb = brand.appName === "maintainer-pro";
