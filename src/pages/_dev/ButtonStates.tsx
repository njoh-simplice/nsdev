import Button from "../../components/ui/Button";

/**
 * Dev-only visual check for every Button state × variant. Not linked from nav;
 * its route is only registered when `import.meta.env.DEV` (see src/router.tsx),
 * so it is tree-shaken out of production builds.
 *
 * hover / focus / pressed are live interaction states — there is no prop to
 * force them, so trigger them by hand on the buttons below.
 */

const STATES = [
  "default",
  "hover",
  "focus",
  "pressed",
  "loading",
  "disabled",
] as const;

type State = (typeof STATES)[number];
type Variant = "primary" | "secondary";

const HINTS: Record<State, string> = {
  default: "",
  hover: "hover the button",
  focus: "Tab to the button",
  pressed: "click and hold",
  loading: "",
  disabled: "",
};

function Demo({ state, variant }: { state: State; variant: Variant }) {
  const label = variant === "primary" ? "Get in touch" : "View projects";
  if (state === "loading") {
    return (
      <Button variant={variant} loading>
        {label}
      </Button>
    );
  }
  if (state === "disabled") {
    return (
      <Button variant={variant} disabled>
        {label}
      </Button>
    );
  }
  return <Button variant={variant}>{label}</Button>;
}

export default function ButtonStates() {
  return (
    <div className="space-y-10">
      <header className="space-y-1">
        <h1 className="font-display text-2xl font-bold">Button states</h1>
        <p className="font-body text-sm text-on-dark-muted">
          Dev-only. Six states × two variants. hover / focus / pressed are real
          interaction states — trigger them on the buttons.
        </p>
      </header>

      {(["primary", "secondary"] as const).map((variant) => (
        <section key={variant} className="space-y-4">
          <h2 className="font-body text-xs uppercase tracking-wide text-on-dark-muted">
            {variant}
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {STATES.map((state) => (
              <div key={state} className="flex flex-col items-start gap-2">
                <span className="font-body text-xs font-semibold text-on-dark">
                  {state}
                </span>
                <Demo state={state} variant={variant} />
                {HINTS[state] && (
                  <span className="font-body text-xs text-on-dark-muted">
                    {HINTS[state]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
