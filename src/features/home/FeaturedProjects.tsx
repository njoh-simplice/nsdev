import Button from "../../components/ui/Button";
import HighlightText from "../../components/ui/HighlightText";
import { projects, type Project } from "../../data/projectsData/projects";

// Home page teaser: the last 3 live projects (newest, added at the end of the
// list). The Projects page shows the full list.
const HOME_LIMIT = 3;
const featured = projects
  .filter((project) => project.isDisplay)
  .slice(-HOME_LIMIT);

function ProjectCard({ project }: { project: Project }) {
  const label = `${project.project_name} (${project.type})`;
  const isInternal = project.link.startsWith("/");

  const linkButton = isInternal ? (
    <Button variant="secondary" to={project.link}>
      View project
    </Button>
  ) : (
    <Button
      variant="secondary"
      href={project.link}
      target="_blank"
      rel="noreferrer"
    >
      View project
    </Button>
  );

  return (
    <article className="rounded-card bg-brand-black p-2">
      <img
        src={project.image}
        alt={project.project_name}
        loading="lazy"
        className="w-full rounded-lg"
      />
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="min-w-0 font-body font-semibold text-on-dark">{label}</p>
        <div className="shrink-0">{linkButton}</div>
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="bg-brand-cream px-4 py-16 text-on-light sm:px-8 md:py-24"
    >
      {/* Heading */}
      <h2 className="text-center font-display text-[1.75rem] font-bold uppercase leading-tight text-on-light md:text-[2.5rem]">
        Featured <HighlightText>Projects</HighlightText>
      </h2>

      {/* Intro */}
      <p className="mx-auto mt-4 max-w-xs text-center font-body text-on-light-muted md:text-lg">
        A few things I&rsquo;ve built recently.
      </p>

      {/* Grid */}
      <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-12 flex justify-center">
        <Button variant="primary" to="/projects">
          See more
        </Button>
      </div>
    </section>
  );
}
