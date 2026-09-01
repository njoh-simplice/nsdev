import { useEffect } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Button from "../components/ui/Button";

/**
 * Root-route `errorElement`. Renders in place of the whole app shell when a
 * route throws, so it stands alone (full viewport, no header/footer).
 */
export default function RouteError() {
  const error = useRouteError();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const status = isRouteErrorResponse(error) ? String(error.status) : "Error";

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-brand-black px-4 py-16 text-center text-on-dark sm:px-8">
      <p className="font-display text-[clamp(4rem,20vw,12rem)] font-bold leading-none tracking-tight">
        {status}
      </p>

      <h1 className="mt-6 font-display text-[1.75rem] font-bold md:text-[2.5rem]">
        Something went wrong
      </h1>

      <p className="mt-3 max-w-prose font-body text-on-dark-muted md:text-lg">
        An unexpected error stopped this page from loading.
      </p>

      <Button variant="primary" to="/" disableMotion className="mt-8">
        Back to Home
      </Button>
    </div>
  );
}
