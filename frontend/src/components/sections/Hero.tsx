import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "@/lib/links";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-4">{t("hero.greeting")}</p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {t("hero.name")}
          </h1>

          <p className="mt-3 text-xl text-muted-foreground sm:text-2xl">{t("hero.title")}</p>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/projects">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">{t("nav.contact")}</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-5">
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
        </motion.div>
      </div>
    </section>
  );
};
