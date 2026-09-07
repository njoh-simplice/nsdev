/**
 * A single blog post: parsed frontmatter plus the raw Markdown body.
 *
 * Source of truth is one `.md` file per post in `src/content/blog/`. The
 * `markdown-frontmatter` Vite plugin (vite.config.ts) parses each file at build
 * time into `{ frontmatter, content }`, so this list is fully static — it works
 * in the client bundle and in the SSR bundle the prerenderer loads, with no
 * runtime parsing and no gray-matter shipped to the browser.
 */
export interface BlogPost {
  /** URL segment after `/blog/`, e.g. `hello-world` -> `/blog/hello-world`. */
  slug: string;
  title: string;
  /** ISO 8601 date, e.g. `2026-08-28`. */
  date: string;
  /** 1–2 sentences. Shown on the listing card and used as the meta description. */
  excerpt: string;
  /** Path under `public/`, e.g. `/images/blog/cover.webp`. */
  coverImage: string;
  coverAlt: string;
  tags: string[];
  /** Markdown body (frontmatter stripped). Rendered with react-markdown. */
  content: string;
}

const REQUIRED_STRING_FIELDS = [
  "title",
  "slug",
  "date",
  "excerpt",
  "coverImage",
  "coverAlt",
] as const;

interface MarkdownModule {
  frontmatter: Record<string, unknown>;
  content: string;
}

/** Every `.md` under src/content/blog, frontmatter pre-parsed by the Vite plugin. */
const modules = import.meta.glob<MarkdownModule>("/src/content/blog/*.md", {
  eager: true,
});

function parsePost(path: string, mod: MarkdownModule): BlogPost {
  const data = mod.frontmatter;

  for (const field of REQUIRED_STRING_FIELDS) {
    const value = data[field];
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(
        `Blog post "${path}" is missing required frontmatter field "${field}".`,
      );
    }
  }

  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag: unknown) => String(tag))
    : [];

  return {
    slug: data.slug as string,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    coverImage: data.coverImage as string,
    coverAlt: data.coverAlt as string,
    tags,
    content: mod.content,
  };
}

const posts: BlogPost[] = Object.entries(modules).map(([path, mod]) =>
  parsePost(path, mod),
);

const seen = new Set<string>();
for (const post of posts) {
  if (seen.has(post.slug)) {
    throw new Error(`Duplicate blog post slug "${post.slug}".`);
  }
  seen.add(post.slug);
}

/** Every post, newest first. */
export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** One post by its slug, or `undefined` if nothing matches. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
