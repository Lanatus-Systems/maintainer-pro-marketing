import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { formatDate, POSTS, postPath, readingMinutes } from "@/content/blog";
import { brand } from "@/lib/brand";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";
import { siteUrl } from "@/lib/site";

const title = "Blog";
const description = `Notes from the ${brand.name} team on AI coding with a human in the loop, live previews, and getting change requests from the product team to the project.`;

export const metadata: Metadata = pageMeta({
  title,
  description,
  path: "/blog",
  // Neutral site card: the newest post's cover would make every share of the index look like that post.
  image: "/og.png",
  imageAlt: `${brand.name} blog`,
});

export default function BlogIndex() {
  return (
    <main id="content" className="blog-page">
      <JsonLd data={breadcrumbJsonLd(title, "/blog")} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${brand.name} blog`,
          url: siteUrl("/blog"),
          blogPost: POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: siteUrl(postPath(p.slug)),
            datePublished: p.date,
          })),
        }}
      />
      <p className="legal-kicker">Blog</p>
      <h1>Notes from the {brand.name} team</h1>
      <p className="landing-section-lead">
        How product teams hand change requests to AI, and why a developer still decides what goes
        live. <a href="/blog/rss.xml">RSS feed</a>.
      </p>
      <ul className="blog-list">
        {POSTS.map((post) => (
          <li key={post.slug} className="blog-card">
            <Link href={postPath(post.slug)} className="blog-card-link">
              <img
                src={post.cover.src}
                alt={post.cover.alt}
                width={post.cover.width}
                height={post.cover.height}
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="muted blog-meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingMinutes(post)} min read
                </p>
                <h2>{post.title}</h2>
                <p className="muted">{post.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
