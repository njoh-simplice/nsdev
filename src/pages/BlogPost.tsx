import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NotFound from "./NotFound";
import { getPostBySlug, type BlogPost as Post } from "../features/blog/lib/posts";
import { formatPostDate } from "../features/blog/lib/formatDate";
import { markdownComponents } from "../features/blog/markdownComponents";
import { SITE_URL } from "../constants/pageMeta";
import {
  setDescription,
  setKeywords,
  setOgType,
  setSocialImage,
} from "../utils/headMeta";

const AUTHOR = { "@type": "Person", name: "Njoh Simplice Junior" } as const;

/**
 * BlogPosting + (when the post has FAQ frontmatter) FAQPage JSON-LD, so the
 * page is eligible for classic rich results and AI-answer citation. Baked into
 * the prerendered HTML via renderToString. `<` is escaped so the JSON can't
 * close the surrounding <script>.
 */
function articleSchema(post: Post): string {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const graph: unknown[] = [
    {
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      author: AUTHOR,
      publisher: AUTHOR,
      mainEntityOfPage: url,
      image: `${SITE_URL}${post.coverImage}`,
      datePublished: post.date,
      dateModified: post.date,
    },
  ];

  if (post.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  // Per-post <head>. Prerendering bakes the same values into the static HTML
  // (scripts/prerender.mjs); this keeps them right on client-side nav.
  // usePageMeta resets keywords / image / og:type when leaving for another route.
  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — Njoh Simplice Junior`;
    setDescription(post.excerpt);
    setKeywords(post.tags.join(", "));
    setSocialImage(`${SITE_URL}${post.coverImage}`);
    setOgType("article");
  }, [post]);

  if (!post) return <NotFound />;

  return (
    <section className="bg-brand-black px-4 py-16 text-on-dark sm:px-8 md:py-24">
      <article className="mx-auto max-w-[70ch]">
        <Link
          to="/blog"
          className="font-body text-sm text-on-dark underline decoration-on-dark-muted/50 underline-offset-2 hover:decoration-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark"
        >
          ← Back to Blog
        </Link>

        <img
          src={post.coverImage}
          alt={post.coverAlt}
          className="mt-6 aspect-[1200/554] w-full rounded-card object-cover"
        />

        <h1 className="mt-8 font-display text-[1.75rem] font-bold leading-tight text-on-dark md:text-[2.5rem]">
          {post.title}
        </h1>

        <p className="mt-3 font-body text-sm text-on-dark-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {post.tags.length > 0 && (
            <span> · {post.tags.join(", ")}</span>
          )}
        </p>

        <div className="mt-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: articleSchema(post) }}
        />
      </article>
    </section>
  );
}
