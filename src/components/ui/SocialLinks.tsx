import { SOCIAL_LINKS, type SocialLink } from "../../constants/socials";

type Variant = "filled" | "outline";

const itemBase =
  "flex size-10 items-center justify-center rounded-[8px] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2";

const variantClass: Record<Variant, string> = {
  // Cream square, dark glyph — for use on dark backgrounds (Hero).
  filled: "bg-brand-cream text-brand-black focus-visible:outline-on-dark",
  // Thin outline, dark glyph — for use on light backgrounds (footer).
  outline:
    "border border-on-light-muted/40 text-on-light focus-visible:outline-on-light",
};

/**
 * Row of social profile icon-links. Same three-plus links everywhere; the
 * `variant` swaps the square treatment for the surface it sits on.
 */
export default function SocialLinks({
  links = SOCIAL_LINKS,
  variant = "filled",
  className = "",
}: {
  links?: SocialLink[];
  variant?: Variant;
  className?: string;
}) {
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            target="_blank"
            rel="noreferrer"
            className={`${itemBase} ${variantClass[variant]}`}
          >
            <Icon className="size-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
