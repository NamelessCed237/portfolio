import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { SplitText } from "@/components/anim/SplitText";

const EXPERIENCE = [
  { key: "lazer", tags: ["React", "React Native", "NestJS", "Laravel"] },
  { key: "hackathon", tags: ["Blockchain", "Web3", "Smart Contracts"] },
];
const EDUCATION = ["licence", "gce"];

export const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="section">
      <div className="container-px mx-auto max-w-6xl">
        <span className="eyebrow mb-5">(04) {t("experience.subtitle")}</span>
        <h2 className="headline mb-9 text-[clamp(2.2rem,6vw,4.5rem)]">
          <SplitText text={t("experience.title")} />
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Experience */}
          <div className="lg:col-span-3">
            <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Briefcase className="h-4 w-4 text-primary" /> {t("experience.title")}
            </h3>
            {EXPERIENCE.map((e, i) => (
              <motion.div
                key={e.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-t border-border py-7 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-2xl font-semibold tracking-tight">{t(`experience.timeline.${e.key}.title`)}</h4>
                  <span className="text-sm text-muted-foreground">{t(`experience.timeline.${e.key}.period`)}</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="font-medium text-primary">{t(`experience.timeline.${e.key}.company`)}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {t(`experience.timeline.${e.key}.location`)}
                  </span>
                </div>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                  {t(`experience.timeline.${e.key}.description`)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.tags.map((tag) => (
                    <span key={tag} className="chip-soft px-2.5 py-1 text-xs">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-primary" /> {t("formation.title")}
            </h3>
            {EDUCATION.map((e, i) => (
              <motion.div
                key={e}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-t border-border py-6 first:border-t-0 first:pt-0"
              >
                <span className="text-sm text-muted-foreground">{t(`formation.list.${e}.period`)}</span>
                <h4 className="mt-1 text-lg font-semibold">{t(`formation.list.${e}.title`)}</h4>
                <p className="mt-1 text-sm text-primary">{t(`formation.list.${e}.school`)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`formation.list.${e}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
