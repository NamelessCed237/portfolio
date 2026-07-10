import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calendar, GitCommit } from "lucide-react";

export const Timeline = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      hash: "8afeeaf",
      titleKey: "experience.timeline.current.title",
      companyKey: "experience.timeline.current.company",
      periodKey: "experience.timeline.current.period",
      descKey: "experience.timeline.current.description",
      tech: ["React", "React Native", "Node.js", "Firebase", "REST API"],
    },
    {
      hash: "2bae84b",
      titleKey: "experience.timeline.junior.title",
      companyKey: "experience.timeline.junior.company",
      periodKey: "experience.timeline.junior.period",
      descKey: "experience.timeline.junior.description",
      tech: ["React", "Laravel", "MySQL", "Web3.js"],
    },
    {
      hash: "c1d0e9a",
      titleKey: "experience.timeline.degree.title",
      companyKey: "experience.timeline.degree.school",
      periodKey: "experience.timeline.degree.period",
      descKey: "experience.timeline.degree.description",
      tech: ["Computer Science", "Software Engineering"],
    },
  ];

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="glow-blob left-[-8%] top-[30%] h-72 w-72 bg-primary/20" />
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">// journey</p>
          <h2 className="text-4xl font-bold">
            {t("experience.title")}<span className="text-primary">.</span>
          </h2>
          <p className="mt-3 font-mono text-sm text-muted-foreground">— {"{ git log --author=cedric }"} —</p>
        </motion.div>

        <div className="relative pl-8 md:pl-10">
          {/* vertical git line */}
          <div className="absolute left-2 top-2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent md:left-3" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.hash}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative mb-10"
            >
              {/* commit node */}
              <div className="absolute -left-[26px] top-6 grid h-5 w-5 place-items-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary shadow-[0_0_14px] shadow-primary/60 md:-left-[30px]">
                <GitCommit className="h-3 w-3 text-primary-foreground" />
              </div>

              <div className="glow-card p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    commit <span className="text-primary">{exp.hash}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {t(exp.periodKey)}
                  </span>
                </div>

                <h3 className="text-xl font-semibold">{t(exp.titleKey)}</h3>
                <p className="mt-1 font-medium text-primary">{t(exp.companyKey)}</p>

                <p className="mt-3 border-l-2 border-primary/40 pl-3 font-mono text-sm leading-relaxed text-muted-foreground">
                  <span className="text-primary"># </span>
                  {t(exp.descKey)}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-secondary/30 bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary"
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
