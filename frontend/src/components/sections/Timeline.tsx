import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Tag } from "@/components/ui/tag";
import { fadeUpAt } from "@/lib/motion";
import { MapPin } from "lucide-react";

const experiences = [
  { key: "lazer", tech: ["React", "React Native", "NestJS", "Laravel", "PostgreSQL"] },
  { key: "hackathon", tech: ["Blockchain", "Web3", "Smart Contracts"] },
];

export const Timeline = () => {
  const { t } = useTranslation();

  return (
    <Section
      id="experience"
      eyebrow="experience"
      title={t("experience.title")}
      subtitle={t("experience.subtitle")}
      narrow
    >
      <ol className="relative space-y-12 border-l border-border pl-8 sm:pl-10">
        {experiences.map(({ key, tech }, index) => (
          <motion.li key={key} {...fadeUpAt(index)} className="relative">
            <span className="absolute -left-[41px] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-primary sm:-left-[49px]" />

            <p className="text-sm font-medium text-primary">
              {t(`experience.timeline.${key}.period`)}
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {t(`experience.timeline.${key}.title`)}
            </h3>

            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {t(`experience.timeline.${key}.company`)}
              </span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {t(`experience.timeline.${key}.location`)}
              </span>
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              {t(`experience.timeline.${key}.description`)}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {tech.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
};
