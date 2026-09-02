import Button from "../../components/ui/Button";
import type { Project } from "../../data/projectsData/projects";

/**
 * Project card — shared by the home page's Featured Projects teaser and the
 * full Projects page. Dark card that sits on either the cream or white light
 * sections.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const label = `${project.project_name} (${project.type})`;
  const isInternal = project.link.startsWith("/");

  // Visible text stays short; the accessible name names the project so the link
  // is descriptive on its own (SEO + screen readers).
  const ariaLabel = `View project: ${project.project_name}`;

  const linkButton = isInternal ? (
    <Button variant="secondary" to={project.link} aria-label={ariaLabel}>
      View project
    </Button>
  ) : (
    <Button
      variant="secondary"
      href={project.link}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      View project
    </Button>
  );

  return (
    <article className="rounded-card bg-brand-black p-2">
      {/* aspect-ratio matches the source screenshots (~1200x554), so the box is
          reserved before load (no layout shift) with no crop or letterbox. */}
      <img
        src={project.image}
        alt={project.project_name}
        loading="lazy"
        className="aspect-[1200/554] w-full rounded-lg object-contain"
      />
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="min-w-0 font-body font-semibold text-on-dark">{label}</p>
        <div className="shrink-0">{linkButton}</div>
      </div>
    </article>
  );
}
