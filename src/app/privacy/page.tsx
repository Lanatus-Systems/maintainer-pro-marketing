import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { legalPages } from "@/content/legal";

const page = legalPages.privacy;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.path },
};

export default function PrivacyPage() {
  return <LegalDocument page={page} />;
}
