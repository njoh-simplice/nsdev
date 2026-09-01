/**
 * Sequence markers shared by the "Working with Me" stepper (horizontal line) and
 * the "Work Experience" timeline (vertical line) — same visual language.
 */

/** Current / featured item: a filled four-point sparkle, brand-lime, larger. */
export function SparkleMarker() {
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

/** Other items: a small muted diamond. */
export function DiamondMarker() {
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
