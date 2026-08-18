import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { useContent, useLocalized } from "@/lib/content/useContent";
import { GraduationCap, Calendar } from "lucide-react";

export const Formation = () => {
  const { t } = useTranslation();
  const { content } = useContent();
  const localized = useLocalized();

  return (
    <section id="formation" className="section-padding relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading eyebrow="education" title={t("formation.title")} dot>
          <p className="mt-3 text-muted-foreground">{t("formation.subtitle")}</p>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {content.education.map((edu, index) => (
            <motion.div
              key={edu.id}
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
                  {localized(edu.period)}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{localized(edu.title)}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{edu.school}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{localized(edu.description)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
