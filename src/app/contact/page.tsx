import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { legalPages } from "@/content/legal";
import { pageMeta } from "@/lib/meta";

const page = legalPages.contact;

export const metadata: Metadata = pageMeta({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function ContactPage() {
  return <LegalDocument page={page} />;
}
