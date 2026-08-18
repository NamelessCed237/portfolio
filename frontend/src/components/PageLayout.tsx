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
      <Navbar />
      <main className={SELF_SPACED_ROUTES.includes(pathname) ? undefined : "pt-16"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
