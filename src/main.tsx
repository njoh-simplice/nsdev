import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router.tsx";

const container = document.getElementById("root")!;

const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// Every route ships as prerendered HTML (scripts/prerender.mjs), so the
// container normally already has markup to hydrate. `createRoot` stays as the
// fallback for anything served from an empty shell (e.g. `vite dev`).
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
