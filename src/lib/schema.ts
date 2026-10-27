import { FAQS } from "@/content/landing";
import { brand } from "@/lib/brand";
import { SITE_DESCRIPTION, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

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
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.lines.join(" "),
          },
        })),
      },
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
