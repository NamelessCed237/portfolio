import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ExternalLink, LayoutDashboard, LogOut, Menu, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/DynamicIcon";
import { COLLECTIONS } from "@/lib/content/schema";
import { useContent } from "@/lib/content/useContent";
import { signOut } from "@/lib/content/store";

const linkClass =
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const idleClass = "text-muted-foreground hover:bg-muted/60 hover:text-foreground";
const activeClass = "bg-primary/10 font-medium text-primary";

/** Shell for every dashboard screen: brand, navigation, content column. */
export const AdminLayout = () => {
  const { content, status } = useContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = (
    <nav className="space-y-6">
      <div className="space-y-1">
        <p className="px-3 pb-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Général
        </p>
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
      </div>

      <div className="space-y-1">
        <p className="px-3 pb-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Contenu
        </p>
        {COLLECTIONS.map((collection) => (
          <NavLink
            key={collection.key}
            to={`/admin/${collection.key}`}
            className={({ isActive }) => `${linkClass} ${isActive ? activeClass : idleClass}`}
          >
            <DynamicIcon name={collection.icon} className="h-4 w-4" />
            <span className="flex-1">{collection.label}</span>
            <span className="font-mono text-xs text-muted-foreground">
              {content[collection.key].length}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );

  const footer = (
    <div className="space-y-1 border-t border-border/60 pt-4">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${linkClass} ${idleClass}`}
      >
        <ExternalLink className="h-4 w-4" />
        Voir le site
      </a>
      <button
        type="button"
        className={`w-full ${linkClass} ${idleClass}`}
        onClick={async () => {
          await signOut();
          navigate("/");
        }}
      >
        <LogOut className="h-4 w-4" />
        Se déconnecter
      </button>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-card/20">
      <div className="grid-bg absolute inset-0 opacity-25" />
      <div className="glow-blob left-[-8%] top-[6%] h-72 w-72 bg-primary/15" />

      <div className="relative mx-auto flex max-w-[1400px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-border/60 bg-background/60 px-4 py-6 backdrop-blur lg:flex">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 px-3">
              <img src="/logo.png" alt="" className="h-8 w-8 rounded-md object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{content.profile.name}</p>
                <p className="font-mono text-[11px] text-muted-foreground">admin</p>
              </div>
            </div>
            {navigation}
          </div>
          {footer}
        </aside>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label="Fermer le menu"
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <aside className="absolute inset-y-0 left-0 flex w-72 flex-col justify-between overflow-y-auto border-r border-border bg-background px-4 py-6">
              <div className="space-y-6" onClick={() => setMenuOpen(false)}>
                <div className="flex items-center justify-between px-3">
                  <span className="text-sm font-semibold">{content.profile.name}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Fermer"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {navigation}
              </div>
              {footer}
            </aside>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3 lg:hidden">
            <Button size="icon" variant="ghost" aria-label="Menu" onClick={() => setMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <span className="text-sm font-semibold">Administration</span>
          </div>

          {status === "offline" && (
            <p className="border-b border-destructive/40 bg-destructive/10 px-4 py-2 text-center text-xs text-destructive md:px-6">
              Base de données injoignable — le contenu affiché vient du code et vos enregistrements
              échoueront.
            </p>
          )}

          <main className="px-4 pb-16 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
