import type { Components } from "react-markdown";

/**
 * Maps rendered Markdown elements onto the design tokens (DESIGN.md). No
 * `@tailwindcss/typography` in this project, so each element is styled here.
 *
 * In-content links use `text-on-light` + underline, never `brand-mint` —
 * mint on cream fails contrast (DESIGN.md > Accessibility).
 */
export const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 font-display text-2xl font-bold text-on-light md:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 font-display text-xl font-bold text-on-light">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 font-body leading-relaxed text-on-light-muted md:text-lg">
      {children}
    </p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      {...(href?.startsWith("http")
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
      className="text-on-light underline decoration-on-light-muted/50 underline-offset-2 hover:decoration-on-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-light"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 font-body text-on-light-muted md:text-lg">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 font-body text-on-light-muted md:text-lg">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-brand-sage pl-4 font-body text-on-light-muted md:text-lg">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-on-light">{children}</strong>
  ),
  hr: () => <hr className="my-10 border-on-light-muted/20" />,
  img: ({ src, alt }) => (
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      loading="lazy"
      className="my-6 w-full"
    />
  ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-card bg-brand-black p-4 font-mono text-sm text-on-dark">
      {children}
    </pre>
  ),
  code: ({ className, children }) =>
    className?.startsWith("language-") ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="rounded bg-brand-black/5 px-1.5 py-0.5 font-mono text-[0.9em] text-on-light">
        {children}
      </code>
    ),
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left font-body text-on-light-muted">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-on-light-muted/30 py-2 pr-4 font-semibold text-on-light">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-on-light-muted/15 py-2 pr-4 align-top">
      {children}
    </td>
  ),
};
