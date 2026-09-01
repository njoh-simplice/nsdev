import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";

/** App shell: persistent header + routed page content. */
export default function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-brand-black text-on-dark">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      {/* Reset scroll to top on new navigations; restore it on back/forward. */}
      <ScrollRestoration />
    </div>
  );
}
