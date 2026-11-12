import { Navigate, Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FolderKanban, Cpu, LayoutGrid, Briefcase, LogOut, ExternalLink } from "lucide-react";
import { getToken, setToken } from "@/lib/api";

const nav = [
  { to: "/admin/projects", label: "Projets", icon: FolderKanban },
  { to: "/admin/skills", label: "Compétences", icon: Cpu },
  { to: "/admin/services", label: "Services", icon: LayoutGrid },
  { to: "/admin/experience", label: "Expérience", icon: Briefcase },
];

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!getToken()) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    setToken(null);
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="flex w-60 shrink-0 flex-col border-r border-border p-4">
        <Link to="/admin" className="mb-8 flex items-center gap-2.5 px-2">
          <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg" />
          <span className="text-sm font-semibold">Admin</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
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
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-1 border-t border-border pt-3">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
            <ExternalLink className="h-4 w-4" /> Voir le site
          </a>
          <button onClick={logout} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
};
