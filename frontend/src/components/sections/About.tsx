import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { fadeUp, fadeUpAt } from "@/lib/motion";

export const About = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "2+", label: t("about.stats.experience") },
    { value: "10+", label: t("about.stats.projects") },
    { value: "15+", label: t("about.stats.clients") },
    { value: "3+", label: "Blockchains" },
  ];

  return (
    <Section id="about" eyebrow="about me" title={t("about.title")}>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div {...fadeUp}>
          <p className="text-lg leading-8 text-muted-foreground">{t("about.description")}</p>
          <p className="mt-5 border-l-2 border-primary pl-5 text-lg font-medium leading-8">
            {t("about.highlight")}
          </p>

          <Button variant="outline" className="mt-8">
            <Download className="h-4 w-4" />
            {t("hero.downloadCV")}
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} {...fadeUpAt(index)} className="card p-6">
              <div className="text-4xl font-semibold text-primary">{stat.value}</div>
              <div className="mt-2 text-sm leading-6 text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
