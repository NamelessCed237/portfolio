import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { fadeUpAt } from "@/lib/motion";
import { GraduationCap } from "lucide-react";

const education = ["licence", "gce"];

export const Formation = () => {
  const { t } = useTranslation();

  return (
    <Section
      id="formation"
      eyebrow="education"
      title={t("formation.title")}
      subtitle={t("formation.subtitle")}
      narrow
      tinted
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {education.map((key, index) => (
          <motion.div key={key} {...fadeUpAt(index)} className="card p-7">
            <div className="flex items-start justify-between gap-4">
              <span className="icon-badge">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="text-sm text-muted-foreground">
                {t(`formation.list.${key}.period`)}
              </span>
            </div>

            <h3 className="mt-5 text-lg font-semibold">{t(`formation.list.${key}.title`)}</h3>
            <p className="mt-1 text-sm font-medium text-primary">
              {t(`formation.list.${key}.school`)}
            </p>
            <p className="mt-3 leading-7 text-muted-foreground">
              {t(`formation.list.${key}.description`)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
