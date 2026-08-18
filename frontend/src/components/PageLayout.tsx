import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/** Chrome shared by every routed page: navbar, content, footer. */
export const PageLayout = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Navbar />
    {/* pt-16 clears the fixed header. */}
    <main className="flex-1 pt-16">
      <Outlet />
    </main>
    <Footer />
  </div>
);
