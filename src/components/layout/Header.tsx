import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Coffee, Menu, X } from "lucide-react";
import AnimatedLogo from "../ui/AnimatedLogo";
import Button from "../ui/Button";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects", end: false },
  { to: "/blog", label: "Blog", end: false },
  { to: "/contact", label: "Contact", end: false },
];

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
      {NAV_LINKS.map(({ to, label, end }) => (
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

  // Close the mobile menu on route change...
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ...and on Escape while it's open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="bg-brand-cream mx-2.5 mt-2 rounded-sm">
      <nav className="flex items-center justify-between px-3 py-3">
        <Link to="/" aria-label="NSDEV home" className={focusRing}>
          <AnimatedLogo className="w-12 md:w-16 rounded-sm" />
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

      {/* Mobile: expanded menu */}
      {menuOpen && (
        <div id="mobile-menu" className="px-3 pb-4 md:hidden">
          <NavItems
            className="flex flex-col gap-3 text-brand-black"
            onNavigate={() => setMenuOpen(false)}
          />
          <CoffeeButton className="mt-4 w-full" />
        </div>
      )}
    </header>
  );
}
