import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { AasaanWebLegalDocument } from "@/components/aasaanweb/LegalDocument";
import { AASAANWEB_LEGAL } from "@/content/aasaanweb-legal";
import { aasaanWebSubpageMeta } from "@/lib/aasaanweb";
import { isAasaanWeb } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

const page = AASAANWEB_LEGAL["contact"];
const DESCRIPTION =
  "Contact AasaanWeb: tell us about your business or the change your site needs, and we'll get back to you. For small businesses in India.";

/** AasaanWeb only; next.config rewrites page.path here for that brand. */
export const metadata: Metadata = isAasaanWeb ? aasaanWebSubpageMeta({ title: page.title, description: DESCRIPTION, path: page.path }) : {};

export default function Page() {
  if (!isAasaanWeb) notFound();
  const url = siteUrl(page.path);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${url}#page`,
          url,
          name: `${page.title} — AasaanWeb`,
          description: DESCRIPTION,
          isPartOf: { "@id": `${siteUrl("/")}#website` },
        }}
      />
      <AasaanWebLegalDocument kind="contact" />
    </>
  );
}
