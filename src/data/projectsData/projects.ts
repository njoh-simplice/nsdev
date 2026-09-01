export interface Project {
  /** Stable key (and a URL-safe fragment if per-project pages ever exist). */
  id: string;
  /** Display name. */
  project_name: string;
  /** Absolute path under public/ — e.g. "/images/projects/foo.webp". Served at
   *  the site root, NOT imported as a bundled asset. */
  image: string;
  /** Official link — the live project URL (or an internal "/..." route). */
  link: string;
  /** Short kind label, e.g. "Website", "Web app", "Mobile app". */
  type: string;
  /** One or two lines describing the project (used on the Projects page). */
  description: string;
  /** Master on/off switch. `false` hides the project everywhere (home + Projects
   *  page) — flip it if a live site goes down. */
  isDisplay: boolean;
}

// Links are real; project_name / type / description still need a manual pass.
// The home page shows the first 3 with isDisplay: true (see FeaturedProjects);
// the Projects page will show all of them where isDisplay is true.
export const projects: Project[] = [
  {
    id: "njohfolio",
    project_name: "Njohfolio",
    image: "/images/projects/njohfolio.webp",
    link: "https://njohfolio.vercel.app",
    type: "Website",
    description: "TODO: short description.",
    isDisplay: true,
  },
  {
    id: "synergie-barber",
    project_name: "Synergie Barber",
    image: "/images/projects/synergie_barber.webp",
    link: "https://synergie-barber.com",
    type: "Website",
    description: "TODO: short description.",
    isDisplay: true,
  },
  {
    id: "tripkam",
    project_name: "Tripkam",
    image: "/images/projects/tripkam.webp",
    link: "https://github.com/njoh-simplice/tripkam",
    type: "Web app",
    description: "TODO: short description.",
    isDisplay: true,
  },
  {
    id: "cjarc",
    project_name: "CJARC",
    image: "/images/projects/cjarc.webp",
    link: "https://cjarc.org",
    type: "Website",
    description: "TODO: short description.",
    isDisplay: true,
  },
  {
    id: "cmicjarc",
    project_name: "CMI CJARC",
    image: "/images/projects/cmicjarc.webp",
    link: "https://cmicjarc.com",
    type: "Website",
    description: "TODO: short description.",
    isDisplay: true,
  },
  {
    id: "figurative",
    project_name: "Figurative",
    image: "/images/projects/figurative.webp",
    link: "https://figurative.fr",
    type: "Website",
    description: "TODO: short description.",
    isDisplay: true,
  },
  {
    id: "immigration-lafinesse",
    project_name: "Immigration Lafinesse",
    image: "/images/projects/immigration_lafinesse.webp",
    link: "https://immigration-lafinesse.com",
    type: "Website",
    description: "TODO: short description.",
    isDisplay: true,
  },
  {
    id: "le-point-express",
    project_name: "Le Point Express",
    image: "/images/projects/le_point_express.webp",
    link: "https://github.com/njoh-simplice/Livraison-Frontend",
    type: "Web app",
    description: "TODO: short description.",
    isDisplay: true,
  },
  {
    id: "oeil-sur",
    project_name: "Oeil Sur",
    image: "/images/projects/oeil_sur.webp",
    link: "https://oeil-sur.com",
    type: "Website",
    description: "TODO: short description.",
    isDisplay: true,
  },
  {
    id: "coole",
    project_name: "Coolé",
    image: "/images/projects/coolé.webp",
    link: "https://coole.fr",
    type: "Website",
    description: "TODO: short description.",
    isDisplay: true,
  },
  {
    id: "ambira",
    project_name: "Ambira",
    // TODO: add public/images/projects/ambira.webp (no image file yet).
    image: "/images/projects/ambira-light.webp",
    link: "https://ambira.nsdev.me",
    type: "Website",
    description: "TODO: short description.",
    isDisplay: true,
  },
];
