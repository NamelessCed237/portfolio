import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

export const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.projects"), href: "/#projects" },
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-300 ${
          scrolled
            ? "border border-border bg-card/80 shadow-sm backdrop-blur-md"
            : "border border-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 pl-1">
          <img src="/logo.png" alt="Bike Cedric" className="h-8 w-8 rounded-lg" />
          <span className="text-sm font-semibold tracking-tight">Bike Cedric</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <LanguageToggle />
          <Link
            to="/contact"
            className="ml-1 hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-block"
          >
            {t("home.cta.button")}
          </Link>
          <button
            className="ml-1 grid h-9 w-9 place-items-center rounded-full hover:bg-secondary md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background p-5 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-4 text-2xl font-semibold text-foreground hover:bg-secondary"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
