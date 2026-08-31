/**
 * Shape of a blog post. Stub — no content model / pipeline exists yet.
 * Adjust the fields when real blog content is wired up (see src/pages/Blog.tsx).
 */
export interface BlogPost {
  /** URL segment, e.g. "hello-world" -> /blog/hello-world */
  slug: string;
  title: string;
  /** Short summary shown in the post list. */
  excerpt: string;
  /** ISO 8601 date, e.g. "2026-08-31". */
  publishedAt: string;
  /** Full body. Format (markdown / MDX / HTML) is TBD with the content pipeline. */
  body: string;
  tags?: string[];
}
