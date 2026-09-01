# CLAUDE.md

Guidance for Claude Code when working in this repo. Read this before making changes.

## Project

**NSDEV** — personal portfolio for Njoh Simplice Junior, Software Developer & WordPress/SEO specialist, based in Yaoundé, Cameroon. Single-page (for now) site: hero, about, process ("Working with Me"), featured projects, work experience, footer.

Content source of truth: `src/data/content.ts` (typed content object — see "Content" below).
Design source of truth: `DESIGN.md` (colors, type, components) — always check it before styling anything.

## Stack

| Concern    | Choice                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Build tool | Vite 8                                                                                                                                |
| UI         | React 19 + React DOM 19                                                                                                               |
| Language   | TypeScript ~6.0                                                                                                                       |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite` plugin, **config-less** — theme lives in `src/index.css` via `@theme`, not `tailwind.config.js`) |
| Linter     | Oxlint 1.x                                                                                                                            |
| Tests      | none yet                                                                                                                              |
| Routing    | not yet installed — `src/router.tsx` is a placeholder                                                                                 |

## Commands

```bash
npm run dev      # start dev server with HMR
npm run build    # tsc -b && vite build (type-check, then bundle)
npm run lint     # oxlint
npm run preview  # serve the production build locally
```

Always run `npm run lint` and `npm run build` (for the type-check) after non-trivial changes, before considering a task done.

## Architecture conventions

Feature-first structure. Follow the existing empty-folder skeleton in `src/` rather than inventing a new layout:

```
src/
├── assets/          # bundled assets (fonts, icons, images) — imported through the build
├── components/
│   ├── layout/      # headers, footers, page shells
│   └── ui/          # buttons, inputs, cards — design-system primitives
├── constants/
├── contexts/
├── features/        # self-contained domain slices (e.g. projects/)
├── hooks/
├── libs/            # thin wrappers/config for 3rd-party libs
├── pages/           # route-level components (once routing is added)
├── styles/
├── types/
└── utils/
```

- Cross-cutting UI (buttons, cards used everywhere) → `components/ui`. Anything specific to one domain (e.g. the projects grid) → `features/projects`.
- Prefer function components with hooks. No class components.
- Keep components small and composed; avoid one large page file — this project currently only has the Vite starter `App.tsx`, replace it by composing real components rather than growing it in place.
- `public/` is for untouched static files already wired up (favicon, manifest, robots.txt, sitemap.xml, llms.txt) — don't duplicate these in `src/assets`.

## Content

All copy lives in `src/data/content.ts` as typed exports (`hero`, `about`, `workingWithMe`, `projects`, `workExperience`, `footer`). Components should import from there, not hardcode strings — this keeps content edits (which happen in plain English/French conversation, not code) separate from markup changes. If new sections are added, extend this file with the same pattern (typed object, one export per section) rather than scattering literals in JSX.

## Design tokens

Do not use raw hex values or default Tailwind palette colors (`bg-lime-400`, `text-gray-500`, etc.) in components. Use the custom tokens defined in `src/index.css` under `@theme` and documented in `DESIGN.md` (e.g. `bg-brand-lime`, `text-on-dark-muted`, `font-display`). This keeps the palette consistent and swappable from one place.

## Known issues to fix opportunistically

Carried over from the initial scaffold — fix these as you touch nearby code, or in a first cleanup pass:

1. `src/App.tsx`: `<a href="google.com">` is a relative path (resolves to `yoursite/google.com`). Needs `https://` and likely `target="_blank" rel="noopener"` — or the link target is wrong and should point elsewhere.
2. `src/App.tsx`: `img.crossOrigin = "anonymous"` on a same-origin local GIF is unnecessary and can taint the canvas (`toDataURL()` throwing). Remove it.
3. `index.html`: favicon is linked with `type="image/x-icon"` but the file is `favicon.svg` — should be `type="image/svg+xml"`.
4. `README.md` is still the default Vite template — replace with real project docs once the structure stabilizes.
5. `src/router.tsx` is empty and unreferenced — no router library installed. Add one (react-router is the default choice) when `pages/` starts filling in.

## What "done" looks like for a UI task

- Matches the tokens in `DESIGN.md` (color, type, spacing) — not default Tailwind grays/blues.
- Responsive down to mobile (the mockup is designed mobile-first-ish with stacked sections).
- Visible keyboard focus states on interactive elements (buttons, links).
- No motion beyond what's specified in `DESIGN.md` (a couple of deliberate moments — not fade-in-on-scroll on every section).
- `npm run lint` and `npm run build` pass.
