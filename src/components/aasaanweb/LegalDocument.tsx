import { AASAANWEB_LEGAL, AASAANWEB_LEGAL_UPDATED, type AasaanWebLegalKind } from "@/content/aasaanweb-legal";
import { StudioLogo } from "./Logo";
import "./legal.css";

const SUPPORT_EMAIL = "support@butterneck.com";
const FONTS_CSS =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@500..700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";

/** Port of the admin app's LegalPage + PublicHeader as rendered on aasaan.butterneck.com. */
export function AasaanWebLegalDocument({ kind }: { kind: AasaanWebLegalKind }) {
  const page = AASAANWEB_LEGAL[kind];
  return (
    <div className="aw-public-shell">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONTS_CSS} precedence="default" />
      <header className="aw-public-header">
        <StudioLogo size={28} />
        <nav className="aw-public-header-actions">
          <a className="aw-public-link" href="/login">
            Log in
          </a>
          <a className="aw-public-signup" href="/signup">
            Create workspace
          </a>
        </nav>
      </header>
      <main className="aw-legal-page">
        <p className="aw-muted aw-legal-kicker">{page.kicker}</p>
        <h1>{page.title}</h1>
        <p className="aw-muted">Last updated {AASAANWEB_LEGAL_UPDATED}</p>
        {page.blocks.map((block) => (
          <section key={block.heading}>
            <h2>{block.heading}</h2>
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <p className="aw-muted">
          Questions: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          {" · "}
          <a href="/contact">Contact</a>
          {" · "}
          <a href="/privacy">Privacy</a>
          {" · "}
          <a href="/terms">Terms</a>
        </p>
      </main>
    </div>
  );
}
