import { useEffect } from "react";
import Button from "../components/ui/Button";
import sparkle from "../assets/images/sparkle-accent.webp";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta(
    "Page Not Found — Njoh Simplice Junior",
    "The page you're looking for doesn't exist or has moved.",
  );

  // A 404 can be reached by a hard load of a bad URL, where <ScrollRestoration>
  // doesn't run — force the viewport to the top on mount.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex min-h-full flex-col items-center justify-center bg-brand-black px-4 py-16 text-center text-on-dark sm:px-8 md:py-24">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={sparkle}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-3 w-8 select-none md:-right-8 md:-top-6 md:w-14"
          />
          <p className="font-display text-[clamp(5rem,24vw,16rem)] font-bold leading-none tracking-tight text-on-dark">
            404
          </p>
        </div>

        <h1 className="mt-6 font-display text-[1.75rem] font-bold text-on-dark md:text-[2.5rem]">
          Page Not Found
        </h1>

        <p className="mt-3 max-w-prose font-body text-on-dark-muted md:text-lg">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>

        <Button variant="primary" to="/" disableMotion className="mt-8">
          Back to Home
        </Button>
      </div>
    </section>
  );
}
