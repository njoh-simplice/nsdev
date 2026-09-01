import { Link, NavLink } from "react-router-dom";
import SocialLinks from "../ui/SocialLinks";
import { NAV_ITEMS } from "../../constants/nav";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "font-body text-sm uppercase tracking-wide transition-opacity",
    "rounded-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-light",
    isActive
      ? "font-semibold text-on-light underline underline-offset-4 decoration-2"
      : "text-on-light-muted hover:text-on-light",
  ].join(" ");

function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

export default function Footer() {
  return (
    <footer className="@container overflow-hidden bg-brand-cream py-8 text-on-light">
      {/* 1. Nav + back-to-top */}
      <div className="flex flex-col items-center gap-4 px-4 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-x-6 sm:gap-y-4 sm:px-8">
        <nav>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV_ITEMS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className={navLinkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-lime text-on-light transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-light"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="size-5"
          >
            <path
              d="M12 19V5M12 5l-6 6M12 5l6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 2. Divider */}
      <hr className="mx-4 my-3 border-t border-on-light-muted/25 sm:mx-8 sm:my-6" />

      {/* 3. Full-bleed wordmark — real HTML text, fluid size so it fills the
          width at every breakpoint instead of wrapping or overflowing.
          pointer-events-none: at large sizes the glyph ink overflows the
          `leading-none` line box and was intercepting clicks meant for the nav
          row above it — this is purely decorative text, it shouldn't capture
          pointer events at all. Padded on mobile only; full-bleed from sm: up. */}
      <p className="pointer-events-none whitespace-nowrap px-1 text-center font-display text-[max(2.5rem,20cqi)] font-bold uppercase leading-none tracking-tight text-on-light sm:px-0 sm:text-[max(2.5rem,24cqi)]">
        SIMPLICE
      </p>

      {/* 4. Legal + socials */}
      <div className="mt-3 flex flex-col items-center gap-4 px-4 sm:mt-6 sm:flex-row sm:justify-between sm:px-8">
        <Link
          to="/legal-mentions"
          className="font-body text-xs lowercase text-on-light-muted transition-opacity hover:text-on-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-light"
        >
          legal mentions
        </Link>
        <SocialLinks variant="outline" />
      </div>
    </footer>
  );
}
