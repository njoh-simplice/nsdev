import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Coffee, Menu, X } from "lucide-react";
import AnimatedLogo from "../ui/AnimatedLogo";
import Button from "../ui/Button";
import { NAV_ITEMS } from "../../constants/nav";

// Nav sits on the cream bar (brand-cream) floating on the dark shell, so state
// uses the on-light text tokens from DESIGN.md (on-light / on-light-muted).
// Brand greens are intentionally not used for nav text.
const focusRing =
  "rounded-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-light";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "font-body text-base transition-opacity",
    focusRing,
    isActive
      ? "text-on-light font-semibold underline underline-offset-8 decoration-2"
      : "text-on-light-muted hover:text-on-light",
  ].join(" ");

function NavItems({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className={className}>
      {NAV_ITEMS.map(({ to, label, end }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={end}
            className={navLinkClass}
            onClick={onNavigate}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

const CoffeeButton = ({ className }: { className?: string }) => (
  <Button
    variant="secondary"
    icon={<Coffee className="size-[1.15em]" />}
    className={className}
  >
    Buy me a coffee
  </Button>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // While the mobile menu is open: Escape closes it, and the page behind it
  // stops scrolling.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-2 z-50 mx-2.5 mt-2 rounded-sm bg-brand-cream">
      <nav className="relative z-50 flex items-center justify-between rounded-sm bg-brand-cream px-3 py-3">
        <Link to="/" aria-label="NSDEV home" className={focusRing}>
          <AnimatedLogo className="w-12 rounded-sm md:w-16" />
        </Link>

        {/* Desktop: full nav inline */}
        <div className="hidden items-center gap-10 md:flex">
          <NavItems className="flex items-center gap-6 text-brand-black" />
          <CoffeeButton />
        </div>

        {/* Mobile: hamburger toggle */}
        <button
          type="button"
          className={`inline-flex items-center justify-center p-2 text-on-light md:hidden ${focusRing}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile: menu overlays the page (absolute, so it doesn't push content);
          the page behind is dimmed and scroll-locked. */}
      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default bg-brand-black/40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-50 mt-2 rounded-sm bg-brand-cream p-6 shadow-xl md:hidden"
          >
            <NavItems
              className="flex flex-col gap-4 text-brand-black"
              onNavigate={() => setMenuOpen(false)}
            />
            <CoffeeButton className="mt-6 w-full" />
          </div>
        </>
      )}
    </header>
  );
}
