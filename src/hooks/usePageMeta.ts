import { useEffect } from "react";
import { PAGE_META, type PageMetaKey } from "../constants/pageMeta";

/**
 * Applies a route's `<title>` / `<meta name="description">` on client-side
 * navigation. The same values are baked into the prerendered HTML at build
 * time (scripts/prerender.mjs), so this only matters once the SPA takes over.
 */
export function usePageMeta(route: PageMetaKey): void {
  useEffect(() => {
    const meta = PAGE_META[route];
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
  }, [route]);
}
