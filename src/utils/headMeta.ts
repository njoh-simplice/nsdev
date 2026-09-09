/**
 * Client-side `<head>` sync for SPA navigation. The prerendered HTML already
 * carries the right tags on first load (scripts/prerender.mjs); these keep them
 * correct after a client-side route change.
 */

/** Set a `<meta>` tag's `content`, matched by a CSS attribute selector. */
export function setMetaContent(selector: string, content: string): void {
  document.querySelector(selector)?.setAttribute("content", content);
}

export function setDescription(value: string): void {
  setMetaContent('meta[name="description"]', value);
}

export function setKeywords(value: string): void {
  setMetaContent('meta[name="keywords"]', value);
}

/** og:image + twitter:image share one URL. */
export function setSocialImage(url: string): void {
  setMetaContent('meta[property="og:image"]', url);
  setMetaContent('meta[name="twitter:image"]', url);
}

export function setOgType(value: string): void {
  setMetaContent('meta[property="og:type"]', value);
}
