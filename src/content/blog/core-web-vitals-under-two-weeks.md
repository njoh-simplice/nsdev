---
title: "Fixing Core Web Vitals on a WordPress site in under two weeks"
slug: "core-web-vitals-under-two-weeks"
date: "2026-08-28"
excerpt: "A field guide to the three metrics Google actually grades — LCP, CLS and INP — and the handful of changes that move them the most on a real WordPress build."
coverImage: "/images/blog/core-web-vitals-cover.webp"
coverAlt: "A browser performance panel showing a Largest Contentful Paint marker on a web page"
tags:
  - "SEO"
  - "Core Web Vitals"
  - "WordPress"
  - "Performance"
---

Most "slow WordPress site" complaints come down to three numbers. Google's
Core Web Vitals grade a page on **Largest Contentful Paint (LCP)**,
**Cumulative Layout Shift (CLS)** and **Interaction to Next Paint (INP)** —
and in my experience the same short list of fixes moves all three on almost
every build.

## 1. Largest Contentful Paint

LCP is the moment the biggest thing in the viewport finishes rendering —
usually a hero image or a headline. The wins, in order of impact:

- **Serve the hero image in a modern format** (WebP or AVIF) at the size it
  is actually displayed. A 2400px JPEG shown in a 1200px slot is pure waste.
- **Preload it.** `<link rel="preload" as="image" href="…" fetchpriority="high">`
  in the `<head>` tells the browser to start the download before it has
  finished parsing CSS.
- **Self-host fonts** and add `font-display: swap`. A blocked webfont holds
  up the headline that is often the LCP element.

> On the last site I audited, format + sizing + preload alone took LCP from
> 4.1s to 1.6s on a mid-range phone.

## 2. Cumulative Layout Shift

CLS is how much the page jumps around while it loads. Two causes account for
nearly all of it:

1. **Images without dimensions.** Always set `width` and `height` (or a CSS
   `aspect-ratio`) so the browser reserves the box before the file arrives.
2. **Webfont swap.** When Montserrat replaces the fallback, line heights
   change and everything below reflows. Preloading the font (see above)
   shrinks the swap window to something imperceptible.

## 3. Interaction to Next Paint

INP replaced First Input Delay in 2024. It measures how long the page takes
to visually respond after a tap or click. On WordPress the usual culprit is
**too much third-party JavaScript** — chat widgets, analytics, A/B tools —
all competing for the main thread.

- Load anything non-critical with `defer` or on interaction.
- Gate analytics behind consent so it does not run at all for visitors who
  decline.
- Question every plugin that adds a script to the front end.

## A realistic two-week plan

| Days  | Work                                                            |
| ----- | ------------------------------------------------------------- |
| 1–2   | Audit: PageSpeed Insights + a real device, list the LCP element |
| 3–6   | Images: convert, resize, add dimensions, preload the hero     |
| 7–9   | Fonts: self-host, `swap`, preload; kill render-blocking CSS   |
| 10–12 | JavaScript: defer third parties, consent-gate analytics      |
| 13–14 | Re-measure, fix regressions, hand over a short maintenance note |

None of this requires rebuilding the site. It is mostly the front end doing
less, and doing it in the right order.
