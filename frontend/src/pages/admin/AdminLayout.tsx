import { useEffect, useState } from "react";
import { Navigate, Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FolderKanban, Cpu, LayoutGrid, Briefcase, Newspaper, Inbox, Settings, LogOut, ExternalLink, Menu, X } from "lucide-react";
import { getToken, setToken } from "@/lib/api";

const nav = [
  { to: "/admin/projects", label: "Projets", icon: FolderKanban },
  { to: "/admin/skills", label: "Compétences", icon: Cpu },
  { to: "/admin/services", label: "Services", icon: LayoutGrid },
  { to: "/admin/experience", label: "Expérience", icon: Briefcase },
  { to: "/admin/blog", label: "Blog", icon: Newspaper },
  { to: "/admin/messages", label: "Messages", icon: Inbox },
  { to: "/admin/settings", label: "Paramètres", icon: Settings },
];

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  if (!getToken()) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    setToken(null);
    navigate("/admin/login");
  };

  const sidebarContent = (
    <>
      <Link to="/admin" className="mb-8 flex items-center gap-2.5 px-2">
        <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg" />
        <span className="text-sm font-semibold">Admin</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {nav.map((n) => {
          const active = location.pathname.startsWith(n.to);
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <n.icon className="h-4 w-4 shrink-0" />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-border pt-3">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
          <ExternalLink className="h-4 w-4 shrink-0" /> Voir le site
        </a>
        <button onClick={logout} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
          <LogOut className="h-4 w-4 shrink-0" /> Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
        <Link to="/admin" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="" className="h-7 w-7 rounded-lg" />
          <span className="text-sm font-semibold">Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground hover:bg-secondary"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-10 flex w-64 max-w-[80vw] flex-col border-r border-border bg-background p-4 shadow-xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer le menu"
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border p-4 md:flex">
        {sidebarContent}
      </aside>

      <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
};
