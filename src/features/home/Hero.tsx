import {
  FaInstagram,
  FaLinkedinIn,
  FaThreads,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import Button from "../../components/ui/Button";
import HighlightText from "../../components/ui/HighlightText";
import lionPhoto from "../../assets/images/njoh-simplice-junior-lion-statue-cameroon.webp";
import hikingPhoto from "../../assets/images/njoh-simplice-junior-hiking-trail-cameroon.webp";
import sparkle from "../../assets/images/sparkle-accent.webp";
import heroBg from "../../assets/images/hero-background.png";

const HIKING_ALT =
  "Njoh Simplice Junior hiking on a rocky trail overlooking a lush green valley in Cameroon";
const LION_ALT =
  "Njoh Simplice Junior standing arms outstretched in front of a monumental lion statue in Cameroon";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/njoh_simplice",
    Icon: FaInstagram,
  },
  { label: "X (Twitter)", href: "https://x.com/njoh_simplice", Icon: FaXTwitter },
  {
    label: "Threads",
    href: "https://www.threads.com/@njoh_simplice",
    Icon: FaThreads,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@njoh_simplice",
    Icon: FaTiktok,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/njoh-simplice-junior",
    Icon: FaLinkedinIn,
  },
];

const frameClass =
  "shrink-0 rounded-card bg-brand-cream p-1.5 shadow-xl transition duration-500 hover:scale-105";
const photoClass =
  "aspect-3/4 w-full rounded-[11px] object-cover grayscale transition duration-500 group-hover:grayscale-0";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-10 pb-16 text-center sm:px-8 md:pt-16">
      {/* Hero background image + legibility scrim (tune / drop the scrim as needed).
          <img> never tiles, so there's nothing to "no-repeat". object-contain keeps
          the art un-cropped and un-stretched; anchored bottom-left. */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-none object-bottom-left"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-brand-black/40"
      />

      {/* 1. Headline */}
      <h1 className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-4xl font-bold leading-tight text-on-dark sm:text-5xl md:text-8xl">
        <span className="font-script font-normal">Hey, I&rsquo;m</span>
        <span>NJOH</span>
        <HighlightText>SIMPLICE</HighlightText>
        <span>JUNIOR</span>
      </h1>

      {/* 2. Subtext */}
      <p className="mx-auto mt-5 max-w-3xl font-body text-on-dark-muted md:text-lg">
        I am a Software developer and content creator
        <span className="font-script text-[0.85em] text-brand-lime">
          {" "}
          (at night)
        </span>
        . I craft website and mobile apps that align with your brand and engage
        your audience
      </p>

      {/* 3. Buttons — secondary first (left), primary second (right) */}
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button variant="secondary" href="#projects">
          View my recent projets
        </Button>
        <Button>Get in touch</Button>
      </div>

      {/* 4 & 5. Photo collage + sparkles */}
      <div className="relative mx-auto mt-14 flex max-w-4xl items-start justify-center">
        <img
          src={sparkle}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 left-0 w-7 md:-left-6 md:top-0 md:w-20"
        />
        <img
          src={sparkle}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 right-0 w-7 md:-right-6 md:w-20"
        />

        {/* Left card */}
        <div
          className={`${frameClass} group z-10 -mr-[12%] w-[40%] origin-top -rotate-6 hover:z-30 md:-mr-[3%] md:w-[32%] md:-rotate-[9deg]`}
        >
          <img
            src={hikingPhoto}
            alt={HIKING_ALT}
            loading="lazy"
            className={photoClass}
          />
        </div>

        {/* Center card */}
        <div
          className={`${frameClass} group z-20 w-[44%] shadow-2xl hover:z-30 md:w-[38%]`}
        >
          <img
            src={lionPhoto}
            alt={LION_ALT}
            loading="lazy"
            className={photoClass}
          />
        </div>

        {/* Right card — TODO: replace with a real third photo. For now the hiking
            shot mirrored; decorative (alt="") since it repeats an image already
            described on the left card. */}
        <div
          className={`${frameClass} group z-10 -ml-[12%] w-[40%] origin-top rotate-6 hover:z-30 md:-ml-[3%] md:w-[32%] md:rotate-[9deg]`}
        >
          <img
            src={hikingPhoto}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={`${photoClass} -scale-x-100`}
          />
        </div>
      </div>

      {/* 6. Follow me + social icons */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-on-dark-muted">
          Follow me :
        </span>
        <ul className="flex items-center gap-4">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="flex size-10 items-center justify-center rounded-[8px] bg-brand-cream text-brand-black transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
