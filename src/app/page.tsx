import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PricingSection } from "@/components/PricingSection";
import { ProductPreview } from "@/components/ProductPreview";
import {
  ACCESS,
  DEFINITION,
  DIFFERENCE,
  EXAMPLES,
  FAQS,
  JIRA,
  STEPS,
  WHY,
} from "@/content/landing";
import { SITE_OPEN_GRAPH } from "@/lib/meta";
import { homeJsonLd } from "@/lib/schema";
import { DemoVideo } from "@/components/DemoVideo";
import { appUrl, SITE_DESCRIPTION, SITE_TITLE, siteUrl, WALKTHROUGH_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  // Absolute, with the trailing slash the sitemap uses for the home URL.
  alternates: { canonical: siteUrl("/") },
  openGraph: {
    ...SITE_OPEN_GRAPH,
    url: siteUrl("/"),
  },
};

export default function HomePage() {
  return (
    <main id="content" className="landing">
      <JsonLd data={homeJsonLd()} />

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="landing-kicker">For product teams</p>
          <h1>Let them ask. You decide what goes live.</h1>
          <p className="landing-lead">
            A product manager describes the change on a live copy of the product. The AI reads a
            one-line request or a messy ticket, and edits the project on your computer. A developer
            looks once, then puts it live or leaves it there.
          </p>
          <p className="landing-quiet landing-definition">{DEFINITION}</p>
          <div className="landing-cta">
            <a href={appUrl("/signup")} className="landing-btn primary" data-ga-location="home_hero">
              Create a free workspace
            </a>
            <a
              href={WALKTHROUGH_URL}
              className="landing-btn"
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="book_walkthrough_click"
              data-ga-location="home_hero"
            >
              Book a walkthrough
            </a>
            <a href="#demo" className="landing-btn">
              Watch the demo
            </a>
          </div>
          <ul className="landing-trust">
            <li>They ask on the live product</li>
            <li>You choose who can ask</li>
            <li>The AI only edits your project</li>
            <li>You decide what goes live</li>
          </ul>
        </div>
        <ProductPreview />
      </section>

      <section id="demo" className="landing-section landing-demo" aria-labelledby="demo-heading">
        <h2 id="demo-heading">See a request go from chat to preview</h2>
        <p className="landing-section-lead">
          A request typed on the live copy, the AI editing the project, and the updated preview.
        </p>
        <DemoVideo
          src="/media/hero-demo.mp4"
          poster="/media/hero-demo-poster.png"
          width={1920}
          height={1080}
          label="Butterneck demo: a change request typed on a live preview and the AI updating the app"
        />
        <div className="landing-cta">
          <a href={appUrl("/signup")} className="landing-btn primary" data-ga-location="home_demo">
            Create a free workspace
          </a>
          <a
            href={WALKTHROUGH_URL}
            className="landing-btn"
            target="_blank"
            rel="noopener noreferrer"
            data-ga-event="book_walkthrough_click"
            data-ga-location="home_demo"
          >
            Book a walkthrough
          </a>
        </div>
      </section>

      <section className="landing-proof" aria-label="Where the time goes">
        <p>
          The change itself is quick. The messages around it are not: which page, which words,
          which comment.
        </p>
      </section>

      <section id="example" className="landing-section" aria-labelledby="example-heading">
        <h2 id="example-heading">Where a developer’s time goes</h2>
        <p className="landing-section-lead">
          A one-line request, and a messy ticket. Both follow the same path.
        </p>
        <div className="landing-fit">
          {EXAMPLES.map((item) => (
            <article key={item.title} className="card landing-card landing-compare">
              <h3>{item.title}</h3>
              <div className="landing-compare-block">
                <p className="landing-example-kicker">Today</p>
                <ul>
                  {item.today.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="landing-compare-block">
                <p className="landing-example-kicker">On Butterneck</p>
                <ul>
                  {item.after.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="why-now" className="landing-section" aria-labelledby="why-heading">
        <h2 id="why-heading">Why this is worth doing now</h2>
        <div className="landing-grid">
          {WHY.map((item) => (
            <article key={item.title} className="card landing-card">
              <h3>{item.title}</h3>
              <Points lines={item.lines} />
            </article>
          ))}
        </div>
      </section>

      <section id="difference" className="landing-section" aria-labelledby="difference-heading">
        <h2 id="difference-heading">How this is different</h2>
        <div className="landing-grid">
          {DIFFERENCE.map((item) => (
            <article key={item.title} className="card landing-card">
              <h3>{item.title}</h3>
              <Points lines={item.lines} />
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="landing-section" aria-labelledby="steps-heading">
        <h2 id="steps-heading">How it works</h2>
        <DemoVideo
          src="/media/how-it-works.mp4"
          poster="/media/how-it-works-poster.png"
          width={1200}
          height={674}
          label="Butterneck in four steps: ask for a change in chat on the live preview, the developer's AI builds it locally, the preview updates, and the developer decides what ships"
        />
        <p className="landing-section-lead">
          Connect the product, let them ask, and decide what goes live.
        </p>
        <ol className="landing-steps">
          {STEPS.map((step) => (
            <li key={step.n} className="card landing-card">
              <span className="landing-step-n">{step.n}</span>
              <h3>{step.title}</h3>
              <Points lines={step.lines} />
            </li>
          ))}
        </ol>
      </section>

      <section id="jira" className="landing-section" aria-labelledby="jira-heading">
        <h2 id="jira-heading" className="landing-jira-title">
          <JiraMark />
          <span>A Jira ticket can start the chat</span>
        </h2>
        <p className="landing-section-lead">
          Connect once. Label the ticket. The preview link comes back on it.
        </p>
        <div className="landing-grid">
          {JIRA.map((item) => (
            <article key={item.title} className="card landing-card">
              <h3>{item.title}</h3>
              <Points lines={item.lines} />
            </article>
          ))}
        </div>
      </section>

      <section id="access" className="landing-section landing-safety" aria-labelledby="access-heading">
        <div>
          <p className="landing-kicker">Access</p>
          <h2 id="access-heading">You choose who can ask.</h2>
          <p className="landing-section-lead">
            The link opens the preview. You decide whose message starts the AI.
          </p>
        </div>
        <ul className="landing-safety-list">
          {ACCESS.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="safety" className="landing-section landing-safety" aria-labelledby="safety-heading">
        <div>
          <p className="landing-kicker">Your call</p>
          <h2 id="safety-heading">You decide what goes live.</h2>
          <p className="landing-section-lead">
            The AI edits the project on your computer. Your team publishes it.
          </p>
        </div>
        <ul className="landing-safety-list">
          <li>
            <strong>Your project only</strong>
            <span>
              The AI works in the project you connected. Secret settings files (.env) are on its ignore list. That is an instruction, not a hard block, so keep production secrets off that computer.
            </span>
          </li>
          <li>
            <strong>The conversation stays with the change</strong>
            <span>
              The request, the screenshots, and the replies stay on the live copy of the app.
            </span>
          </li>
          <li>
            <strong>Your team publishes</strong>
            <span>
              When the change looks right, you publish it the way you already do. Until then it
              stays on the computer.
            </span>
          </li>
        </ul>
      </section>

      <section className="landing-section" aria-labelledby="fit-heading">
        <h2 id="fit-heading">Built for product teams</h2>
        <Points
          lines={[
            "A team that builds a product and keeps it running.",
            "The moment this helps: passing requests around takes more of the week than the work itself.",
            "A product manager describes the change. A developer decides what goes live.",
            "The project lives on a computer you control.",
          ]}
        />
        <p className="landing-quiet">
          A company that looks after a client’s website can connect that project the same way.
        </p>
      </section>

      <PricingSection />

      <section id="faq" className="landing-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Questions people ask first</h2>
        <div className="landing-faq">
          {FAQS.map((item) => (
            <details key={item.q} className="card landing-card">
              <summary>{item.q}</summary>
              <Points lines={item.lines} />
              {"link" in item && item.link ? (
                <p>
                  <a href={item.link.href}>{item.link.text}</a>
                </p>
              ) : null}
            </details>
          ))}
        </div>
      </section>

      <section className="landing-bottom card">
        <div>
          <h2>Let them ask.</h2>
          <p>
            Create a free workspace and connect your project. You decide what goes live. No credit
            card.
          </p>
        </div>
        <div className="landing-cta">
          <a href={appUrl("/signup")} className="landing-btn primary" data-ga-location="home_footer_cta">
            Create a free workspace
          </a>
          <a href={appUrl("/login")} className="landing-btn">
            Log in
          </a>
        </div>
      </section>
    </main>
  );
}

function Points({ lines }: { lines: readonly string[] }) {
  return (
    <ul className="landing-points">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

function JiraMark() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#2684FF"
        d="M11.53 2c0 2.4 1.97 4.35 4.35 4.35h1.78v1.7c0 2.4 1.94 4.34 4.34 4.35V2.84a.84.84 0 0 0-.84-.84H11.53zM6.77 6.8a4.36 4.36 0 0 0 4.34 4.36h1.78v1.7a4.36 4.36 0 0 0 4.34 4.35V7.65a.84.84 0 0 0-.84-.84H6.77zM2 11.6a4.36 4.36 0 0 0 4.35 4.35h1.78v1.7A4.36 4.36 0 0 0 12.47 22v-9.56a.84.84 0 0 0-.84-.84H2z"
      />
    </svg>
  );
}
