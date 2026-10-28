import { FAQS } from "@/content/landing";
import { brand } from "@/lib/brand";
import { extractFaq } from "@/lib/markdown";
import {
  DEV_URL,
  DEVHUNT_URL,
  LINKEDIN_URL,
  MEDIUM_URL,
  PEERLIST_URL,
  SAASHUB_URL,
  UNEED_URL,
  X_URL, SITE_DESCRIPTION, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: brand.name,
        url: SITE_URL,
        logo: `${SITE_URL}/logo-512.png`,
        email: SUPPORT_EMAIL,
        sameAs: [
          LINKEDIN_URL,
          X_URL,
          DEV_URL,
          MEDIUM_URL,
          PEERLIST_URL,
          DEVHUNT_URL,
          SAASHUB_URL,
          UNEED_URL,
        ],
        parentOrganization: {
          "@type": "Organization",
          name: "Lanatus Systems LLP",
          url: "https://lanatussystems.com",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: brand.name,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: brand.name,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "DeveloperApplication",
        operatingSystem: "Web",
        image: `${SITE_URL}/og.png`,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        offers: [
          {
            "@type": "Offer",
            name: "Starter",
            price: "0",
            priceCurrency: "USD",
            description: "Free for one developer and one person who requests changes.",
          },
          {
            "@type": "Offer",
            name: "Pro",
            price: "19",
            priceCurrency: "USD",
            unitText: "person / month",
            description: "Per person, billed monthly. Annual billing saves 20%.",
          },
        ],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      faqPageJsonLd(FAQS, `${SITE_URL}/`),
    ],
  };
}

export function breadcrumbJsonLd(title: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}

/** FAQPage for a blog post's "## FAQ" section, or null if the post has none. Built from the visible text. */
export function postFaqJsonLd(body: string, url: string) {
  const items = extractFaq(body);
  if (items.length === 0) return null;
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** WebPage node for a product page, about the site's SoftwareApplication (#software, defined on the home page). */
export function webPageJsonLd(opts: { name: string; description: string; path: string }) {
  const url = `${SITE_URL}${opts.path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#software` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** FAQPage node built from the visible FAQ items on a page. */
export function faqPageJsonLd(items: readonly { q: string; lines: readonly string[] }[], url: string) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.lines.join(" ") },
    })),
  };
}
