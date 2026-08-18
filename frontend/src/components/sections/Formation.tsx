import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUpAt } from "@/lib/motion";
import { GraduationCap } from "lucide-react";

export const Formation = () => {
  const { t } = useTranslation();
  const education = ["licence", "gce"];

  return (
    <section id="formation" className="section border-t border-border">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="education"
          title={t("formation.title")}
          subtitle={t("formation.subtitle")}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {education.map((key, index) => (
            <motion.div key={key} {...fadeUpAt(index)} className="card p-6">
              <div className="flex items-center justify-between gap-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {t(`formation.list.${key}.period`)}
                </span>
              </div>
              <h3 className="mt-4 font-medium">{t(`formation.list.${key}.title`)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(`formation.list.${key}.school`)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(`formation.list.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
