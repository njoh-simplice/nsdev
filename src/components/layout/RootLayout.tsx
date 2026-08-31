import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

/** App shell: persistent header + routed page content. */
export default function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-brand-black text-on-dark">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
