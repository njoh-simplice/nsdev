import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary";

interface BaseProps {
  /** Visual style. `primary` = brand-lime fill; `secondary` = mint outline on dark. */
  variant?: Variant;
  /**
   * Shows a spinner, hides the icon, visually-hides (but keeps in the DOM) the
   * label, and blocks interaction (`pointer-events-none` + `aria-busy` +
   * `aria-disabled`). It intentionally does NOT apply the dimmed `disabled`
   * look — loading and disabled read differently.
   *
   * Controlled prop, no minimum display time: the button reflects exactly what
   * you pass, so only set it for actions where a spinner is warranted (e.g. a
   * network request), not instant sync work. Ignored on the `href` (anchor)
   * path — a dev-only `console.warn` fires if you pass it there.
   */
  loading?: boolean;
  /** Non-interactive + dimmed. Works on both the button and anchor paths. */
  disabled?: boolean;
  /** Leading icon, rendered before the label. Replaced by the spinner while loading. */
  icon?: ReactNode;
  /**
   * Drop the decorative hover/active scale. Colour hover and `focus-visible`
   * states stay — those are functional affordances, not animation. Used on
   * pages that opt out of motion (Contact, 404). Default `false`.
   */
  disableMotion?: boolean;
  /**
   * Client-side route. When set, renders react-router's `<Link to={...}>` with
   * the same variant styles — an SPA transition, no full reload. Mutually
   * exclusive with `href` (use `href` for external / same-page anchor links).
   * `loading` is ignored here, same as on the `href` path.
   */
  to?: string;
  children: ReactNode;
}

type ButtonOnlyProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

/** Props for {@link Button}: a `<button>`, or an `<a>` when `href` is set. */
export type ButtonProps = ButtonOnlyProps | AnchorProps;

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

const baseCommon = cx(
  "relative inline-flex items-center justify-center gap-2",
  "font-body text-[0.9375rem] md:text-base font-semibold",
  "rounded-button px-6 py-3 select-none",
  "transition duration-150",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
);

const scaleMotion =
  "motion-safe:hover:scale-[1.01] motion-safe:active:scale-[0.97]";

const variantClass: Record<Variant, string> = {
  // brightness on hover is primary-only: on the lime fill it lifts the
  // background and the dark label is unaffected. On the secondary variant the
  // same filter brightens the mint label/border and reads as a weight bump, so
  // that variant gets the scale-only hover from `base`.
  primary:
    "bg-brand-lime text-on-light focus-visible:outline-on-light motion-safe:hover:brightness-110",
  secondary:
    "bg-brand-black text-brand-mint border-2 border-brand-mint focus-visible:outline-on-dark",
};

const disabledClass = "opacity-50 pointer-events-none cursor-not-allowed";

function Spinner() {
  return (
    <svg
      className="size-[1.15em] motion-safe:animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Content({
  icon,
  loading,
  children,
}: {
  icon?: ReactNode;
  loading: boolean;
  children: ReactNode;
}) {
  return (
    <>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}
      {icon && !loading && (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {icon}
        </span>
      )}
      {/* `invisible` keeps the box (no width jump) but hides it from AT... */}
      <span className={loading ? "invisible" : undefined}>{children}</span>
      {/* ...so re-expose the accessible name while loading. */}
      {loading && <span className="sr-only">{children}</span>}
    </>
  );
}

/**
 * Button / call-to-action, per DESIGN.md.
 *
 * Renders a `<button>` by default, an `<a>` when `href` is set, or a
 * react-router `<Link>` when `to` is set. Two variants (`primary`, `secondary`),
 * each covering six states: default, hover, focus,
 * pressed, loading, disabled — all built from existing design tokens
 * (`bg-brand-lime`, `text-brand-mint`, `rounded-button`, …), no new colors.
 *
 * State notes:
 * - hover / pressed: brightness + small scale, `motion-safe:` only (skipped
 *   under `prefers-reduced-motion`).
 * - focus: `focus-visible` outline (keyboard only); colour is chosen per variant
 *   so it never merges with the secondary variant's mint border.
 * - loading: driven by the `loading` prop — spinner in, icon out, label
 *   visually-hidden but kept for AT, interaction blocked via
 *   `pointer-events-none` + `aria-busy` + `aria-disabled`, WITHOUT the dimmed
 *   `disabled` look. Controlled, no min display time. `<button>` path only; on
 *   the `href` path it is ignored (dev `console.warn`).
 * - disabled: `opacity-50` and not focusable — native `disabled` on the button
 *   path; `tabIndex={-1}` + `aria-disabled` + dropped `href` on the anchor path.
 */
export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    loading = false,
    disabled = false,
    disableMotion = false,
    icon,
    children,
    className,
    to,
    ...rest
  } = props;

  const rootClass = cx(
    baseCommon,
    !disableMotion && scaleMotion,
    variantClass[variant],
    disabled ? disabledClass : "cursor-pointer",
    className,
  );

  if (to !== undefined) {
    if (import.meta.env.DEV && loading) {
      console.warn(
        "<Button>: `loading` is ignored on the `to` (router link) variant.",
      );
    }

    const { onClick, ...linkRest } = rest as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "href"
    >;

    return (
      <Link
        {...linkRest}
        to={to}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : linkRest.tabIndex}
        className={rootClass}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      >
        <Content icon={icon} loading={false}>
          {children}
        </Content>
      </Link>
    );
  }

  if (props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    if (import.meta.env.DEV && loading) {
      console.warn(
        "<Button>: `loading` is ignored on the anchor (href) variant — an <a> can't express a busy state the way a <button> can.",
      );
    }

    return (
      <a
        {...anchorRest}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : anchorRest.tabIndex}
        className={rootClass}
      >
        <Content icon={icon} loading={false}>
          {children}
        </Content>
      </a>
    );
  }

  const {
    type,
    onClick,
    ...buttonRest
  } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      {...buttonRest}
      type={type ?? "button"}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-busy={loading || undefined}
      className={cx(rootClass, loading && "pointer-events-none")}
      onClick={(event) => {
        if (loading || disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
    >
      <Content icon={icon} loading={loading}>
        {children}
      </Content>
    </button>
  );
}
