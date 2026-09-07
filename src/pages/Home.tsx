import Hero from "../features/home/Hero";
import About from "../features/home/About";
import WorkingWithMe from "../features/home/WorkingWithMe";
import FeaturedProjects from "../features/home/FeaturedProjects";
import WorkExperience from "../features/home/WorkExperience";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Home() {
  usePageMeta("/");

  return (
    <>
      <Hero />
      <About />
      <WorkingWithMe />
      <FeaturedProjects />
      <WorkExperience />
    </>
  );
}
