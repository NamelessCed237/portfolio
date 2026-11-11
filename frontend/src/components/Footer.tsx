import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.projects"), href: "/#projects" },
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="container-px mx-auto max-w-6xl py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Bike Cedric" className="h-9 w-9 rounded-lg" />
              <span className="text-base font-semibold">Bike Cedric</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">{t("footer.tagline")}</p>
            <div className="mt-4 flex gap-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"><Github className="h-[18px] w-[18px]" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"><Linkedin className="h-[18px] w-[18px]" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"><Twitter className="h-[18px] w-[18px]" /></a>
            </div>
          </div>

          <nav className="flex flex-col gap-2.5">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm link-accent">{l.label}</a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">{t("footer.copyright")}</p>
          <p className="text-xs text-muted-foreground">Bafoussam, Cameroun</p>
          <a href="#top" className="inline-flex items-center gap-1.5 text-xs font-medium link-accent">
            Haut de page <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
