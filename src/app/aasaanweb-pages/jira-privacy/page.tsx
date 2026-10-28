import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AasaanWebLegalDocument } from "@/components/aasaanweb/LegalDocument";
import { AASAANWEB_LEGAL } from "@/content/aasaanweb-legal";
import { aasaanWebSubpageMeta } from "@/lib/aasaanweb";
import { isAasaanWeb } from "@/lib/brand";

const page = AASAANWEB_LEGAL["jira-privacy"];

/** AasaanWeb only; next.config rewrites page.path here for that brand. */
export const metadata: Metadata = isAasaanWeb ? aasaanWebSubpageMeta({ title: page.title, path: page.path }) : {};

export default function Page() {
  if (!isAasaanWeb) notFound();
  return <AasaanWebLegalDocument kind="jira-privacy" />;
}
