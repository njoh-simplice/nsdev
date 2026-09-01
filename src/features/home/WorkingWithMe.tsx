import glow from "../../assets/images/working-with-me-background.png";
import HighlightText from "../../components/ui/HighlightText";

const STEPS = [
  {
    n: 1,
    title: "Discovery",
    description: "Understanding your goals, brand, and target audience",
    active: true,
  },
  {
    n: 2,
    title: "Design",
    description: "Wireframes and Figma mockup for your approval",
    active: false,
  },
  {
    n: 3,
    title: "Build",
    description:
      "Bringing it to life, whether it's a website, web app, or mobile app",
    active: false,
  },
  {
    n: 4,
    title: "Launch & Support",
    description: "Going live, plus ongoing maintenance and updates",
    active: false,
  },
];

/** Current-step marker: a filled four-point sparkle, brand-lime, larger. */
function SparkleMarker() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="size-7 text-brand-lime"
    >
      <path
        fill="currentColor"
        d="M16 0c1 9 6 14 16 16-10 2-15 7-16 16-1-9-6-14-16-16C10 14 15 9 16 0z"
      />
    </svg>
  );
}

/** Upcoming-step marker: a small muted diamond. */
function DiamondMarker() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-3 text-on-dark-muted"
    >
      <path fill="currentColor" d="M8 0l8 8-8 8-8-8z" />
    </svg>
  );
}

export default function WorkingWithMe() {
  return (
    <section
      id="working-with-me"
      className="relative isolate overflow-hidden bg-brand-black px-4 py-8 text-on-dark sm:px-8 md:py-16"
    >
      {/* Decorative glow: full-section layer, whole image shown (contain, not
          cover), pinned to the top-right corner. */}
      <img
        src={glow}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 size-full select-none object-contain object-top-right"
      />

      {/* 1. Heading */}
      <h2 className="text-center font-display text-[1.75rem] font-bold uppercase leading-tight text-on-dark md:text-[2.5rem]">
        <HighlightText>Working</HighlightText> with Me
      </h2>

      {/* 2. Intro */}
      <p className="mx-auto mt-4 max-w-base text-center font-body text-on-dark-muted md:text-lg">
        From first idea to live product, here&rsquo;s how we&rsquo;ll get there.
      </p>

      {/* 3. Stepper connector (horizontal layout only) */}
      <div className="relative mt-12 hidden h-7 md:block">
        <div
          aria-hidden="true"
          className="absolute inset-x-[12.5%] top-1/2 h-px -translate-y-1/2 bg-on-dark-muted/20"
        />
        <div className="relative grid h-full grid-cols-4 gap-4">
          {STEPS.map((step) => (
            <div key={step.n} className="flex items-center justify-center">
              {step.active ? <SparkleMarker /> : <DiamondMarker />}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Step cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-4 md:grid-cols-4">
        {STEPS.map((step) => (
          <div
            key={step.n}
            className={`flex flex-col items-center justify-center rounded-card p-6 text-center ${
              step.active
                ? "bg-brand-mint text-on-light"
                : "bg-brand-charcoal text-on-dark"
            }`}
          >
            <span className="font-script text-sm md:text-base">
              Step {step.n}
            </span>
            <span className="mt-2 font-display text-base font-bold uppercase md:text-xl">
              {step.title}
            </span>
            <span className="sr-only">{step.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
