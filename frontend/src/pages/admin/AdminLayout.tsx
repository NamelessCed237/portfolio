import { NavLink, Outlet, Link } from "react-router-dom";
import { ArrowLeft, LayoutDashboard, UserRound } from "lucide-react";
import { COLLECTIONS } from "@/lib/content/schema";
import { DynamicIcon } from "@/components/DynamicIcon";

const linkClass = "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors";
const idleClass = "text-muted-foreground hover:bg-muted hover:text-foreground";
const activeClass = "bg-muted font-medium text-foreground";

/** Sidebar shell for every dashboard screen. */
export const AdminLayout = () => (
  <div className="relative min-h-screen overflow-hidden bg-card/30">
    <div className="grid-bg absolute inset-0 opacity-30" />
    <div className="glow-blob left-[-6%] top-[10%] h-72 w-72 bg-primary/20" />
    <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 lg:flex-row">
      <aside className="lg:w-60 lg:shrink-0">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au site
        </Link>

        <nav className="space-y-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `${linkClass} ${isActive ? activeClass : idleClass}`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Tableau de bord
          </NavLink>

          <NavLink
            to="/admin/profile"
            className={({ isActive }) => `${linkClass} ${isActive ? activeClass : idleClass}`}
          >
            <UserRound className="h-4 w-4" />
            Profil
          </NavLink>

          {COLLECTIONS.map((collection) => (
            <NavLink
              key={collection.key}
              to={`/admin/${collection.key}`}
              className={({ isActive }) => `${linkClass} ${isActive ? activeClass : idleClass}`}
            >
              <DynamicIcon name={collection.icon} className="h-4 w-4" />
              {collection.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  </div>
);
