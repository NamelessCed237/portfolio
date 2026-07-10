import { useTranslation } from "react-i18next";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("fr") ? "fr" : "en";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    document.documentElement.lang = lng;
  };

  return (
    <div className="flex items-center rounded-lg border border-border/70 bg-card/40 p-0.5 font-mono text-xs">
      {(["fr", "en"] as const).map((lng) => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          className={`rounded-md px-2.5 py-1 uppercase transition-colors ${
            current === lng
              ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label={`Switch to ${lng.toUpperCase()}`}
        >
          {lng}
        </button>
      ))}
    </div>
  );
};
