import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { SOCIAL_LINKS, type SocialLink } from "../../constants/socials";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

const MAX_SCALE = 1.4;
const MAX_LIFT = 6; // px the hovered icon jumps
const RANGE = 110; // px falloff radius from an icon's centre
const TRACK_TRANSITION = "transform 150ms cubic-bezier(0, 0, 0.2, 1)";

/** Cosine falloff: 1 at the cursor, smoothly to 0 at RANGE, nothing beyond. */
function magnitude(distance: number): number {
  if (distance >= RANGE) return 0;
  return (Math.cos((distance / RANGE) * Math.PI) + 1) / 2;
}

const itemClass =
  "flex size-10 items-center justify-center rounded-button bg-brand-cream text-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark";

/**
 * Hero-only social icon row with macOS-Dock magnification + per-icon tooltips.
 * The shared <SocialLinks> (footer) is left untouched — this only reuses the
 * same links/icons from constants/socials.
 *
 * The magnification is written straight to `style.transform` inside a single
 * rAF (no React re-render per mouse move, which is what made it stutter). Under
 * prefers-reduced-motion the transforms are skipped entirely and the icons keep
 * a plain opacity hover; the tooltip still appears, fading without the slide.
 */
export default function SocialDock({
  links = SOCIAL_LINKS,
}: {
  links?: SocialLink[];
}) {
  const reduced = usePrefersReducedMotion();
  const anchorRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const centresRef = useRef<number[]>([]);
  const cursorRef = useRef<number | null>(null);
  const focusedRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const measure = () => {
    centresRef.current = anchorRefs.current.map((el) => {
      if (!el) return Number.POSITIVE_INFINITY;
      const rect = el.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });
  };

  // Write every icon's transform in one pass. Keyboard-focused icon magnifies
  // fully even with no cursor on the row.
  const paint = () => {
    const cursorX = cursorRef.current;
    anchorRefs.current.forEach((el, i) => {
      if (!el) return;
      let m = 0;
      if (cursorX !== null) {
        m = magnitude(Math.abs(cursorX - (centresRef.current[i] ?? Infinity)));
      }
      if (focusedRef.current === i) m = Math.max(m, 1);
      el.style.transform = `translateY(${-MAX_LIFT * m}px) scale(${
        1 + (MAX_SCALE - 1) * m
      })`;
    });
  };

  const schedulePaint = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(paint);
  };

  const handleEnter = () => {
    if (reduced) return;
    measure();
  };

  const handleMove = (event: ReactMouseEvent) => {
    if (reduced) return;
    cursorRef.current = event.clientX;
    schedulePaint();
  };

  const handleLeave = () => {
    if (reduced) return;
    cursorRef.current = null;
    schedulePaint();
  };

  const activate = (index: number) => {
    setActive(index);
    if (reduced) return;
    focusedRef.current = index;
    if (centresRef.current.length === 0) measure();
    schedulePaint();
  };

  const deactivate = (index: number) => {
    setActive((current) => (current === index ? null : current));
    if (reduced) return;
    if (focusedRef.current === index) focusedRef.current = null;
    schedulePaint();
  };

  return (
    <ul
      className="flex items-center gap-4 pt-6"
      onMouseEnter={reduced ? undefined : handleEnter}
      onMouseMove={reduced ? undefined : handleMove}
      onMouseLeave={reduced ? undefined : handleLeave}
    >
      {links.map(({ label, href, Icon }, index) => {
        const isActive = active === index;
        return (
          <li key={label} className="relative flex">
            {/* Visual-only — the link's aria-label is the accessible name. */}
            <span
              aria-hidden="true"
              className={cx(
                "pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap rounded-button bg-brand-charcoal px-2 py-1 text-xs text-on-dark transition duration-150",
                // clear the magnified icon on hover; sit close under reduced motion
                reduced ? "mb-2" : "mb-6",
                isActive
                  ? "translate-y-0 opacity-100"
                  : reduced
                    ? "opacity-0"
                    : "translate-y-1 opacity-0",
              )}
            >
              {label}
              <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-brand-charcoal" />
            </span>

            <a
              ref={(el) => {
                anchorRefs.current[index] = el;
              }}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className={cx(
                itemClass,
                reduced && "transition-opacity hover:opacity-90",
              )}
              style={
                reduced
                  ? undefined
                  : {
                      transition: TRACK_TRANSITION,
                      willChange: "transform",
                    }
              }
              onMouseEnter={() => activate(index)}
              onMouseLeave={() => deactivate(index)}
              onFocus={() => activate(index)}
              onBlur={() => deactivate(index)}
            >
              <Icon className="size-4" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
