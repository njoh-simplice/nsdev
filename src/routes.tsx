import type { RouteObject } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import LegalMentions from "./pages/LegalMentions";
import NotFound from "./pages/NotFound";
import RouteError from "./pages/RouteError";

// Dev-only routes. `import.meta.env.DEV` is statically false in a production
// build, so this branch — and the dynamic import inside it — is tree-shaken out.
const devRoutes: RouteObject[] = import.meta.env.DEV
  ? [
      {
        path: "_dev/button-states",
        lazy: async () => {
          const { default: Component } = await import(
            "./pages/_dev/ButtonStates"
          );
          return { Component };
        },
      },
    ]
  : [];

/**
 * The route tree, kept free of any browser-only side effects so the build-time
 * prerenderer (src/entry-server.tsx) can feed the exact same routes to React
 * Router's static handler. `createBrowserRouter` lives in router.tsx.
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "blog", element: <Blog /> },
      {
        // Lazy so react-markdown + the Markdown pipeline only load when a post
        // is opened, not on every page. React Router's static handler awaits
        // this during prerendering, so the article HTML is still baked in.
        path: "blog/:slug",
        lazy: async () => {
          const { default: Component } = await import("./pages/BlogPost");
          return { Component };
        },
      },
      { path: "contact", element: <Contact /> },
      { path: "legal-mentions", element: <LegalMentions /> },
      ...devRoutes,
      // Catch-all — must stay last so it only matches when nothing else does.
      { path: "*", element: <NotFound /> },
    ],
  },
];
