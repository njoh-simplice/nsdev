import { useEffect } from "react";
import {
  PAGE_META,
  SITE_KEYWORDS,
  SITE_OG_IMAGE,
  type PageMetaKey,
} from "../constants/pageMeta";
import {
  setDescription,
  setKeywords,
  setOgType,
  setSocialImage,
} from "../utils/headMeta";

/**
 * Applies a route's `<title>` / `<meta name="description">` on client-side
 * navigation. The same values are baked into the prerendered HTML at build
 * time (scripts/prerender.mjs), so this only matters once the SPA takes over.
 *
 * Also resets the tags blog posts override (keywords, og:image, og:type) back
 * to the site-wide defaults, so a post's values don't linger after navigating
 * away from it within the SPA.
 */
export function usePageMeta(route: PageMetaKey): void {
  useEffect(() => {
    const meta = PAGE_META[route];
    document.title = meta.title;
    setDescription(meta.description);
    setKeywords(SITE_KEYWORDS);
    setSocialImage(SITE_OG_IMAGE);
    setOgType("website");
  }, [route]);
}
