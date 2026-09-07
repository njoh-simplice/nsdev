import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import matter from "gray-matter";

/**
 * Parse Markdown frontmatter at build time. `import x from "./post.md"` (and
 * `import.meta.glob` over `.md`) then yields `{ frontmatter, content }` — so
 * gray-matter and js-yaml stay in the build and never ship to the browser.
 */
function markdownFrontmatter(): Plugin {
  return {
    name: "markdown-frontmatter",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md")) return null;
      const { data, content } = matter(code);
      return {
        code:
          `export const frontmatter = ${JSON.stringify(data)};\n` +
          `export const content = ${JSON.stringify(content)};\n`,
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), markdownFrontmatter()],
});
