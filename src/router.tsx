import { createBrowserRouter, type RouteObject } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> },
      { path: "legal-mentions", element: <LegalMentions /> },
      ...devRoutes,
      // Catch-all — must stay last so it only matches when nothing else does.
      { path: "*", element: <NotFound /> },
    ],
  },
]);
