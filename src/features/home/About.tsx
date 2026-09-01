import portrait from "../../assets/images/njoh-simplice-junior-portrait.webp";
import webIntegrationImg from "../../assets/images/hoverAbout/Web-integration.webp";
import mobileDevelopmentImg from "../../assets/images/hoverAbout/mobile-development.webp";
import webDesignImg from "../../assets/images/hoverAbout/web-design.webp";
import seoSpecialistImg from "../../assets/images/hoverAbout/SEO-Specialist.webp";

// `rotate` is the tilt each hover preview settles into — a different angle per
// item so they don't feel stamped from one template. Full class strings (not
// interpolated fragments) so Tailwind's scanner picks them up.
const SPECIALTIES = [
  {
    label: "Web Integration",
    img: webIntegrationImg,
    rotate: "group-hover:-rotate-6",
    fit: "object-cover",
    shadow: "shadow-lg",
  },
  {
    label: "Mobile Development",
    img: mobileDevelopmentImg,
    rotate: "group-hover:rotate-3",
    // show the whole frame, not a crop — and no shadow on this one
    fit: "object-contain",
    shadow: "shadow-none",
  },
  {
    label: "Web Design",
    img: webDesignImg,
    rotate: "group-hover:-rotate-2",
    fit: "object-cover",
    shadow: "shadow-lg",
  },
  {
    label: "SEO Specialist",
    img: seoSpecialistImg,
    rotate: "group-hover:rotate-6",
    fit: "object-cover",
    shadow: "shadow-lg",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-brand-cream px-4 py-8 text-on-light sm:px-8 md:py-24"
    >
      <div className="grid gap-10 md:grid-cols-[9fr_11fr] md:items-end md:gap-14">
        {/* Left: text, bottom-aligned against the photo column on desktop */}
        <div>
          <h2 className="font-display text-[1.75rem] font-bold uppercase leading-tight text-on-light md:text-[2.5rem]">
            Knowing Me Better
          </h2>
          <p className="mt-4 max-w-[65ch] font-body text-on-light-muted md:mt-6 md:text-lg">
            I turn ideas into fast, functional websites. Over the past 2 years,
            I&rsquo;ve helped clients across France and Cameroon launch and
            revamp their online presence, from Figma mockup to live site,
            usually in under two weeks. My proudest win so far: taking a
            client&rsquo;s organic traffic from ~200 to nearly +200,000 monthly
            impressions and from ~7 to +2000 clics. I work remotely, communicate
            clearly, and I&rsquo;m always looking for ways to make a project
            better before you even ask.
          </p>
        </div>

        {/* Right: photo + specialty list (stacks below the text on mobile) */}
        <div>
          <img
            src={portrait}
            alt="Portrait of Njoh Simplice Junior"
            loading="lazy"
            className="aspect-[2/1] w-full rounded-[8px] object-cover grayscale transition duration-500 hover:grayscale-0"
          />
          <ul className="mt-6">
            {SPECIALTIES.map(({ label, img, rotate, fit, shadow }) => (
              <li
                key={label}
                className="group relative border-b border-on-light-muted/30 py-4 font-display text-lg font-bold text-on-light md:text-xl"
              >
                {label}
                {/* Preview shown on hover of this specialty — decorative.
                    Fades in, grows ~33%, and settles at its per-item tilt. */}
                <img
                  src={img}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className={`pointer-events-none absolute right-0 top-1/2 h-16 w-24 origin-right -translate-y-1/2 rounded-md opacity-0 transition duration-300 group-hover:scale-[2.1] group-hover:opacity-100 ${fit} ${shadow} ${rotate}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
