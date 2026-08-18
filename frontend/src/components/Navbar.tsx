import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/services", label: t("nav.services") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <NavLink to="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <img src="/logo.png" alt="" className="h-8 w-8 rounded-md object-cover" />
          Bike Cedric
        </NavLink>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground font-medium"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-6xl space-y-1 px-6 py-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeClassName="text-foreground font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
