import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { COOKIE_CONSENT_STORAGE_KEY } from "../hooks/useCookieConsent";
import { usePageMeta } from "../hooks/usePageMeta";

// Set by hand when the content below actually changes — not computed from
// the visitor's clock, which would make "last updated" meaningless.
const LAST_UPDATED = "September 1, 2026";

const linkClass =
  "underline decoration-on-dark-muted/40 underline-offset-2 hover:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark";

function resetCookieConsent() {
  try {
    localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    // ignore — nothing to clear
  }
  window.location.reload();
}

export default function LegalMentions() {
  usePageMeta(
    "Legal Mentions — Njoh Simplice Junior",
    "Legal information for nsdev.me: site editor, hosting, intellectual property, personal data and cookies.",
  );

  return (
    <div className="bg-brand-black px-4 py-16 text-on-dark sm:px-8 md:py-24">
      <div className="mx-auto max-w-5xl text-center sm:text-left">
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          Legal Mentions
        </h1>
        <p className="mt-2 font-body text-sm text-on-dark-muted">
          Last updated: {LAST_UPDATED}
        </p>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Site Editor
          </h2>
          <ul className="mt-3 space-y-1 font-body text-on-dark-muted">
            <li>
              Njoh Simplice Junior — independent freelancer (not registered as a
              formal business or company)
            </li>
            <li>Yaoundé, Cameroon</li>
            <li>
              <a href="mailto:contact@nsdev.me" className={linkClass}>
                contact@nsdev.me
              </a>
            </li>
            <li>
              <a href="tel:+237652025901" className={linkClass}>
                +237 652 02 59 01
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Hosting
          </h2>
          <ul className="mt-3 space-y-1 font-body text-on-dark-muted">
            <li>Cloudflare, Inc.</li>
            <li>101 Townsend Street, San Francisco, CA 94107, United States</li>
            <li>
              <a
                href="https://cloudflare.com"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                cloudflare.com
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Intellectual Property
          </h2>
          <p className="mt-3 font-body text-on-dark-muted">
            All text, images, and code on this website are the property of Njoh
            Simplice Junior unless otherwise credited. Reproduction,
            distribution, or reuse of this content, in whole or in part, without
            prior written permission is not authorized.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Personal Data
          </h2>
          <p className="mt-3 font-body text-on-dark-muted">
            The contact form on this site collects your first name, last name,
            phone number, email address, subject, and message. This information
            is used solely to respond to the inquiry you submit.
          </p>
          {/* TODO: state exactly how submissions are delivered/stored once the
              Contact page backend is built (e.g. "sent directly by email via
              [service], not stored in any database" vs "stored in [X] for Y
              days"). Insert the real mechanism here before publishing — don't
              leave this vague. */}
          <p className="mt-3 font-body text-on-dark-muted">
            Google Analytics (GA4) and Google Search Console are used to
            understand site traffic and search performance. Search Console
            itself does not set cookies on visitors (it only verifies site
            ownership); Google Analytics does collect usage data — see Cookies
            below.
          </p>
          <p className="mt-3 font-body text-on-dark-muted">
            You can request access to, correction of, or deletion of your data
            at any time by emailing{" "}
            <a href="mailto:contact@nsdev.me" className={linkClass}>
              contact@nsdev.me
            </a>
            .
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Cookies
          </h2>
          <p className="mt-3 font-body text-on-dark-muted">
            Google Analytics (GA4) sets cookies on this site to measure traffic
            and usage patterns. It only runs after you accept the cookie banner
            shown on your first visit — declining (or not responding) keeps it
            off.
          </p>
          <div className="mt-4">
            <Button variant="secondary" onClick={resetCookieConsent}>
              Manage cookie preferences
            </Button>
          </div>
        </section>

        <Link to="/" className={`mt-12 inline-block font-body ${linkClass}`}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
