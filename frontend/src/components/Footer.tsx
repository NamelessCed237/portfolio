import { useTranslation } from "react-i18next";
import { NavLink } from "@/components/NavLink";
import { SOCIAL_LINKS } from "@/lib/links";

export const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { to: "/about", label: t("nav.about") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/services", label: t("nav.services") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="flex items-center gap-2.5 font-semibold tracking-tight">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-md object-cover" />
            Bike Cedric
          </p>
          <p className="mt-4 max-w-sm leading-7 text-muted-foreground">{t("footer.tagline")}</p>
        </div>

        <nav className="space-y-3">
          <p className="eyebrow">{t("nav.home")}</p>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-3">
          <p className="eyebrow">{t("contact.info.social")}</p>
          <div className="flex items-center gap-4 pt-1">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="page py-5 text-xs text-muted-foreground">{t("footer.copyright")}</div>
      </div>
    </footer>
  );
};
