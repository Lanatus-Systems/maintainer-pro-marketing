import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AasaanWebLegalDocument } from "@/components/aasaanweb/LegalDocument";
import { AASAANWEB_LEGAL } from "@/content/aasaanweb-legal";
import { aasaanWebSubpageMeta } from "@/lib/aasaanweb";
import { isAasaanWeb } from "@/lib/brand";

const page = AASAANWEB_LEGAL["privacy"];
const DESCRIPTION =
  "How Butterneck, which runs AasaanWeb, collects, uses, shares and keeps your account details, chat messages and preview links, and how to ask us to delete your data.";

/** AasaanWeb only; next.config rewrites page.path here for that brand. */
export const metadata: Metadata = isAasaanWeb ? aasaanWebSubpageMeta({ title: page.title, description: DESCRIPTION, path: page.path }) : {};

export default function Page() {
  if (!isAasaanWeb) notFound();
  return <AasaanWebLegalDocument kind="privacy" />;
}
