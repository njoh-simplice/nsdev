import portrait from "../../assets/images/work-illustration.webp";
import {
  DiamondMarker,
  SparkleMarker,
} from "../../components/ui/TimelineMarker";

const PORTRAIT_ALT =
  "Portrait of Njoh Simplice Junior, software developer and webmaster";

const OCCUPATIONS = [
  {
    role: "Webmaster | Valione Services",
    dates: "May 2025 – Now",
    description:
      "Delivered multiple full WordPress sites end-to-end — from Figma mockup to launch — in under two weeks each. Led UX/UI redesigns for 2 platforms and drove a +300x increase in organic traffic for one client through SEO and Core Web Vitals optimization.",
  },
  {
    role: "Web Developer | DONSYL Agency",
    dates: "February 2025 – May 2025",
    description:
      "Built a WordPress site from the ground up, from client brief to final delivery. Modernized two additional sites, improving navigation and mobile responsiveness.",
  },
  {
    role: "Web Developer (Academic Internship) | Groupe Fadjeu",
    dates: "June 2024 – September 2024",
    description:
      "Built Le Point Express, a delivery management app, with a React.js front-end and Laravel back-end — including 3 user interfaces and real-time GPS tracking.",
  },
];

export default function WorkExperience() {
  return (
    <section
      id="work-experience"
      className="bg-brand-black px-4 py-16 text-on-dark sm:px-8 md:py-24"
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: photo + heading + intro */}
        <div>
          <img
            src={portrait}
            alt={PORTRAIT_ALT}
            loading="lazy"
            className="aspect-[2/1] w-full rounded-[8px] object-cover grayscale"
          />
          <h2 className="mt-6 text-center md:text-left font-display text-[1.75rem] font-bold uppercase leading-tight text-on-dark md:text-[2.5rem]">
            Work Experience
          </h2>
          <p className="mt-4 text-center md:text-left max-w-prose font-body text-on-dark-muted md:text-lg">
            Two years of turning client briefs into live, working products,
            here&rsquo;s where that experience comes from.
          </p>
        </div>

        {/* Right: vertical timeline */}
        <ol className="relative space-y-12 md:space-y-16">
          {/* connector line */}
          <div
            aria-hidden="true"
            className="absolute left-3 top-2 -bottom-4 w-px bg-on-dark-muted/20 md:left-4"
          />

          {OCCUPATIONS.map((occ, index) => (
            <li key={occ.role} className="relative flex gap-4 md:gap-6">
              <span className="relative z-10 flex w-6 shrink-0 justify-center md:w-8">
                {index === 0 ? <SparkleMarker /> : <DiamondMarker />}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold uppercase leading-tight text-on-dark md:text-2xl">
                  {occ.role}
                </h3>
                <p className="mt-1 text-sm text-on-dark-muted">{occ.dates}</p>
                <p className="mt-3 max-w-prose font-body text-on-dark-muted md:text-lg">
                  {occ.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
