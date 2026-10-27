import { brand } from "@/lib/brand";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? brand.defaultSiteUrl
).replace(/\/$/, "");

const APP_URL = (
  process.env.NEXT_PUBLIC_APP_URL ?? brand.defaultAppUrl
).replace(/\/$/, "");

export const SUPPORT_EMAIL = brand.supportEmail;

export { SITE_URL, APP_URL };

export function siteUrl(path = "/"): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Signup, login, and checkout live on the product app. */
export function appUrl(path: string): string {
  return `${APP_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SITE_TITLE = brand.title;

export const SITE_DESCRIPTION = brand.description;

export const SITE_OG_DESCRIPTION = brand.ogDescription;
