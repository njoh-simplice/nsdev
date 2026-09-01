import Button from "../components/ui/Button";
import sparkle from "../assets/images/sparkle-accent.webp";

export default function NotFound() {
  return (
    <section className="flex min-h-full flex-col items-center justify-center bg-brand-black px-4 py-16 text-center text-on-dark sm:px-8">
      {/* One deliberate entrance moment (motion-safe only). */}
      <div className="flex flex-col items-center motion-safe:animate-fade-up">
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

        <Button variant="primary" to="/" className="mt-8">
          Back to Home
        </Button>
      </div>
    </section>
  );
}
