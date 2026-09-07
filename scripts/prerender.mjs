/**
 * Build-time prerendering.
 *
 * `vite build` alone ships an empty `<div id="root"></div>`, which means every
 * crawler that doesn't execute JavaScript (GPTBot, PerplexityBot, ClaudeBot,
 * Bing's fallback path...) sees a blank page. This script renders each route
 * with React Router's static handler and writes real HTML files, so the site is
 * readable without JS. The client still hydrates and behaves as an SPA.
 *
 * Run after both builds — see the `build` script in package.json.
 */
// React and React Router pick their build (dev vs prod) from NODE_ENV at
// import time, so this has to be set before the dynamic import below.
process.env.NODE_ENV ??= "production";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const serverEntry = join(root, "dist-ssr", "entry-server.js");

const { render, PAGE_META, PRERENDER_ROUTES, SITE_URL } = await import(
  pathToFileURL(serverEntry).href
);

/** Routes that get a file but should stay out of search results. */
const NOINDEX_ROUTES = new Set(["/404"]);

const escapeAttribute = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Rewrites `<meta {attr}="{name}" content="..." />`, whitespace-tolerant. */
function setMeta(html, attr, name, value) {
  const pattern = new RegExp(
    `(<meta[^>]*${attr}="${name}"[^>]*content=")[^"]*(")`,
    "i",
  );
  if (!pattern.test(html)) {
    throw new Error(`Prerender: no <meta ${attr}="${name}"> in index.html`);
  }
  return html.replace(pattern, `$1${escapeAttribute(value)}$2`);
}

function buildDocument(template, route, appHtml) {
  const meta = PAGE_META[route];
  if (!meta) throw new Error(`Prerender: no PAGE_META entry for "${route}"`);

  const canonical = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;

  let html = template;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeAttribute(meta.title)}</title>`,
  );
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/i,
    `$1${escapeAttribute(canonical)}$2`,
  );

  html = setMeta(html, "name", "description", meta.description);
  html = setMeta(html, "property", "og:title", meta.title);
  html = setMeta(html, "property", "og:description", meta.description);
  html = setMeta(html, "property", "og:url", canonical);
  html = setMeta(html, "name", "twitter:title", meta.title);
  html = setMeta(html, "name", "twitter:description", meta.description);

  if (NOINDEX_ROUTES.has(route)) {
    html = html.replace(
      "</head>",
      '  <meta name="robots" content="noindex" />\n  </head>',
    );
  }

  const rootDiv = '<div id="root"></div>';
  if (!html.includes(rootDiv)) {
    throw new Error('Prerender: could not find <div id="root"></div>');
  }
  return html.replace(rootDiv, `<div id="root">${appHtml}</div>`);
}

/** "/" -> dist/index.html, "/projects" -> dist/projects/index.html. */
function outputPath(route) {
  if (route === "/") return join(distDir, "index.html");
  if (route === "/404") return join(distDir, "404.html");
  return join(distDir, route.slice(1), "index.html");
}

const template = await readFile(join(distDir, "index.html"), "utf8");

// The catch-all route renders <NotFound />; Cloudflare Pages serves
// dist/404.html (with a 404 status) for anything that has no file.
const routes = [...PRERENDER_ROUTES, "/404"];

for (const route of routes) {
  const appHtml = await render(route);
  const file = outputPath(route);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, buildDocument(template, route, appHtml), "utf8");
  console.log(`prerendered ${route.padEnd(16)} -> ${file.slice(root.length + 1)}`);
}
