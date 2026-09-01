# DESIGN.md

Design system for the NSDEV portfolio. Colors below were sampled directly (pixel-picked) from the Figma mockup PDF, not estimated — use them exactly. Tailwind tokens matching everything here (colors, fonts, radii) live in `src/index.css` under `@theme`; fonts are self-hosted in `src/assets/fonts/`.

## Color

| Token            | Hex       | Tailwind class                      | Used for                                                                          |
| ---------------- | --------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| `brand-black`    | `#1A1A1A` | `bg-brand-black`                    | Page background (dark sections) — note: this is a soft off-black, not `#000`      |
| `brand-cream`    | `#F6F5F4` | `bg-brand-cream`                    | Light section backgrounds, nav bar                                                |
| `brand-lime`     | `#83FD00` | `bg-brand-lime`                     | Primary CTA fill ("Get in touch", "Buy me a coffee"), logo badge, decorative glow |
| `brand-mint`     | `#CEF5A4` | `bg-brand-mint` / `text-brand-mint` | Outline-button text & border on dark bg, active step-card fill                    |
| `brand-sage`     | `#869C6B` | `bg-brand-sage`                     | Muted highlight marker behind emphasized headline text (e.g. "SIMPLICE")          |
| `brand-charcoal` | `#333333` | `bg-brand-charcoal`                 | Inactive card fill on dark sections (e.g. steps 2–4)                              |
| `on-dark`        | `#FFFFFF` | `text-on-dark`                      | Primary text on dark backgrounds                                                  |
| `on-dark-muted`  | `#C4C4C4` | `text-on-dark-muted`                | Secondary/body text on dark backgrounds                                           |
| `on-light`       | `#1A1A1A` | `text-on-light`                     | Primary text on light/cream backgrounds                                           |
| `on-light-muted` | `#595959` | `text-on-light-muted`               | Secondary/body paragraph text on light backgrounds                                |

**Rule:** `brand-lime` is a loud, high-saturation accent — it appears only on small, high-intent targets (primary buttons, the logo mark, one decorative glow). Never use it as a large fill or background; that's what makes it read as an accent rather than a theme color. `brand-mint` and `brand-sage` are the calmer greens for larger or secondary use (borders, highlight blocks, secondary card states).

## Typography

Three self-hosted variable fonts (latin subset), files in `src/assets/fonts/`, declared in `src/assets/fonts/fonts.css`, exposed as Tailwind tokens in `src/index.css`:

- **Display:** [Host Grotesk](https://fonts.google.com/specimen/Host+Grotesk) — token `--font-display` / class `font-display`. Bold geometric sans for headlines and section headings.
- **Body:** [Montserrat](https://fonts.google.com/specimen/Montserrat) — token `--font-body` / class `font-body`. Regular-weight sans for paragraphs, UI text, and button labels; the base font for body copy.
- **Script accent:** [Caveat](https://fonts.google.com/specimen/Caveat) — token `--font-script` / class `font-script`. Used _sparingly_, only for the handwritten touches: "Hey, I'm", "(at night)", and the "Step 1/2/3/4" number eyebrows. Never for body copy or anything load-bearing. Caveat has no italic face — its slant is built in, so never apply `font-style: italic` (it renders as faux-oblique).

Type scale (mobile → desktop):

| Role                           | Size (mobile)    | Size (desktop)  | Weight | Family       |
| ------------------------------ | ---------------- | --------------- | ------ | ------------ |
| Hero headline                  | 2.25rem / 36px   | 4rem / 64px     | 700    | Host Grotesk |
| Script accent ("Hey, I'm")     | 1.5rem / 24px    | 2.5rem / 40px   | 400    | Caveat       |
| Section heading                | 1.75rem / 28px   | 2.5rem / 40px   | 700    | Host Grotesk |
| Body / paragraph               | 1rem / 16px      | 1.125rem / 18px | 400    | Montserrat   |
| Button label                   | 0.9375rem / 15px | 1rem / 16px     | 600    | Montserrat   |
| Step number eyebrow ("Step 1") | 0.875rem / 14px  | 1rem / 16px     | 400    | Caveat       |
| Step card title ("Titre step") | 0.875rem / 14px  | 1rem / 16px     | 700    | Host Grotesk |

Line length: keep body paragraphs under ~70 characters per line (matches the mockup's narrow column in the About section).

## Spacing & shape

- Buttons: `8px` radius — token `--radius-button` / class `rounded-button`. A modest, squared-off rounding, not a pill. Applies to both "Get in touch" and "Buy me a coffee".
- Cards (step cards, project cards): `16px` radius — token `--radius-card` / class `rounded-card`. Slightly rounder than buttons; keep that small contrast and don't round cards further.
- Section padding: generous vertical breathing room between sections (the mockup uses full-bleed dark/light band changes to separate sections rather than borders).

## Components

**Primary button** (`brand-lime` fill, dark text, `rounded-button` / 8px) — one per view, the single highest-intent action ("Get in touch").

**Secondary/outline button** (`brand-mint` text + border, transparent/`brand-black` fill, `rounded-button` / 8px) — lower-intent action alongside a primary ("View my recent projects").

**Step card** (process section) — 4 cards in a row (stack on mobile). Active/current step: `brand-mint` fill with `on-light` text. Inactive steps: `brand-charcoal` fill with `on-dark` text. Connected by a thin horizontal line with small diamond/sparkle markers between them — this is a real sequence (1→2→3→4), so the connecting line and numbering are earned here, not decorative.

**Highlight marker** — a solid `brand-sage` rectangle behind a highlighted word/phrase in a headline (white text sitting on top), rotated a few degrees off-axis for a "highlighter pen" feel. Use once per headline, on the most important word — not on every heading.

**Decorative glow** — a soft radial/linear gradient from `brand-lime` fading to transparent, used as a single accent curve at section-transition edges (seen at the bottom of the hero and top of the "Working with Me" section). This is the one place motion/glow decoration is allowed; don't repeat it more than once or twice per page.

## Motion

Keep this minimal and deliberate, per the mockup's restrained feel:

- Hover state on buttons: slight brightness/scale change, not a full transform.
- Logo hover-to-animate (already in `App.tsx`'s GIF-frame trick) is the one "surprise" interaction on the page — don't add competing hover gimmicks elsewhere.
- No scroll-triggered fade-ins on every section. If you want one entrance moment, spend it on the hero only.
- Respect `prefers-reduced-motion`.

## Accessibility notes

- `brand-lime` (#83FD00) text/icons on `brand-black` (#1A1A1A) has very high contrast and is safe for small text. `brand-lime` background with dark text is also safe.
- `brand-mint` (#CEF5A4) on `brand-black` is safe for text (it's a light tint against near-black).
- Do not put `brand-lime` or `brand-mint` text on `brand-cream` background — insufficient contrast. On light sections, use `on-light` / `on-light-muted` for text and reserve the greens for buttons/borders with dark or black text on top of them.
