import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";

export const Timeline = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      hash: "8afeeaf",
      titleKey: "experience.timeline.lazer.title",
      companyKey: "experience.timeline.lazer.company",
      periodKey: "experience.timeline.lazer.period",
      locationKey: "experience.timeline.lazer.location",
      descKey: "experience.timeline.lazer.description",
      tech: ["React", "React Native", "NestJS", "Laravel", "PostgreSQL"],
    },
    {
      hash: "2bae84b",
      titleKey: "experience.timeline.hackathon.title",
      companyKey: "experience.timeline.hackathon.company",
      periodKey: "experience.timeline.hackathon.period",
      locationKey: "experience.timeline.hackathon.location",
      descKey: "experience.timeline.hackathon.description",
      tech: ["Blockchain", "Web3", "Smart Contracts"],
    },
  ];

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="glow-blob left-[-8%] top-[30%] h-72 w-72 bg-primary/30" />
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">// experience</p>
          <h2 className="text-4xl font-bold">
            {t("experience.title")}<span className="text-primary">.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">{t("experience.subtitle")}</p>
        </motion.div>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute left-2 top-2 h-full w-px bg-gradient-to-b from-primary via-secondary/50 to-transparent md:left-3" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.hash}
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
                    {t(exp.companyKey)}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {t(exp.periodKey)}
                  </span>
                </div>

                <h3 className="text-xl font-semibold">{t(exp.titleKey)}</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {t(exp.locationKey)}
                </p>

                <p className="mt-3 leading-relaxed text-muted-foreground">{t(exp.descKey)}</p>

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
