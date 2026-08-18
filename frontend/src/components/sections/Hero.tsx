import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "@/lib/links";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-wash border-b border-border">
      <div className="page py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="tag bg-card/70 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {t("hero.availability")}
          </span>

          <p className="eyebrow mt-8">{t("hero.greeting")}</p>

          <h1 className="mt-4 text-[2.75rem] font-semibold leading-[1.05] sm:text-6xl">
            {t("hero.name")}
          </h1>

          <p className="mt-4 text-xl font-medium text-muted-foreground sm:text-2xl">
            {t("hero.title")}
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("hero.subtitle")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group">
              <Link to="/projects">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">{t("nav.contact")}</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border pt-8">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Bafoussam, Cameroun
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-4">
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
        </motion.div>
      </div>
    </section>
  );
};
