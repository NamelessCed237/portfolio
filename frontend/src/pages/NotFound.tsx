import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("notFound.title")}
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t("notFound.description")}</p>
      <p className="mt-2 font-mono text-sm text-muted-foreground">{location.pathname}</p>
      <Button asChild className="mt-8">
        <Link to="/">{t("notFound.back")}</Link>
      </Button>
    </div>
  );
};

export default NotFound;
