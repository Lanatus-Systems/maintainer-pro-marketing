import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { AasaanWebShell, START_URL } from "@/components/aasaanweb/AasaanWebShell";
import { Reveal } from "@/components/aasaanweb/Reveal";
import { ORG_ID, aasaanWebSubpageMeta } from "@/lib/aasaanweb";
import { isAasaanWeb } from "@/lib/brand";
import { siteUrl } from "@/lib/site";
import "../../aasaanweb-home/aasaanweb.css";

/**
 * AasaanWeb /pricing (next.config rewrites it here for that brand only). A port of the admin
 * app's client/src/pages/PricingPage.tsx; prices and copy are the ones on aasaan.butterneck.com.
 */
const DESCRIPTION =
  "₹5,000 for your site and 15 days of chatbot changes. You pay after that work is done. Hosting and the domain are separate. We help you deploy.";

export const metadata: Metadata = isAasaanWeb
  ? aasaanWebSubpageMeta({ title: "Pricing", description: DESCRIPTION, path: "/pricing" })
  : {};

const WHATSAPP_URL = "https://wa.me/918469175299";
const WHATSAPP_LABEL = "+91 84691 75299";

const STEPS = [
  {
    n: "01",
    title: "We build the page",
    body: "A real page for your business: what you do, photos, and a way for a customer to reach you.",
  },
  {
    n: "02",
    title: "15 days of changes",
    body: "Use the chatbot to fix a photo, a price, a phone number, or a Saturday hour. Ask in normal words.",
  },
  {
    n: "03",
    title: "Then you pay",
    body: "₹5,000, after the page is finished and those 15 days are over. Not before. Then message us on WhatsApp:",
  },
];

/** Offer structured data; text is taken from the visible page. Keep the prices in step with the copy above. */
function pricingJsonLd() {
  const url = siteUrl("/pricing");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "AasaanWeb landing page with 15 days of chatbot changes",
    provider: { "@id": ORG_ID },
    areaServed: "IN",
    description:
      "We build the page, you use the chatbot for 15 days, and the ₹5,000 is due after that. Hosting and the domain name are not included; we help with the deployment.",
    offers: [
      {
        "@type": "Offer",
        name: "Page plus 15 days of changes",
        price: "5000",
        priceCurrency: "INR",
        description: "Paid at the end, after the page is finished and the 15 days are over.",
        url,
      },
      { "@type": "Offer", name: "5 more days of chatbot changes", price: "500", priceCurrency: "INR", url },
    ],
  };
}

export default function AasaanWebPricingPage() {
  if (!isAasaanWeb) notFound();
  return (
    <AasaanWebShell current="pricing">
      <JsonLd data={pricingJsonLd()} />
      <main id="content">
        <section className="studio-work-hero studio-price-hero">
          <p className="studio-kicker">Pricing</p>
          <h1>₹5,000. Paid at the end.</h1>
          <p className="studio-lead">
            That covers the site we build for you, and 15 days of chatbot help to change it. You pay once that work is
            finished.
          </p>
        </section>

        <ol className="studio-price-steps">
          {STEPS.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <h2>{step.title}</h2>
              <p>
                {step.body}{" "}
                {step.n === "03" ? (
                  <a href={WHATSAPP_URL} className="studio-whatsapp">
                    {WHATSAPP_LABEL}
                  </a>
                ) : null}
              </p>
            </li>
          ))}
        </ol>

        <div className="studio-price-notes">
          <Reveal>
            <article>
              <p className="studio-example-meta">After the 15 days</p>
              <h2>₹500 for 5 more days</h2>
              <p>Need the chatbot for longer? Add another 5 days for ₹500. Add it again if you still want more time.</p>
            </article>
          </Reveal>
          <Reveal>
            <article>
              <p className="studio-example-meta">Going online</p>
              <h2>We help you deploy</h2>
              <p>
                We put the finished site online for you. Hosting and the domain name are not included. You arrange
                those. We help with the deployment.
              </p>
            </article>
          </Reveal>
        </div>

        <section className="studio-close" aria-labelledby="price-close-heading">
          <p className="studio-kicker">Start the page</p>
          <h2 id="price-close-heading">Tell us about the business.</h2>
          <p>
            We build the page, you use the chatbot for 15 days, and the ₹5,000 is due after that. Message us on
            WhatsApp when the site is done.
          </p>
          <div className="studio-close-actions">
            <a href={START_URL} className="studio-btn">
              Get started
            </a>
            <a href={WHATSAPP_URL} className="studio-btn studio-btn-ghost">
              WhatsApp {WHATSAPP_LABEL}
            </a>
          </div>
        </section>
      </main>
    </AasaanWebShell>
  );
}
