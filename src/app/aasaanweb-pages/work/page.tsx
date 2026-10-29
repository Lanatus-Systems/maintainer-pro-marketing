import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AasaanWebShell } from "@/components/aasaanweb/AasaanWebShell";
import { Reveal } from "@/components/aasaanweb/Reveal";
import { WorkFrame } from "@/components/aasaanweb/WorkFrame";
import { WORK } from "@/components/aasaanweb/work";
import { aasaanWebSubpageMeta } from "@/lib/aasaanweb";
import { isAasaanWeb } from "@/lib/brand";
import "../../aasaanweb-home/aasaanweb.css";

/** AasaanWeb only: a port of the admin app's client/src/pages/WorkPage.tsx. */
export const metadata: Metadata = isAasaanWeb
  ? aasaanWebSubpageMeta({
      title: "Our work",
      description:
        "Pages AasaanWeb has made for real businesses. Each one says what the business does, and how a customer gets in touch.",
      path: "/work",
    })
  : {};

const SIGNUP_URL = "/signup";

export default function WorkPage() {
  if (!isAasaanWeb) notFound();
  return (
    <AasaanWebShell current="work">
      <main id="content">
        <section className="studio-work-hero">
          <p className="studio-kicker">Our work</p>
          <h1>Pages we have made.</h1>
          <p className="studio-lead">
            These are real businesses. Each page says what they do, and gives a customer a way to call, visit, or
            send a message.
          </p>
        </section>

        <div className="studio-studies">
          {WORK.map((item, index) => (
            <Reveal key={item.name}>
              <article className="studio-study">
                <WorkFrame name={item.name} src={item.src} alt={item.alt} live={item.live} eager={index === 0} />
                <div className="studio-study-copy">
                  <p className="studio-example-meta">{item.meta}</p>
                  <h2>{item.name}</h2>
                  <p>{item.does}</p>
                  <dl>
                    <div>
                      <dt>On the page</dt>
                      <dd>{item.page}</dd>
                    </div>
                    <div>
                      <dt>A customer can</dt>
                      <dd>{item.reach}</dd>
                    </div>
                  </dl>
                  <p className="studio-study-menu-label">The menu</p>
                  <ul className="studio-pills">
                    {item.menu.map((label) => (
                      <li key={label}>{label}</li>
                    ))}
                  </ul>
                  <a
                    href={item.open}
                    target="_blank"
                    rel="noreferrer"
                    className="studio-btn studio-btn-small studio-study-open"
                    aria-label={`Open the ${item.name} website in a new tab`}
                  >
                    Open the website ↗
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <section className="studio-close" aria-labelledby="work-close-heading">
          <p className="studio-kicker">Your page</p>
          <h2 id="work-close-heading">A page like this, for your business.</h2>
          <p>Tell us what you do. Look at the page. Change a photo, a price, or a Saturday hour yourself.</p>
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
