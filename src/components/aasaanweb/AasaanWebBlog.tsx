import { AASAANWEB_PUBLISHED_POSTS, aasaanWebPostPath } from "@/content/aasaanweb-blog";
import { JsonLd } from "@/components/JsonLd";
import { AasaanWebShell, START_URL } from "@/components/aasaanweb/AasaanWebShell";
import { AasaanWebPostBody } from "@/components/aasaanweb/AasaanWebPostBody";
import { AASAANWEB_OG_IMAGE, aasaanWebSubpageMeta } from "@/lib/aasaanweb";
import {
  aasaanWebReadingMinutes,
  formatAasaanWebDate,
  getAasaanWebPosts,
  type AasaanWebPost,
} from "@/lib/aasaanweb-blog";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import "@/app/aasaanweb-home/aasaanweb.css";
import "./blog.css";

const ORG_ID = "https://www.butterneck.com/#organization";
const BLOG_TITLE = "Blog";
const BLOG_DESCRIPTION =
  "AasaanWeb blog: simple guides for small Indian businesses on making a website, keeping it up to date, and getting customers to call, visit or WhatsApp.";

export const aasaanWebBlogIndexMeta: Metadata = aasaanWebSubpageMeta({
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  path: "/blog",
});

export function aasaanWebPostMeta(post: AasaanWebPost, preview: boolean): Metadata {
  const base = aasaanWebSubpageMeta({ title: post.title, description: post.description, path: aasaanWebPostPath(post.slug) });
  return {
    ...base,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    ...(preview ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.keywords,
    },
  };
}

export function AasaanWebBlogIndex() {
  const posts = getAasaanWebPosts(AASAANWEB_PUBLISHED_POSTS);
  return (
    <AasaanWebShell current="blog">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "AasaanWeb blog",
          url: siteUrl("/blog"),
          description: BLOG_DESCRIPTION,
          publisher: { "@id": ORG_ID },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: siteUrl(aasaanWebPostPath(p.slug)),
            datePublished: p.date,
          })),
        }}
      />
      <main className="aw-blog">
        <section className="studio-work-hero aw-blog-hero">
          <p className="studio-kicker">Blog</p>
          <h1>Website tips for your business.</h1>
          <p className="studio-lead">
            Simple guides on making a page for your dukan, studio or clinic, and keeping it up to date in your own
            words.
          </p>
        </section>

        {posts.length === 0 ? (
          <section className="aw-blog-empty" aria-labelledby="blog-empty-heading">
            <div className="aw-blog-empty-art" aria-hidden="true">
              <span className="aw-blog-empty-card aw-blog-empty-card-back" />
              <span className="aw-blog-empty-card">
                <span className="aw-blog-empty-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="aw-blog-empty-line aw-blog-empty-line-wide" />
                <span className="aw-blog-empty-line" />
                <span className="aw-blog-empty-line aw-blog-empty-line-short" />
                <span className="aw-blog-empty-pen">✎</span>
              </span>
            </div>
            <p className="studio-kicker">Coming soon</p>
            <h2 id="blog-empty-heading">The first posts are being written.</h2>
            <p>
              Soon you will find short, practical guides here: what a good business page needs, how to change a price or a
              photo yourself, and how customers find you. Meanwhile, see the pages we have made.
            </p>
            <div className="studio-close-actions">
              <a href="/work" className="studio-btn">
                See our work
              </a>
              <a href={START_URL} className="studio-btn studio-btn-ghost">
                Start your page, free
              </a>
            </div>
          </section>
        ) : (
          <ul className="aw-blog-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <a href={aasaanWebPostPath(post.slug)} className="aw-blog-card">
                  <p className="aw-blog-meta">
                    <time dateTime={post.date}>{formatAasaanWebDate(post.date)}</time> · {aasaanWebReadingMinutes(post)} min
                    read
                  </p>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <span className="aw-blog-read">Read the post →</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>
    </AasaanWebShell>
  );
}

export function AasaanWebBlogPost({ post, preview }: { post: AasaanWebPost; preview: boolean }) {
  const path = aasaanWebPostPath(post.slug);
  const url = siteUrl(path);
  return (
    <AasaanWebShell current="blog">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": `${url}#article`,
              headline: post.title,
              description: post.description,
              image: AASAANWEB_OG_IMAGE,
              datePublished: post.date,
              dateModified: post.updated ?? post.date,
              author: { "@type": "Organization", name: post.author, url: siteUrl("/") },
              publisher: { "@id": ORG_ID },
              mainEntityOfPage: url,
              keywords: post.keywords.join(", "),
              inLanguage: post.lang,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Blog", item: siteUrl("/blog") },
                { "@type": "ListItem", position: 3, name: post.title, item: url },
              ],
            },
          ],
        }}
      />
      <main className="aw-blog aw-blog-post">
        {preview && post.draft ? (
          <p className="aw-blog-draft" role="status">
            Draft preview: this post is not published. It is not on /blog or in the sitemap, and it returns 404 in
            production.
          </p>
        ) : null}
        <nav aria-label="Breadcrumb" className="aw-blog-crumbs">
          <a href="/">Home</a> / <a href="/blog">Blog</a>
        </nav>
        <article lang={post.lang}>
          <header>
            <h1>{post.title}</h1>
            <p className="aw-blog-meta">
              <time dateTime={post.date}>{formatAasaanWebDate(post.date)}</time> · {post.author} ·{" "}
              {aasaanWebReadingMinutes(post)} min read
            </p>
          </header>
          <AasaanWebPostBody body={post.body} />
        </article>
        <section className="studio-close" aria-labelledby="post-close-heading">
          <p className="studio-kicker">Your page</p>
          <h2 id="post-close-heading">A page like this, for your business.</h2>
          <p>Tell us what you do. Look at the page. Change a photo, a price, or a Saturday hour yourself.</p>
          <div className="studio-close-actions">
            <a href={START_URL} className="studio-btn">
              Create your site
            </a>
            <a href="/work" className="studio-btn studio-btn-ghost">
              See our work
            </a>
          </div>
        </section>
      </main>
    </AasaanWebShell>
  );
}
