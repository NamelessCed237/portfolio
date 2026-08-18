import { DynamicIcon } from "@/components/DynamicIcon";
import { useContent } from "@/lib/content/useContent";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  const { profile } = useContent().content;

  return (
    <footer className="relative border-t border-border bg-card/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">{profile.name}</h3>
            <p className="text-muted-foreground">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("contact.info.social")}</h4>
            <div className="flex space-x-4">
              {profile.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <DynamicIcon name={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">{t("footer.copyright")}</p>
            <p className="text-sm text-muted-foreground mt-2">{t("footer.built")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
