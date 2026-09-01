import { usePageMeta } from "../hooks/usePageMeta";

// Real blog content is not modelled yet. When it is, type posts with
// `BlogPost` from src/types/blog.ts and render a list here instead of the
// empty state below.
export default function Blog() {
  usePageMeta(
    "Blog | Njoh Simplice Junior",
    "Articles and notes from Njoh Simplice Junior on web development, WordPress and SEO. Nothing published yet.",
  );

  return (
    <section className="flex min-h-full flex-col items-center justify-center bg-brand-black px-4 py-16 text-center text-on-dark sm:px-8 md:py-24">
      <h1 className="font-display text-[1.75rem] font-bold uppercase leading-tight md:text-[2.5rem]">
        Blog
      </h1>
      <p className="mt-3 font-body text-on-dark-muted md:text-lg">
        No articles yet — check back soon.
      </p>
    </section>
  );
}
