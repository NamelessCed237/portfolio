import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Blocks } from "lucide-react";

export const AboutIntro = () => {
  const { t } = useTranslation();

  const facts = [
    { Icon: MapPin, label: "Bafoussam, Cameroun" },
    { Icon: Briefcase, label: "Lazer SARL" },
    { Icon: Blocks, label: "Web3 & Blockchain" },
  ];

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="eyebrow mb-3">{t("aboutPage.intro.eyebrow")}</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("aboutPage.intro.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("aboutPage.intro.lead")}</p>

          <div className="mt-8 space-y-4 text-muted-foreground">
            <p className="leading-relaxed">{t("aboutPage.intro.p1")}</p>
            <p className="leading-relaxed">{t("aboutPage.intro.p2")}</p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {facts.map(({ Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
