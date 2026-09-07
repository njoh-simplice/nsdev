import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NotFound from "./NotFound";
import { getPostBySlug } from "../features/blog/lib/posts";
import { formatPostDate } from "../features/blog/lib/formatDate";
import { markdownComponents } from "../features/blog/markdownComponents";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  // Per-post <title> / description. Prerendering bakes the same values into the
  // static HTML (scripts/prerender.mjs); this keeps them right on client nav.
  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — Njoh Simplice Junior`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", post.excerpt);
  }, [post]);

  if (!post) return <NotFound />;

  return (
    <section className="bg-brand-cream px-4 py-16 text-on-light sm:px-8 md:py-24">
      <article className="mx-auto max-w-[70ch]">
        <Link
          to="/blog"
          className="font-body text-sm text-on-light underline decoration-on-light-muted/50 underline-offset-2 hover:decoration-on-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-light"
        >
          ← Back to Blog
        </Link>

        <img
          src={post.coverImage}
          alt={post.coverAlt}
          className="mt-6 aspect-[1200/554] w-full object-cover"
        />

        <h1 className="mt-8 font-display text-[1.75rem] font-bold leading-tight text-on-light md:text-[2.5rem]">
          {post.title}
        </h1>

        <p className="mt-3 font-body text-sm text-on-light-muted">
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
      </article>
    </section>
  );
}
