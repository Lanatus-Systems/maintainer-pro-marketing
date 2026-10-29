import { AASAANWEB_FAQS } from "@/content/aasaanweb-faqs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { AasaanWebShell } from "@/components/aasaanweb/AasaanWebShell";
import { Reveal } from "@/components/aasaanweb/Reveal";
import { WORK } from "@/components/aasaanweb/work";
import { aasaanWebJsonLd, aasaanWebPageMeta, PageUrlTags } from "@/lib/aasaanweb";
import { isAasaanWeb } from "@/lib/brand";
import "./aasaanweb.css";

/**
 * AasaanWeb home page (APP_NAME=maintainer-pro). next.config rewrites "/" here for that brand only.
 * Copy comes from the admin app's client/src/pages/StudioLandingPage.tsx. The 2026-10 redesign
 * follows the look of the client sites AasaanWeb builds (see /work): a large display headline,
 * the product as the hero, full-bleed navy bands, numbered steps on hairline rules, and calm CSS
 * motion that respects prefers-reduced-motion.
 */
export const metadata: Metadata = aasaanWebPageMeta();

const SIGNUP_URL = "/signup";
const WORK_URL = "/work";

function unsplash(photo: string, width: number) {
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=70`;
}

function unsplashSrcSet(photo: string, widths: number[]) {
  return widths.map((w) => `${unsplash(photo, w)} ${w}w`).join(", ");
}

const PHOTO_WIDTHS = [480, 720, 960, 1280];

const WASTE = [
  {
    time: "Half a day",
    title: "“Can you move the button?”",
    body: "The edit is twenty minutes. It still waits, because the only person who can touch the site is inside another project. You both lose the afternoon for a change a customer would not even notice as “work.”",
  },
  {
    time: "Three rounds",
    title: "The screenshot loop",
    body: "You mark up a photo of the page, send it over, wait for a new version, then say “a little higher.” Every pass is another context switch — for the owner who is trying to run the shop, and for the developer who has to reopen the project.",
  },
  {
    time: "Weeks",
    title: "The page that never launches",
    body: "You already have the offer, the photos, and the hours. The landing page still sits with whoever you hired, because every draft needs one more tiny pass before you are willing to put your name on it.",
  },
];

const PROMPTS = [
  "Make the headline about same-day repairs.",
  "Replace the banner with this photo of the new shop.",
  "We are closed Mondays. Take that off the hours.",
  "Put the booking button above the fold on phones.",
  "The spring offer ends Sunday. Say that near the price.",
  "The phone number in the footer is old. Use the new one.",
];

const EDITS = [
  {
    title: "Headlines and offers",
    body: "The sentence a visitor reads first. Seasonal specials, a new service, a price you are actually proud of.",
  },
  {
    title: "Photos",
    body: "The shop, the work, the team. Swap the picture that has been wrong since last year without opening a design file.",
  },
  {
    title: "Hours, address, phone",
    body: "The details customers trust. A holiday closure should not become a ticket.",
  },
  {
    title: "Prices and services",
    body: "Add the thing you started offering, retire the thing you stopped, and keep the list honest.",
  },
  {
    title: "Buttons and forms",
    body: "Call, book, visit, or buy. Put the action where people actually look, including on a phone.",
  },
  {
    title: "Questions and proof",
    body: "The answers you repeat all week, and a line from a customer, written the way you would say it at the counter.",
  },
];

const CREATE_STEPS = [
  {
    n: "01",
    title: "Describe the business",
    body: "What you sell, who it is for, and what a visitor should do next. A few photos are enough to start.",
  },
  {
    n: "02",
    title: "Review a real page",
    body: "You get a landing page with an offer, services, proof, hours, and a way to reach you — not a blank template.",
  },
  {
    n: "03",
    title: "Adjust it in the preview",
    body: "Read it the way a customer would. Change a line, a photo, or the order of the page while you are looking at it.",
  },
  {
    n: "04",
    title: "Share it when it is ready",
    body: "Publish on your say-so. Next month’s small change uses the same preview, not a new project.",
  },
];

const UPDATE_STEPS = [
  {
    n: "01",
    title: "Open the site you already have",
    body: "Connect the page that is already live. You are not starting over, and you are not filing a brief.",
  },
  {
    n: "02",
    title: "Look at the customer view",
    body: "The preview is the page people see: headline, photos, hours, and the button that is supposed to get them in the door.",
  },
  {
    n: "03",
    title: "Say what is wrong",
    body: "Point at the stale part and describe the fix in ordinary language. The change shows up on that preview.",
  },
  {
    n: "04",
    title: "Publish when it looks right",
    body: "You decide. A ten-minute edit stays a ten-minute edit, instead of a day of waiting on someone else’s queue.",
  },
];

const AUDIENCE = [
  {
    title: "Owners",
    body: "Shops, studios, clinics, and practices whose customers judge them by the page — and who are tired of waiting to fix it.",
  },
  {
    title: "People launching",
    body: "Consultants and new businesses that need a clear page this week, with room to change the offer as it gets sharper.",
  },
  {
    title: "The person who usually does the edit",
    body: "Freelancers and small teams who should not have to reopen a project to change a comma, a photo, or a Saturday hour.",
  },
];

const FAQS = AASAANWEB_FAQS;

const USUAL_DAY = [
  { t: "9:10", d: "You notice last season’s offer is still the first thing on the page." },
  { t: "9:25", d: "You message the person who built the site." },
  { t: "11:40", d: "They ask which page, and for the exact new wording." },
  { t: "Next day", d: "A preview arrives. The photo is still the old one." },
  { t: "Thursday", d: "It finally goes live. The weekend rush already started." },
];

const STUDIO_DAY = [
  { t: "9:10", d: "You open the live preview of the page." },
  { t: "9:12", d: "You replace the offer and drop in the new photo." },
  { t: "9:18", d: "You read it the way a customer would, on your phone." },
  { t: "9:20", d: "You publish. The counter is still quiet." },
];

/** Facts shown on the live site today: the home page bars and the pricing page. */
const FACTS = [
  { value: "10 min", label: "A small change, made on the preview" },
  { value: "4 days", label: "The same change, the usual way" },
  { value: "15 days", label: "Of chatbot changes after we build the page" },
  { value: "₹5,000", label: "Paid at the end, after that work is done" },
];

const HOW = [
  { n: "01", title: "Tell us", body: "What you sell, a photo or two, and how a customer should reach you." },
  { n: "02", title: "See the page", body: "Your offer, your hours, and a button. A real page a customer can read." },
  { n: "03", title: "Change it yourself", body: "Say what is wrong, in normal words. You see it change, then you put it live." },
];

function Icon({ children, size = 22 }: { children: ReactNode; size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" fill="none">
      {children}
    </svg>
  );
}

const S = { stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const BITS: { label: string; icon: ReactNode }[] = [
  { label: "Headline", icon: <path d="M7 10h18M7 16h14M7 22h10" {...S} /> },
  {
    label: "Photo",
    icon: (
      <>
        <rect x="6" y="8" width="20" height="16" rx="2" {...S} />
        <circle cx="12" cy="14" r="2" {...S} />
        <path d="m8 22 6-5 4 3 3-2 3 4" {...S} />
      </>
    ),
  },
  {
    label: "Hours",
    icon: (
      <>
        <circle cx="16" cy="16" r="8" {...S} />
        <path d="M16 12v4.5l3 2" {...S} />
      </>
    ),
  },
  {
    label: "Phone",
    icon: <path d="M11 8h3.2l1.2 3.2-2 .9a8.5 8.5 0 0 0 4.5 4.5l.9-2 3.2 1.2V19a2 2 0 0 1-2.2 2A12.2 12.2 0 0 1 9 11.2 2 2 0 0 1 11 8Z" {...S} />,
  },
  {
    label: "Price",
    icon: (
      <>
        <path d="M14.5 8H23v8.5L15 24.5 6.5 16 14.5 8Z" {...S} />
        <circle cx="19.2" cy="12.8" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Button",
    icon: (
      <>
        <rect x="6" y="12" width="20" height="8" rx="4" {...S} />
        <path d="M11 16h6" {...S} />
      </>
    ),
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" className="studio-arrow">
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="none" className="studio-check">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The product moment: a business page on the preview, with the owner's change request beside it. */
function PreviewStage() {
  return (
    <div className="studio-stage" aria-hidden="true">
      <div className="studio-browser">
        <div className="studio-browser-bar">
          <span />
          <span />
          <span />
          <div className="studio-url">harbor-bake.example</div>
          <p className="studio-preview-tag">Preview</p>
        </div>
        <article className="studio-site">
          <img
            src={unsplash("photo-1509440159596-0249088772ff", 960)}
            srcSet={unsplashSrcSet("photo-1509440159596-0249088772ff", PHOTO_WIDTHS)}
            sizes="(max-width: 980px) 94vw, 600px"
            alt=""
            width={1600}
            height={1066}
            fetchPriority="high"
          />
          <div className="studio-site-shade" />
          <div className="studio-site-copy">
            <p>Harbor Bake · East Market</p>
            <h3>Saturday loaves, out by two.</h3>
            <p className="studio-site-note">Open today until 6. Weekend bread sells through early afternoon.</p>
            <div className="studio-site-actions">
              <span className="studio-site-btn">Order for pickup</span>
              <span className="studio-hours-chip">
                Sat close
                <strong> 2:00</strong>
              </span>
            </div>
          </div>
        </article>
      </div>
      <aside className="studio-edit-card">
        <p className="studio-edit-kicker">On the page, just now</p>
        <p className="studio-edit-quote">
          “Saturday hours are wrong. We close at 2, not 6. And use the new photo of the counter.”
        </p>
        <ul>
          <li>
            <Check />
            Hours line updated
          </li>
          <li>
            <Check />
            Counter photo swapped
          </li>
          <li className="is-waiting">
            <span className="studio-pulse" />
            Waiting on you to publish
          </li>
        </ul>
      </aside>
      <div className="studio-float studio-float-a">Swap the storefront photo</div>
      <div className="studio-float studio-float-b">Offer ends Sunday</div>
    </div>
  );
}

export default function AasaanWebHome() {
  // Butterneck builds never serve this page.
  if (!isAasaanWeb) notFound();
  return (
    <AasaanWebShell current="home">
      <main id="content">
        <PageUrlTags path="/" />
        <JsonLd data={aasaanWebJsonLd()} />

        <section className="studio-hero">
          <div className="studio-wrap studio-hero-grid">
            <p className="studio-kicker studio-hero-in studio-hero-kicker">For the page customers actually see</p>
            <h1 className="studio-hero-title">
                <span className="studio-line">
                  <span>Create your own site.</span>
                </span>{" "}
                <span className="studio-line">
                  <span>Update the one you have</span>
                </span>{" "}
                <span className="studio-line">
                  <span>
                    <em>on the go.</em>
                  </span>
                </span>
              </h1>
            <div className="studio-hero-copy">
              <p className="studio-lead studio-hero-in">
                Tell us about your business. You get a page. When a photo, a price, or a Saturday hour changes, you fix
                it yourself — while you are looking at it.
              </p>
              <div className="studio-hero-actions studio-hero-in">
                <a href={SIGNUP_URL} className="studio-btn">
                  Create your site
                </a>
                <a href={SIGNUP_URL} className="studio-btn studio-btn-ghost">
                  Update your existing site
                </a>
              </div>
              <p className="studio-hero-proof studio-hero-in">
                Live pages for{" "}
                {WORK.map((item, i) => (
                  <span key={item.name}>
                    <a href={WORK_URL}>{item.name}</a>
                    {i < WORK.length - 2 ? ", " : i === WORK.length - 2 ? " and " : ""}
                  </span>
                ))}
                .
              </p>
            </div>
            <div className="studio-hero-visual">
              <PreviewStage />
            </div>
          </div>
        </section>

        <section className="studio-facts" aria-label="At a glance">
          <dl className="studio-wrap studio-facts-grid">
            {FACTS.map((fact) => (
              <div key={fact.value}>
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="how" className="studio-section" aria-labelledby="plain-heading">
          <div className="studio-wrap">
            <Reveal>
              <div className="studio-section-head studio-head-split">
                <div>
                  <p className="studio-kicker">How it works</p>
                  <h2 id="plain-heading">You tell us. You see the page. You change it.</h2>
                </div>
                <p>
                  Two paths, one preview. Start a new landing page from what your business already is, or open the site
                  you have and correct it on the spot.
                </p>
              </div>
            </Reveal>
            <ol className="studio-numbered">
              {HOW.map((step) => (
                <li key={step.n}>
                  <span className="studio-num">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="studio-marquee" aria-label="What you can change yourself">
            <p className="studio-wrap studio-marquee-label">What you can change yourself</p>
            <div className="studio-marquee-track">
              {[0, 1].map((copy) => (
                <ul key={copy} className="studio-bits" aria-hidden={copy === 1 ? true : undefined}>
                  {[...BITS, ...BITS].map((bit, i) => (
                    <li key={`${bit.label}-${i}`}>
                      <Icon>{bit.icon}</Icon>
                      {bit.label}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section id="examples" className="studio-section studio-section-white" aria-labelledby="examples-heading">
          <div className="studio-wrap">
            <Reveal>
              <div className="studio-section-head studio-head-split">
                <div>
                  <p className="studio-kicker">Our work</p>
                  <h2 id="examples-heading">Pages for real businesses.</h2>
                </div>
                <p>A customer can see what they do, and how to get in touch.</p>
              </div>
            </Reveal>
            <div className="studio-examples">
              {WORK.filter((item) => item.src).map((item) => (
                <figure className="studio-example" key={item.name}>
                  <a
                    href={item.open}
                    target="_blank"
                    rel="noreferrer"
                    className="studio-example-frame"
                    aria-label={`Open the ${item.name} website in a new tab`}
                  >
                    <img src={item.src} alt={item.alt ?? item.name} width={1024} height={580} loading="lazy" />
                  </a>
                  <figcaption>
                    <p className="studio-example-meta">{item.meta}</p>
                    <h3>{item.name}</h3>
                    <p>{item.summary}</p>
                    <a
                      href={item.open}
                      target="_blank"
                      rel="noreferrer"
                      className="studio-example-open"
                      aria-label={`Open the ${item.name} website in a new tab`}
                    >
                      Open the website <Arrow />
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
            <a href={WORK_URL} className="studio-btn studio-btn-ghost studio-more">
              See our work
            </a>
          </div>
        </section>

        <section id="problem" className="studio-dark" aria-labelledby="problem-heading">
          <div className="studio-wrap studio-problem">
            <Reveal>
              <div className="studio-problem-head">
                <p className="studio-kicker">What we are solving</p>
                <h2 id="problem-heading">The change is small. The waiting is not.</h2>
                <p>
                  Owners rarely need a redesign. They need the homepage to tell the truth this week. That request still
                  travels through a message, a developer’s calendar, a review, and another message. Both sides pay for
                  it: the owner waits while customers see the old page, and the developer loses a block of real work to
                  a ten-minute edit.
                </p>
              </div>
            </Reveal>
            <ol className="studio-rows">
              {WASTE.map((item) => (
                <li key={item.title}>
                  <p className="studio-row-tag">{item.time}</p>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="studio-statement" aria-labelledby="answer-heading">
          <Reveal className="studio-wrap">
            <p className="studio-kicker">The other way</p>
            <h2 id="answer-heading">
              Edit the site directly, <em>on the preview.</em>
            </h2>
            <p>
              Open the page the way a customer sees it. Say what should be different. Watch that part change. Publish
              when you are satisfied — not when a ticket reaches the top of someone else’s list. The developer stays
              available for work that actually needs them.
            </p>
          </Reveal>
        </section>

        <section id="create" className="studio-section studio-section-white" aria-labelledby="create-heading">
          <div className="studio-wrap studio-split">
            <figure className="studio-photo">
              <img
                src={unsplash("photo-1554118811-1e0d58224f24", 960)}
                srcSet={unsplashSrcSet("photo-1554118811-1e0d58224f24", PHOTO_WIDTHS)}
                sizes="(max-width: 980px) 94vw, 600px"
                alt="A small cafe counter, the kind of business a landing page has to explain in one screen."
                width={1400}
                height={933}
                loading="lazy"
              />
              <figcaption>A first page, built from the shop you already run.</figcaption>
            </figure>
            <div className="studio-split-copy">
              <p className="studio-kicker">Path one</p>
              <h2 id="create-heading">Create your own site</h2>
              <p>
                You should not need a project plan to have a page. Bring what you would tell a good customer: what you
                do, why someone should pick you, a few true photos, and the next step — call, book, visit, or buy.
              </p>
              <p>
                The result is a landing page with a clear offer, your services, proof, hours, and contact. It is meant
                to be edited the week something changes, with the same preview you used to approve it.
              </p>
              <ol className="studio-steps">
                {CREATE_STEPS.map((step) => (
                  <li key={step.n}>
                    <span>{step.n}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a href={SIGNUP_URL} className="studio-btn">
                Create your site
              </a>
            </div>
          </div>
        </section>

        <section id="update" className="studio-section" aria-labelledby="update-heading">
          <div className="studio-wrap studio-split studio-split-reverse">
            <figure className="studio-photo">
              <img
                src={unsplash("photo-1441986300917-64674bd600d8", 960)}
                srcSet={unsplashSrcSet("photo-1441986300917-64674bd600d8", PHOTO_WIDTHS)}
                sizes="(max-width: 980px) 94vw, 600px"
                alt="A clothing shop interior, already open, with a page that has to keep up with what is on the floor."
                width={1400}
                height={933}
                loading="lazy"
              />
              <figcaption>The site is live. The details still drift.</figcaption>
            </figure>
            <div className="studio-split-copy">
              <p className="studio-kicker">Path two</p>
              <h2 id="update-heading">Update your existing site, very easily</h2>
              <p>
                The menu changed. The sale ended. The photo is three years old. The phone number is wrong on mobile.
                None of that is a redesign. It is still how most owners spend a week they do not have.
              </p>
              <p>
                Connect the site you already have, open the preview, and describe the correction. You stay in the page.
                Your developer stays out of the queue for edits that were never worth a meeting.
              </p>
              <ol className="studio-steps">
                {UPDATE_STEPS.map((step) => (
                  <li key={step.n}>
                    <span>{step.n}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a href={SIGNUP_URL} className="studio-btn studio-btn-teal">
                Update your site
              </a>
            </div>
          </div>
        </section>

        <section className="studio-section studio-section-white" aria-labelledby="say-heading">
          <div className="studio-wrap studio-say">
            <Reveal>
              <div className="studio-section-head">
                <p className="studio-kicker">How an edit sounds</p>
                <h2 id="say-heading">Say it the way you would say it out loud.</h2>
                <p>
                  You do not write a specification. You point at the part that is wrong and describe the fix. These are
                  the requests that used to become tickets.
                </p>
              </div>
            </Reveal>
            <ul className="studio-prompts">
              {PROMPTS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="studio-section" aria-labelledby="edits-heading">
          <div className="studio-wrap">
            <Reveal>
              <div className="studio-section-head">
                <p className="studio-kicker">What you change yourself</p>
                <h2 id="edits-heading">The pieces that go stale first.</h2>
              </div>
            </Reveal>
            <div className="studio-edits">
              {EDITS.map((item, i) => (
                <article key={item.title} className="studio-edit-tile">
                  <span className="studio-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="studio-section studio-section-white" aria-labelledby="tuesday-heading">
          <div className="studio-wrap">
            <Reveal>
              <div className="studio-section-head">
                <p className="studio-kicker">The same Tuesday</p>
                <h2 id="tuesday-heading">One small correction. Two calendars.</h2>
              </div>
            </Reveal>
            <div className="studio-days">
              <article>
                <header className="studio-day-head">
                  <h3>The usual way</h3>
                  <p>Four days</p>
                </header>
                <ol className="studio-timeline">
                  {USUAL_DAY.map((row, index) => (
                    <li key={row.t} className={index === USUAL_DAY.length - 1 ? "is-last" : undefined}>
                      <time>{row.t}</time>
                      <span className="studio-node" aria-hidden="true" />
                      <span>{row.d}</span>
                    </li>
                  ))}
                </ol>
                <div className="studio-meter">
                  <div className="studio-meter-track" aria-hidden="true">
                    <span />
                  </div>
                  <p>Live on Thursday. The weekend rush already started.</p>
                </div>
              </article>
              <article className="is-studio">
                <header className="studio-day-head">
                  <h3>On the preview</h3>
                  <p>Ten minutes</p>
                </header>
                <ol className="studio-timeline">
                  {STUDIO_DAY.map((row, index) => (
                    <li key={row.t} className={index === STUDIO_DAY.length - 1 ? "is-last" : undefined}>
                      <time>{row.t}</time>
                      <span className="studio-node" aria-hidden="true" />
                      <span>{row.d}</span>
                    </li>
                  ))}
                </ol>
                <div className="studio-meter">
                  <div className="studio-meter-track" aria-hidden="true">
                    <span />
                  </div>
                  <p>Published at 9:20. The counter is still quiet.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="who" className="studio-section" aria-labelledby="who-heading">
          <div className="studio-wrap studio-who">
            <Reveal>
              <div className="studio-who-head">
                <p className="studio-kicker">Who it is for</p>
                <h2 id="who-heading">Anyone who has waited on a tiny change.</h2>
                <p>
                  If the page represents a real business, it will need small edits forever. This is for the people who
                  feel that cost — and for the people who have been paying it in interrupted hours.
                </p>
              </div>
            </Reveal>
            <div className="studio-who-list">
              {AUDIENCE.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="studio-wrap">
            <div className="studio-control">
              <h2 id="control-heading">You still decide what the public sees.</h2>
              <ul aria-labelledby="control-heading">
                <li>
                  <Check />
                  Every change shows on the preview before it is public.
                </li>
                <li>
                  <Check />
                  Publishing stays with you. A request is not a release.
                </li>
                <li>
                  <Check />
                  Everyday edits leave the developer’s queue.
                </li>
                <li>
                  <Check />
                  Larger work can still go to your team. This is for the changes that were never a project.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="faq" className="studio-section studio-section-white" aria-labelledby="faq-heading">
          <div className="studio-wrap studio-faq-grid">
            <div className="studio-faq-head">
              <p className="studio-kicker">Questions</p>
              <h2 id="faq-heading">Before you start either path.</h2>
              <p>
                Something else on your mind? Write to <a href="mailto:support@butterneck.com">support@butterneck.com</a>.
              </p>
            </div>
            <div className="studio-faq">
              {FAQS.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="studio-close" aria-labelledby="close-heading">
          <p className="studio-kicker">Start with the page</p>
          <h2 id="close-heading">Stop spending a day on a ten-minute change.</h2>
          <p>
            Create a landing page from what your business already is, or open the site you have and correct it on the
            spot.
          </p>
          <div className="studio-close-actions">
            <a href={SIGNUP_URL} className="studio-btn">
              Create your site
            </a>
            <a href={SIGNUP_URL} className="studio-btn studio-btn-ghost">
              Update your existing site
            </a>
          </div>
        </section>
      </main>
    </AasaanWebShell>
  );
}
