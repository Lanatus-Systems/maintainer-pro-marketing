import { isAasaanWeb } from "@/lib/brand";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { legalPages } from "@/content/legal";
import { pageMeta } from "@/lib/meta";

const page = legalPages.terms;

export const metadata: Metadata = pageMeta({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function TermsPage() {
  // Butterneck-only page: 404 on the AasaanWeb site.
  if (isAasaanWeb) notFound();
  return <LegalDocument page={page} />;
}
