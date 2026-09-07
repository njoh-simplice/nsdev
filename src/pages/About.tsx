import Button from "../components/ui/Button";
import { LINKEDIN_URL } from "../constants/socials";
import { SITE_URL } from "../constants/pageMeta";
import { usePageMeta } from "../hooks/usePageMeta";

/* ------------------------------------------------------------------ */
/* Content                                                            */
/* ------------------------------------------------------------------ */

const SPECIALTIES = [
  {
    term: "Web Integration",
    detail: "WordPress, Elementor Pro, ACF, custom theme building",
  },
  {
    term: "Mobile Development",
    detail:
      "React.js front-ends with Laravel back-ends, including real-time features like GPS tracking",
  },
  {
    term: "Web Design",
    detail: "Figma-to-live-site workflows, UX/UI redesigns",
  },
  {
    term: "SEO",
    detail:
      "technical audits, on-page optimization, Core Web Vitals, GA4 tracking setup",
  },
];

const TECHNOLOGIES = [
  "WordPress",
  "Elementor Pro",
  "ACF",
  "HTML5",
  "CSS3",
  "JavaScript",
  "PHP",
  "React",
  "TypeScript",
  "Laravel",
  "MySQL",
  "Figma",
  "Framer",
  "Git/GitHub",
  "Google Analytics 4",
];

const SERVICES = [
  "WordPress website design & development",
  "UX/UI redesign",
  "SEO audits & on-page optimization",
  "Web & mobile application development",
  "Ongoing site maintenance & support",
];

/**
 * Structured data for this page. Escaping `<` keeps the JSON from being able
 * to close the surrounding <script> tag — belt and braces on static content.
 */
const PERSON_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Njoh Simplice Junior",
  url: `${SITE_URL}/about`,
  jobTitle: "Software Developer & WordPress/SEO Specialist",
  email: "contact@nsdev.me",
  telephone: "+237652025901",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yaoundé",
    addressCountry: "CM",
  },
  sameAs: [LINKEDIN_URL],
}).replace(/</g, "\\u003c");

/* ------------------------------------------------------------------ */
/* Shared classes                                                     */
/* ------------------------------------------------------------------ */

const headingClass = "font-display text-xl font-bold text-on-dark md:text-2xl";
const bodyClass = "font-body text-on-dark-muted md:text-lg";
const listClass = `mt-4 list-disc space-y-2 pl-5 ${bodyClass}`;
const termClass = "font-semibold text-on-dark";
const linkClass =
  "underline decoration-on-dark-muted/40 underline-offset-2 hover:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark";

/* ------------------------------------------------------------------ */

export default function About() {
  usePageMeta("/about");

  return (
    <div className="bg-brand-black px-4 py-16 text-on-dark sm:px-8 md:py-16">
      {/* Full-bleed like the Projects page — same section padding, no inner
          max-width container. */}
      <article>
        <section className="mt-2">
          <h1 className="font-display text-[1.75rem] font-bold leading-tight text-on-dark md:text-[2.5rem]">
            Who is Njoh Simplice Junior?
          </h1>
          <p className={`mt-4 ${bodyClass}`}>
            Njoh Simplice Junior is a software developer, WordPress integrator,
            and SEO specialist based in Yaound&eacute;, Cameroon. Over the past
            two years he has designed, built, and revamped websites for clients
            across France and Cameroon, taking projects from a Figma mockup to a
            live, working site in under two weeks. His most notable result:
            growing a client&rsquo;s organic search from ~200 to nearly +200,000
            monthly impressions and from ~7 to +2000 clics through SEO and Core
            Web Vitals optimization. He works remotely, communicates directly
            with clients throughout each project, and pairs technical execution
            with a focus on measurable outcomes.
          </p>
        </section>

        <section className="mt-10">
          <h2 className={headingClass}>What does he specialize in?</h2>
          <ul className={listClass}>
            {SPECIALTIES.map(({ term, detail }) => (
              <li key={term}>
                <span className={termClass}>{term}</span> : {detail}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className={headingClass}>Technologies</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {TECHNOLOGIES.map((tech) => (
              <li
                key={tech}
                className="rounded-button border border-on-dark-muted/30 bg-brand-charcoal px-3 py-1 font-body text-sm text-on-dark"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className={headingClass}>Services</h2>
          <ul className={listClass}>
            {SERVICES.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className={headingClass}>Location</h2>
          <p className={`mt-4 ${bodyClass}`}>
            Based in Yaound&eacute;, Cameroon. Works remotely with clients
            across Cameroon, France, and internationally.
          </p>
        </section>

        <section className="mt-10">
          <h2 className={headingClass}>Contact</h2>
          <ul className={`mt-4 space-y-2 ${bodyClass}`}>
            <li>
              Email:{" "}
              <a href="mailto:contact@nsdev.me" className={linkClass}>
                contact@nsdev.me
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+237652025901" className={linkClass}>
                +237 652 02 59 01
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                linkedin.com/in/njoh-simplice-junior
              </a>
            </li>
          </ul>

          <Button variant="primary" to="/contact" className="mt-6">
            Get in touch
          </Button>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: PERSON_SCHEMA }}
        />
      </article>
    </div>
  );
}
