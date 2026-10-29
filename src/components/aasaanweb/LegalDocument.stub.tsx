import type { AasaanWebLegalKind } from "@/content/aasaanweb-legal";
import "./legal.css";

/**
 * Butterneck build stand-in for LegalDocument.tsx (see turbopack.resolveAlias in next.config.ts).
 * The legal routes only render on AasaanWeb; on Butterneck they are notFound(). The real module pulls
 * in the AasaanWeb header (a client component), so aliasing it away keeps those scripts out of the
 * Butterneck build. It keeps the old legal.css import (used nowhere else since the 2026-10 redesign) so the Butterneck
 * output stays byte-identical.
 */
export function AasaanWebLegalDocument(_props: { kind: AasaanWebLegalKind }) {
  return null;
}
