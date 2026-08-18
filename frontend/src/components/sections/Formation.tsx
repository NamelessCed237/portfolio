import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

export const Formation = () => {
  const { t } = useTranslation();

  const education = [
    {
      key: "licence",
      titleKey: "formation.list.licence.title",
      schoolKey: "formation.list.licence.school",
      periodKey: "formation.list.licence.period",
      descKey: "formation.list.licence.description",
    },
    {
      key: "gce",
      titleKey: "formation.list.gce.title",
      schoolKey: "formation.list.gce.school",
      periodKey: "formation.list.gce.period",
      descKey: "formation.list.gce.description",
    },
  ];

  return (
    <section id="formation" className="section-padding relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">// education</p>
          <h2 className="text-4xl font-bold">
            {t("formation.title")}<span className="text-primary">.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">{t("formation.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((edu, index) => (
            <motion.div
              key={edu.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="glow-card p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {t(edu.periodKey)}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{t(edu.titleKey)}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{t(edu.schoolKey)}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(edu.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
