import { useTranslation } from "react-i18next";
import { SOCIAL_LINKS } from "@/lib/links";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold tracking-tight">Bike Cedric</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-muted-foreground">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};
