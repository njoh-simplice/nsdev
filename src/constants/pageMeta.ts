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
    title: "Njoh Simplice Junior",
    description:
      "I am a Software developer and content creator. I craft websites and mobile apps that align with your brand and engage your audience.",
  },
  "/about": {
    title: "About",
    description:
      "Who is Njoh Simplice Junior? A software developer, WordPress integrator and SEO specialist in Yaoundé, Cameroon, working remotely with clients across Cameroon, France and internationally.",
  },
  "/projects": {
    title: "Projects",
    description:
      "Websites, web apps and mobile apps delivered by Njoh Simplice Junior for clients in Cameroon and France.",
  },
  "/blog": {
    title: "Blog",
    description:
      "Articles and notes from Njoh Simplice Junior on web development, WordPress and SEO. Nothing published yet.",
  },
  "/contact": {
    title: "Contact",
    description:
      "Get in touch with Njoh Simplice Junior — email contact@nsdev.me, phone +237 652 02 59 01, based in Yaoundé, Cameroon.",
  },
  "/legal-mentions": {
    title: "Legal Mentions",
    description:
      "Legal information for nsdev.me: site editor, hosting, intellectual property, personal data and cookies.",
  },
  "/404": {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has moved.",
  },
} as const satisfies Record<string, PageMeta>;

export type PageMetaKey = keyof typeof PAGE_META;

/** Routes prerendered to static HTML at build time (see scripts/prerender.mjs). */
export const PRERENDER_ROUTES = [
  "/",
  "/about",
  "/projects",
  "/blog",
  "/contact",
  "/legal-mentions",
] as const;
