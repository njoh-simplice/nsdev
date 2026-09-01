import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { useCookieConsent } from "../../hooks/useCookieConsent";

/**
 * GDPR consent banner. Rendered once in RootLayout, on every page, until the
 * visitor makes a choice — GA4 (src/libs/analytics.ts) only loads on Accept.
 */
export default function CookieConsent() {
  const { choice, accept, decline } = useCookieConsent();

  if (choice !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] bg-brand-black px-4 py-4 text-on-dark shadow-2xl sm:px-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center font-body text-sm text-on-dark-muted sm:text-left">
          This site uses Google Analytics (GA4) to understand traffic and
          improve the experience. It only runs if you accept — see{" "}
          <Link
            to="/legal-mentions"
            className="underline decoration-on-dark-muted/40 underline-offset-2 hover:text-on-dark"
          >
            Legal Mentions
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" onClick={decline}>
            Decline
          </Button>
          <Button variant="primary" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
