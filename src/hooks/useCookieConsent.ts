import { useCallback, useEffect, useState } from "react";
import { loadAnalytics } from "../libs/analytics";

export type ConsentChoice = "accepted" | "declined";

/** Shared with the "manage cookie preferences" reset control on the Legal
 *  Mentions page — keep both in sync if this ever changes. */
export const COOKIE_CONSENT_STORAGE_KEY = "nsdev-cookie-consent";

function readStoredChoice(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    // localStorage unavailable (private mode, blocked, etc.) — treat as no
    // choice made yet; the banner just re-shows next visit.
    return null;
  }
}

/**
 * GDPR-style consent gate: GA4 never loads until the visitor explicitly
 * accepts. The choice is remembered in localStorage; `choice === null` means
 * no decision has been made yet, which is what shows the banner.
 */
export function useCookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(readStoredChoice);

  // Returning visitor who already accepted: load GA4 without showing the
  // banner again.
  useEffect(() => {
    if (choice === "accepted") loadAnalytics();
  }, [choice]);

  const accept = useCallback(() => {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "accepted");
    } catch {
      // Storage failed — consent still holds for this page view.
    }
    setChoice("accepted");
  }, []);

  const decline = useCallback(() => {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "declined");
    } catch {
      // ignore
    }
    setChoice("declined");
  }, []);

  return { choice, accept, decline };
}
