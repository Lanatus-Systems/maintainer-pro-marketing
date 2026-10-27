import Link from "next/link";
import { brand } from "@/lib/brand";

export default function NotFound() {
  return (
    <main id="content" className="legal-page">
      <p className="legal-kicker">{brand.name}</p>
      <h1>That page is not here</h1>
      <p className="muted">The address may have changed, or the page was never published.</p>
      <p>
        <Link href="/" className="landing-btn primary">
          Back to the home page
        </Link>
      </p>
    </main>
  );
}
