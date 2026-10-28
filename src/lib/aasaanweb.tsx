import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { SITE_URL, siteUrl } from "@/lib/site";

/**
 * AasaanWeb site (APP_NAME=maintainer-pro). Title, description, Open Graph and JSON-LD follow
 * the admin app's client/src/brand-data.ts so both surfaces describe the product the same way.
 */

/** Signup and login live on the AasaanWeb app. */
export const AASAANWEB_APP_URL = (
  process.env.NEXT_PUBLIC_AASAANWEB_APP_URL || "https://aasaan.butterneck.com"
).replace(/\/$/, "");

export function aasaanWebAppUrl(path: string): string {
  return `${AASAANWEB_APP_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Brand assets live under /aasaanweb so they never replace Butterneck's files. */
export const AASAANWEB_ASSETS = "/aasaanweb";
export const AASAANWEB_OG_IMAGE = `${SITE_URL}${AASAANWEB_ASSETS}/og.png`;
const OG_IMAGE_ALT = "AasaanWeb logo on navy: Create or edit your business website in plain words.";

/** Bump when home page copy changes (used by the sitemap). */
export const AASAANWEB_HOME_UPDATED = "2026-10-28";

const openGraph = (url?: string): NonNullable<Metadata["openGraph"]> => ({
  type: "website",
  siteName: brand.name,
  locale: "en_IN",
  alternateLocale: ["hi_IN"],
  title: brand.title,
  description: brand.description,
  ...(url ? { url } : {}),
  images: [
    { url: AASAANWEB_OG_IMAGE, secureUrl: AASAANWEB_OG_IMAGE, type: "image/png", width: 1200, height: 630, alt: OG_IMAGE_ALT },
  ],
});

const twitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  title: brand.title,
  description: brand.description,
  images: [{ url: AASAANWEB_OG_IMAGE, alt: OG_IMAGE_ALT }],
};

/** Site-wide defaults (root layout). No canonical here, so 404 pages do not carry one. */
export const aasaanWebLayoutMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: brand.title, template: `%s – ${brand.name}` },
  description: brand.description,
  applicationName: brand.name,
  publisher: "Butterneck",
  openGraph: openGraph(),
  twitter,
  icons: {
    icon: [
      { url: `${AASAANWEB_ASSETS}/favicon.ico`, sizes: "48x48" },
      { url: `${AASAANWEB_ASSETS}/favicon.svg`, type: "image/svg+xml" },
    ],
    apple: `${AASAANWEB_ASSETS}/apple-touch-icon.png`,
  },
};

/**
 * Per-page metadata. Next's metadata API drops the trailing slash from a bare origin, so the
 * canonical and og:url (which must match the sitemap's "https://host/") come from <PageUrlTags>.
 */
export function aasaanWebPageMeta(): Metadata {
  return {
    title: { absolute: brand.title },
    description: brand.description,
    robots: { index: true, follow: true },
    openGraph: openGraph(),
    twitter,
  };
}

/** Self-referencing absolute canonical and og:url; React hoists these into <head>. */
export function PageUrlTags({ path }: { path: string }) {
  const url = siteUrl(path);
  return (
    <>
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
    </>
  );
}

const ORG_ID = "https://www.butterneck.com/#organization";

/** WebSite + SoftwareApplication, as in brand-data.ts. No offers block. */
export function aasaanWebJsonLd() {
  const home = siteUrl("/");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${home}#website`,
        url: home,
        name: "AasaanWeb",
        alternateName: ["Aasaan Web", "आसान वेब"],
        description: brand.description,
        inLanguage: ["en-IN", "hi-IN"],
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${home}#app`,
        name: "AasaanWeb",
        url: home,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: brand.description,
        image: AASAANWEB_OG_IMAGE,
        inLanguage: ["en-IN", "hi-IN"],
        publisher: {
          "@type": "Organization",
          "@id": ORG_ID,
          name: "Butterneck",
          url: "https://www.butterneck.com/",
        },
      },
    ],
  };
}
