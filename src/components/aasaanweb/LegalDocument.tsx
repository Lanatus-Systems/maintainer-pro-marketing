import { AASAANWEB_LEGAL, AASAANWEB_LEGAL_UPDATED, type AasaanWebLegalKind } from "@/content/aasaanweb-legal";
import { AasaanWebShell } from "./AasaanWebShell";
import "../../app/aasaanweb-home/aasaanweb.css";

const SUPPORT_EMAIL = "support@butterneck.com";
const WHATSAPP_URL = "https://wa.me/918469175299";
const WHATSAPP_LABEL = "+91 84691 75299";

/**
 * Legal and contact pages. Text from the admin app's LegalPage; since the 2026-10 redesign they use
 * the same header and footer as every other AasaanWeb page.
 */
export function AasaanWebLegalDocument({ kind }: { kind: AasaanWebLegalKind }) {
  const page = AASAANWEB_LEGAL[kind];
  return (
    <AasaanWebShell>
      <main id="content" className="studio-legal">
        <p className="studio-kicker">{page.kicker}</p>
        <h1>{page.title}</h1>
        <p className="studio-legal-updated">Last updated {AASAANWEB_LEGAL_UPDATED}</p>
        {page.blocks.map((block) => (
          <section key={block.heading}>
            <h2>{block.heading}</h2>
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        {kind === "contact" ? (
          <section>
            <h2>WhatsApp</h2>
            <p>
              Message us on WhatsApp:{" "}
              <a href={WHATSAPP_URL} className="studio-whatsapp">
                {WHATSAPP_LABEL}
              </a>
            </p>
          </section>
        ) : null}
        <p className="studio-legal-foot">
          Questions: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          {" · "}
          <a href="/contact">Contact</a>
          {" · "}
          <a href="/privacy">Privacy</a>
          {" · "}
          <a href="/terms">Terms</a>
        </p>
      </main>
    </AasaanWebShell>
  );
}
