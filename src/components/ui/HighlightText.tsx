import type { ReactNode } from "react";

/**
 * Highlight marker (DESIGN.md > Components): the given word/phrase in `on-dark`
 * (white) sitting on a solid `brand-sage` rectangle with tight padding, tilted a
 * couple of degrees for a "highlighter pen" feel. Use once per headline.
 */
export default function HighlightText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block -rotate-2">
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-[5px] bg-brand-sage"
      />
      <span className="relative px-2 py-0.5 text-on-dark">{children}</span>
    </span>
  );
}
