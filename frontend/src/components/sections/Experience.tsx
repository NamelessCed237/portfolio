import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const EXPERIENCE = [
  { key: "lazer", tags: ["React", "React Native", "NestJS", "Laravel"] },
  { key: "hackathon", tags: ["Blockchain", "Web3", "Smart Contracts"] },
];

const EDUCATION = ["licence", "gce"];

export const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="section">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeader eyebrow={t("experience.subtitle")} title={t("experience.title")} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Experience timeline */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <Briefcase className="h-4 w-4 text-primary" /> {t("experience.title")}
            </h3>
            <div className="relative space-y-4 pl-6">
              <div className="absolute left-[7px] top-2 h-full w-px bg-border" />
              {EXPERIENCE.map((e, i) => (
                <motion.div
                  key={e.key}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="relative"
                >
                  <span className="absolute -left-6 top-2 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-background bg-primary" />
                  <div className="card-surface p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-base font-semibold">{t(`experience.timeline.${e.key}.title`)}</h4>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" /> {t(`experience.timeline.${e.key}.period`)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-primary">{t(`experience.timeline.${e.key}.company`)}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {t(`experience.timeline.${e.key}.location`)}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {t(`experience.timeline.${e.key}.description`)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {e.tags.map((tag) => (
                        <span key={tag} className="chip-soft px-2 py-0.5 text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-primary" /> {t("formation.title")}
            </h3>
            <div className="space-y-4">
              {EDUCATION.map((e, i) => (
                <motion.div
                  key={e}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="card-surface p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" /> {t(`formation.list.${e}.period`)}
                    </span>
                  </div>
                  <h4 className="mt-2 text-base font-semibold">{t(`formation.list.${e}.title`)}</h4>
                  <p className="mt-1 text-sm text-primary">{t(`formation.list.${e}.school`)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`formation.list.${e}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
