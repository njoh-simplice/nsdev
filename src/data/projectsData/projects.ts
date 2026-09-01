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

// Maintained by hand. The home page shows the LAST 3 entries where isDisplay is
// true (see FeaturedProjects); the Projects page shows all of them. Names, types
// and descriptions are approximate — refine as needed.
export const projects: Project[] = [
  {
    id: "njohfolio",
    project_name: "Njohfolio",
    image: "/images/projects/njohfolio.webp",
    link: "https://njohfolio.vercel.app",
    type: "Website",
    description: "A personal portfolio.",
    isDisplay: true,
  },
  {
    id: "synergie-barber",
    project_name: "Synergie Barber",
    image: "/images/projects/synergie_barber.webp",
    link: "https://synergie-barber.com",
    type: "Website",
    description: "Website for a barbershop brand.",
    isDisplay: true,
  },
  {
    id: "tripkam",
    project_name: "Tripkam",
    image: "/images/projects/tripkam.webp",
    link: "https://github.com/njoh-simplice/tripkam",
    type: "Web app",
    description: "Web app for planning trips around Cameroon.",
    isDisplay: true,
  },
  {
    id: "cjarc",
    project_name: "CJARC",
    image: "/images/projects/cjarc.webp",
    link: "https://cjarc.org",
    type: "Website",
    description: "Website for the CJARC organisation.",
    isDisplay: true,
  },
  {
    id: "cmicjarc",
    project_name: "CMI CJARC",
    image: "/images/projects/cmicjarc.webp",
    link: "https://cmicjarc.com",
    type: "Website",
    description: "Website for CMI CJARC.",
    isDisplay: true,
  },
  {
    id: "figurative",
    project_name: "Figurative",
    image: "/images/projects/figurative.webp",
    link: "https://figurative.fr",
    type: "Website",
    description: "Brand website.",
    isDisplay: true,
  },
  {
    id: "immigration-lafinesse",
    project_name: "Immigration Lafinesse",
    image: "/images/projects/immigration_lafinesse.webp",
    link: "https://immigration-lafinesse.com",
    type: "Website",
    description: "Website for an immigration advisory firm.",
    isDisplay: true,
  },
  {
    id: "le-point-express",
    project_name: "Le Point Express",
    image: "/images/projects/le_point_express.webp",
    link: "https://github.com/njoh-simplice/Livraison-Frontend",
    type: "Web app",
    description:
      "Delivery-management web app with a React front-end and a Laravel back-end.",
    isDisplay: true,
  },
  {
    id: "oeil-sur",
    project_name: "Oeil Sur",
    image: "/images/projects/oeil_sur.webp",
    link: "https://oeil-sur.com",
    type: "Website",
    description: "Editorial website.",
    isDisplay: true,
  },
  {
    id: "coole",
    project_name: "Coolé",
    image: "/images/projects/coolé.webp",
    link: "https://coole.fr",
    type: "Website",
    description: "Brand website.",
    isDisplay: true,
  },
  {
    id: "ambira",
    project_name: "Ambira",
    image: "/images/projects/ambira-light.webp",
    link: "https://ambira.nsdev.me",
    type: "Website",
    description: "Product website.",
    isDisplay: true,
  },
];
