import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUpAt } from "@/lib/motion";
import { MapPin } from "lucide-react";

export const Timeline = () => {
  const { t } = useTranslation();

  const experiences = [
    { key: "lazer", tech: ["React", "React Native", "NestJS", "Laravel", "PostgreSQL"] },
    { key: "hackathon", tech: ["Blockchain", "Web3", "Smart Contracts"] },
  ];

  return (
    <section id="experience" className="section border-t border-border">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="experience"
          title={t("experience.title")}
          subtitle={t("experience.subtitle")}
        />

        <ol className="space-y-10 border-l border-border pl-8">
          {experiences.map((exp, index) => (
            <motion.li key={exp.key} {...fadeUpAt(index)} className="relative">
              <span className="absolute -left-[35px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />

              <p className="text-sm text-muted-foreground">
                {t(`experience.timeline.${exp.key}.period`)}
              </p>
              <h3 className="mt-1 text-lg font-medium">
                {t(`experience.timeline.${exp.key}.title`)}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {t(`experience.timeline.${exp.key}.company`)}
                <span className="mx-2 text-border">·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {t(`experience.timeline.${exp.key}.location`)}
                </span>
              </p>

              <p className="mt-3 leading-relaxed text-muted-foreground">
                {t(`experience.timeline.${exp.key}.description`)}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
