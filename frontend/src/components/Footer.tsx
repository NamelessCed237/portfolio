import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, ArrowUp, FileDown } from "lucide-react";
import { useApiData } from "@/lib/useApiData";

export const Footer = () => {
  const { t } = useTranslation();
  const settings = useApiData<Record<string, string>>("/settings", {});
  const cvUrl = settings.cvUrl;

  const links = [
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.projects"), href: "/#projects" },
    { label: t("nav.services"), href: "/#services" },
    { label: "Blog", href: "/blog" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  const socials = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:contact@bikecedric.dev", label: "Email" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="container-px mx-auto max-w-6xl py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Bike Cedric" className="h-9 w-9 rounded-lg" />
              <span className="text-base font-semibold tracking-tight">Bike Cedric</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("footer.tagline")}</p>
            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
              >
                <FileDown className="h-4 w-4" /> {t("hero.downloadCV")}
              </a>
            )}
            <div className="mt-4 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <s.icon className="h-[17px] w-[17px]" />
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-col gap-2.5">
            <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Navigation</span>
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm link-accent">{l.label}</a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">{t("footer.copyright")}</p>
          <p className="text-xs text-muted-foreground">Bafoussam, Cameroun</p>
          <a href="#top" className="inline-flex items-center gap-1.5 text-xs font-medium link-accent">
            {t("home.scroll")} <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
