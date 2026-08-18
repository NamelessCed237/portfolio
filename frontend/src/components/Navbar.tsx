import { useEffect, useState } from "react";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  // The header sits on the page background and only gains its hairline and
  // shadow once content scrolls under it.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/services", label: t("nav.services") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-colors ${
        isScrolled || isMobileMenuOpen ? "border-border" : "border-transparent"
      }`}
    >
      <nav className="page flex h-16 items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 rounded-sm font-semibold tracking-tight"
        >
          <img src="/logo.png" alt="" className="h-8 w-8 rounded-md object-cover" />
          Bike Cedric
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeClassName="bg-muted text-foreground font-medium"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
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
          <div className="page space-y-1 py-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeClassName="bg-muted text-foreground font-medium"
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
