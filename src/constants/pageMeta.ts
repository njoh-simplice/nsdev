export interface PageMeta {
  title: string;
  description: string;
}

export const SITE_URL = "https://nsdev.me";

/**
 * Per-route `<title>` / `<meta name="description">`.
 *
 * Single source of truth: `usePageMeta` applies these on client-side
 * navigation, and scripts/prerender.mjs bakes them into each prerendered HTML
 * file so crawlers get them without running JS.
 */
export const PAGE_META = {
  "/": {
    title:
      "Njoh Simplice Junior | Software Developer & WordPress/SEO Specialist",
    description:
      "Njoh Simplice Junior, freelance software developer and WordPress/SEO specialist in Yaoundé, Cameroon. Websites and web/mobile apps from Figma mockup to live site, usually in under two weeks.",
  },
  "/projects": {
    title: "Projects | Njoh Simplice Junior",
    description:
      "Websites, web apps and mobile apps delivered by Njoh Simplice Junior for clients in Cameroon and France.",
  },
  "/blog": {
    title: "Blog | Njoh Simplice Junior",
    description:
      "Articles and notes from Njoh Simplice Junior on web development, WordPress and SEO. Nothing published yet.",
  },
  "/contact": {
    title: "Contact | Njoh Simplice Junior",
    description:
      "Get in touch with Njoh Simplice Junior — email contact@nsdev.me, phone +237 652 02 59 01, based in Yaoundé, Cameroon.",
  },
  "/legal-mentions": {
    title: "Legal Mentions | Njoh Simplice Junior",
    description:
      "Legal information for nsdev.me: site editor, hosting, intellectual property, personal data and cookies.",
  },
  "/404": {
    title: "Page Not Found | Njoh Simplice Junior",
    description: "The page you're looking for doesn't exist or has moved.",
  },
} as const satisfies Record<string, PageMeta>;

export type PageMetaKey = keyof typeof PAGE_META;

/** Routes prerendered to static HTML at build time (see scripts/prerender.mjs). */
export const PRERENDER_ROUTES = [
  "/",
  "/projects",
  "/blog",
  "/contact",
  "/legal-mentions",
] as const;
