import Hero from "../features/home/Hero";
import About from "../features/home/About";
import WorkingWithMe from "../features/home/WorkingWithMe";
import FeaturedProjects from "../features/home/FeaturedProjects";
import WorkExperience from "../features/home/WorkExperience";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Home() {
  usePageMeta(
    "Njoh Simplice Junior | Software Developer & WordPress/SEO Specialist",
    "Njoh Simplice Junior, freelance software developer and WordPress/SEO specialist in Yaoundé, Cameroon. Websites and web/mobile apps from Figma mockup to live site, usually in under two weeks.",
  );

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
