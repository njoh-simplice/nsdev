import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Live `prefers-reduced-motion` flag for JS-driven animation that Tailwind's
 * `motion-safe:` variant can't gate on its own (e.g. inline transforms).
 *
 * Starts `false` so it is safe to render on the server during prerendering and
 * hydrates without a mismatch; the real value is read in an effect.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
