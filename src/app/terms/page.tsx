import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { legalPages } from "@/content/legal";

const page = legalPages.terms;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.path },
};

export default function TermsPage() {
  return <LegalDocument page={page} />;
}
