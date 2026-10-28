import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PostBody } from "@/components/PostBody";
import { formatDate, formatUpdatedDate, getPost, POSTS, postPath, readingMinutes } from "@/content/blog";
import { brand } from "@/lib/brand";
import { postFaqJsonLd } from "@/lib/schema";
import { appUrl, SITE_URL, siteUrl, X_HANDLE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = siteUrl(postPath(post.slug));
  return {
    title: post.seoTitle ?? post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.seoTitle ?? post.title,
      description: post.description,
      url: path,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.cover.src, width: post.cover.width, height: post.cover.height, alt: post.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      site: X_HANDLE,
      creator: X_HANDLE,
      title: post.seoTitle ?? post.title,
      description: post.description,
      images: [post.cover.src],
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const url = siteUrl(postPath(post.slug));
  const others = POSTS.filter((p) => p.slug !== post.slug);
  const faq = postFaqJsonLd(post.body, url);

  return (
    <main id="content" className="blog-page blog-post">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `${url}#article`,
              headline: post.title,
              description: post.description,
              image: siteUrl(post.cover.src),
              datePublished: post.date,
              dateModified: post.updated ?? post.date,
              author: { "@type": "Organization", name: post.author, url: SITE_URL },
              publisher: { "@id": `${SITE_URL}/#organization` },
              mainEntityOfPage: url,
              keywords: post.tags.join(", "),
              inLanguage: "en",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Blog", item: siteUrl("/blog") },
                { "@type": "ListItem", position: 3, name: post.title, item: url },
              ],
            },
            ...(faq ? [faq] : []),
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="muted blog-crumbs">
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link>
      </nav>
      <article>
        <header>
          <h1>{post.title}</h1>
          <p className="muted blog-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated && post.updated !== post.date ? (
              <>
                {" · "}
                <time dateTime={post.updated}>{`Updated ${formatUpdatedDate(post.updated)}`}</time>
              </>
            ) : null}{" "}
            · {post.author} ·{" "}
            {readingMinutes(post)} min read
          </p>
          <img
            className="blog-cover"
            src={post.cover.src}
            alt={post.cover.alt}
            width={post.cover.width}
            height={post.cover.height}
            fetchPriority="high"
          />
        </header>
        <PostBody body={post.body} />
      </article>
      <aside className="blog-cta">
        <h2>Try {brand.name} on your own project</h2>
        <p className="muted">
          Starter is free for one developer and one person who asks for changes.{" "}
          <Link href="/pricing">See pricing</Link>.
        </p>
        <a href={appUrl("/signup")} className="landing-btn primary" data-ga-location="blog_post_cta">
          Create a free workspace
        </a>
      </aside>
      {others.length > 0 && (
        <section className="blog-more" aria-labelledby="more-heading">
          <h2 id="more-heading">More from the blog</h2>
          <ul>
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={postPath(p.slug)}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
