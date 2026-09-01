import { useEffect } from "react";

/**
 * Per-route `<title>` and `<meta name="description">`. This is a client-only
 * SPA (no SSR), so both are updated on navigation. Every page passes explicit
 * values; `index.html` holds the crawl-time defaults for `/`.
 */
export function usePageMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);
}
