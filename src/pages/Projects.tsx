import HighlightText from "../components/ui/HighlightText";
import ProjectCard from "../features/projects/ProjectCard";
import { projects } from "../data/projectsData/projects";
import { usePageMeta } from "../hooks/usePageMeta";

const delivered = projects.filter((project) => project.isDisplay);

export default function Projects() {
  usePageMeta(
    "Projects | Njoh Simplice Junior",
    "Websites, web apps and mobile apps delivered by Njoh Simplice Junior for clients in Cameroon and France.",
  );

  return (
    <section className="bg-brand-white px-4 py-16 text-on-light sm:px-8 md:py-24">
      <h1 className="text-center font-display text-[1.75rem] font-bold uppercase leading-tight text-on-light md:text-[2.5rem]">
        Projects <HighlightText>Delivered</HighlightText>
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center font-body text-on-light-muted md:text-lg">
        Everything I&rsquo;ve shipped so far.
      </p>

      <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {delivered.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
