import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { useContent, useLocalized } from "@/lib/content/useContent";
import { Calendar, MapPin, Briefcase } from "lucide-react";

export const Timeline = () => {
  const { t } = useTranslation();
  const { content } = useContent();
  const localized = useLocalized();

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="glow-blob left-[-8%] top-[30%] h-72 w-72 bg-primary/30" />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading eyebrow="experience" title={t("experience.title")} dot>
          <p className="mt-3 text-muted-foreground">{t("experience.subtitle")}</p>
        </SectionHeading>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute left-2 top-2 h-full w-px bg-gradient-to-b from-primary via-secondary/50 to-transparent md:left-3" />

          {content.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative mb-8"
            >
              <div className="absolute -left-[26px] top-6 grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-primary md:-left-[30px]" />

              <div className="glow-card p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    <Briefcase className="h-3.5 w-3.5" />
                    {exp.company}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {localized(exp.period)}
                  </span>
                </div>

                <h3 className="text-xl font-semibold">{localized(exp.title)}</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {exp.location}
                </p>

                <p className="mt-3 leading-relaxed text-muted-foreground">{localized(exp.description)}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border/70 bg-card/40 px-2.5 py-1 text-xs font-medium text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
