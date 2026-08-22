import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/**
 * Chrome shared by every routed page: fixed navbar, content, footer.
 * Pages whose first section carries its own top spacing opt out of the offset.
 */
const SELF_SPACED_ROUTES = ["/", "/about"];

export const PageLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* First stop for a keyboard user, ahead of the whole navigation. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main
        id="main"
        className={SELF_SPACED_ROUTES.includes(pathname) ? undefined : "pt-16"}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
