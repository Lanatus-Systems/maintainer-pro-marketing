import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { AasaanWebShell } from "@/components/aasaanweb/AasaanWebShell";
import { AASAANWEB_APP_URL, ORG_ID, aasaanWebSubpageMeta } from "@/lib/aasaanweb";
import { isAasaanWeb } from "@/lib/brand";
import { siteUrl } from "@/lib/site";
import "../../aasaanweb-home/aasaanweb.css";
import "@/components/aasaanweb/blog.css";

/**
 * AasaanWeb only: /about (site-fixes/07). The ".aw.tsx" extension is a page extension only in the
 * AasaanWeb build (next.config pageExtensions), so the Butterneck build never sees this route and its
 * output stays byte-identical. next.config rewrites /about here for the AasaanWeb brand.
 */

const PATH = "/about";
const TITLE = "About AasaanWeb – website for small Indian businesses, in plain words";
const DESCRIPTION =
  "What AasaanWeb is and who makes it: a website maker for small Indian businesses. Describe your business or a change in plain words, check the preview, publish.";
/** Quotable definition (site-fixes/07), without the Hindi-input clause, which is not yet verified on the live site. */
const AASAANWEB_DEFINITION =
  "AasaanWeb is a website maker for small Indian businesses – shops, studios, clinics and manufacturers. The owner describes the business, or a change, in plain words, sees it on a preview, and publishes it; small changes go live in about 10 minutes.";

export function generateMetadata(): Metadata {
  if (!isAasaanWeb) return {};
  const meta = aasaanWebSubpageMeta({ title: "About", description: DESCRIPTION, path: PATH });
  return {
    ...meta,
    title: { absolute: TITLE },
    openGraph: { ...meta.openGraph, title: TITLE },
    twitter: { ...meta.twitter, title: TITLE },
  };
}

function aboutJsonLd() {
  const url = siteUrl(PATH);
  const home = siteUrl("/");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#page`,
        url,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { "@id": `${home}#website` },
        mainEntity: { "@id": `${home}#app` },
        publisher: { "@id": ORG_ID },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: home },
          { "@type": "ListItem", position: 2, name: "About", item: url },
        ],
      },
    ],
  };
}

export default function AboutPage() {
  if (!isAasaanWeb) notFound();
  return (
    <AasaanWebShell>
      <JsonLd data={aboutJsonLd()} />
      <main id="content" className="aw-blog aw-blog-post">
        <nav aria-label="Breadcrumb" className="aw-blog-crumbs">
          <a href="/">Home</a> / About
        </nav>
        <article lang="en-IN" className="aw-post-body">
          <header>
            <h1>About AasaanWeb</h1>
          </header>
          <p>
            <strong>{AASAANWEB_DEFINITION}</strong>
          </p>

          <h2>How it works</h2>
          <ol>
            <li>
              <strong>Describe.</strong> Tell us about your business: your offer, photos, services, hours and contact
              details. Or, for a page you already have, describe the fix in plain language.
            </li>
            <li>
              <strong>Preview.</strong> Every change shows on a preview first, as customers will see it.
            </li>
            <li>
              <strong>Publish.</strong> You decide when it goes live. Small changes go live in about 10 minutes.
            </li>
          </ol>
          <p>
            You can change the headline, photo, hours, phone, price, button, FAQs and proof sections on your landing
            page. You don&rsquo;t need to know how websites are built.
          </p>

          <h2>Who it&rsquo;s for</h2>
          <p>
            Small businesses in India that need one clear landing page: shops, studios, clinics and manufacturers.
            AasaanWeb is built for the landing page, not for large multi-page sites.
          </p>

          <h2>Example businesses</h2>
          <p>
            Pages made with AasaanWeb include Parmanand Industries (Jamnagar), Shivam Industries (Rajkot) and EL360.{" "}
            <a href="/work">See our work</a>.
          </p>

          <h2>Who makes it</h2>
          <p>
            AasaanWeb is made by <a href="https://www.butterneck.com/">Butterneck</a>. The app is at{" "}
            <a href={`${AASAANWEB_APP_URL}/`}>aasaan.butterneck.com</a>.
          </p>
        </article>
      </main>
    </AasaanWebShell>
  );
}
