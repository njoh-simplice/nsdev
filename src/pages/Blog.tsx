import { usePageMeta } from "../hooks/usePageMeta";
import BlogCard from "../features/blog/BlogCard";
import { getAllPosts } from "../features/blog/lib/posts";

const posts = getAllPosts();

export default function Blog() {
  usePageMeta("/blog");

  return (
    <section className="bg-brand-cream px-4 py-16 text-on-light sm:px-8 md:py-24">
      <h1 className="text-center font-display text-[1.75rem] font-bold uppercase leading-tight text-on-light md:text-[2.5rem]">
        Blog
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center font-body text-on-light-muted md:text-lg">
        Notes on web development, WordPress and SEO.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-center font-body text-on-light-muted md:text-lg">
          No posts yet — check back soon.
        </p>
      ) : (
        <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="flex">
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
