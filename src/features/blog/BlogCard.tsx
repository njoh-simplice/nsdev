import { Link } from "react-router-dom";
import type { BlogPost } from "./lib/posts";
import { formatPostDate } from "./lib/formatDate";

/**
 * Listing card for one post. Same visual family as the Featured Projects card —
 * dark panel on a light section, full-colour image — but square-cornered and
 * with the post's date and excerpt instead of a project type + button.
 */
export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="h-full rounded-card bg-brand-charcoal p-2">
      <Link
        to={`/blog/${post.slug}`}
        className="flex h-full flex-col rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark"
      >
        <img
          src={post.coverImage}
          alt={post.coverAlt}
          loading="lazy"
          className="aspect-[1200/554] w-full rounded-lg object-cover"
        />
        <div className="mt-4 flex flex-1 flex-col px-1 pb-1">
          <h2 className="font-body text-lg font-semibold text-on-dark">
            {post.title}
          </h2>
          <time
            dateTime={post.date}
            className="mt-1 font-body text-sm text-on-dark-muted"
          >
            {formatPostDate(post.date)}
          </time>
          <p className="mt-3 font-body text-on-dark-muted">{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
