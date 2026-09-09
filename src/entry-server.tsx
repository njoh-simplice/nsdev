// This module is only ever loaded by Node during the build (scripts/prerender.mjs),
// never by the browser, so the Fast Refresh "components only" rule doesn't apply.
/* eslint-disable react/only-export-components */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom";
import { routes } from "./routes";
import { SITE_URL } from "./constants/pageMeta";

const handler = createStaticHandler(routes);

/**
 * Renders one route to an HTML string at build time.
 *
 * Consumed by scripts/prerender.mjs, which injects the result into the Vite
 * template so crawlers (and AI agents) that don't execute JavaScript still get
 * the full page content. The client then hydrates the same markup.
 */
export async function render(pathname: string): Promise<string> {
  const context = await handler.query(new Request(SITE_URL + pathname));

  if (context instanceof Response) {
    throw new Error(
      `Prerendering "${pathname}" returned a ${context.status} Response ` +
        `instead of a render context.`,
    );
  }

  const router = createStaticRouter(handler.dataRoutes, context);

  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </StrictMode>,
  );
}

export {
  PAGE_META,
  PRERENDER_ROUTES,
  SITE_URL,
} from "./constants/pageMeta";

// Re-exported for scripts/prerender.mjs and scripts/generate-sitemap.mjs, which
// run under plain Node and can't use the `import.meta.glob` inside posts.ts —
// but they can import it from this Vite-bundled SSR entry.
export { getAllPosts } from "./features/blog/lib/posts";
