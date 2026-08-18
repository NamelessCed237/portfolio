import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Blocks } from "lucide-react";

const facts = [
  { Icon: MapPin, label: "Bafoussam, Cameroun" },
  { Icon: Briefcase, label: "Lazer SARL" },
  { Icon: Blocks, label: "Web3 & Blockchain" },
];

export const AboutIntro = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-wash border-b border-border">
      <div className="page page-narrow py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{t("aboutPage.intro.eyebrow")}</p>

          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            {t("aboutPage.intro.title")}
          </h1>

          <p className="mt-5 text-xl leading-8 text-muted-foreground">
            {t("aboutPage.intro.lead")}
          </p>

          <div className="mt-8 space-y-5 text-lg leading-8 text-muted-foreground">
            <p>{t("aboutPage.intro.p1")}</p>
            <p>{t("aboutPage.intro.p2")}</p>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2">
            {facts.map(({ Icon, label }) => (
              <li key={label} className="tag">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
