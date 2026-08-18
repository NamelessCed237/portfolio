import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
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
    <section id="about" className="section">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="about me" title={t("about.title")} />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <motion.div {...fadeUp} className="space-y-5">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t("about.description")}
            </p>
            <p className="text-lg font-medium">{t("about.highlight")}</p>

            <Button variant="outline">
              <Download className="h-4 w-4" />
              {t("hero.downloadCV")}
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} {...fadeUpAt(index)} className="card p-6">
                <div className="text-3xl font-semibold tracking-tight">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
