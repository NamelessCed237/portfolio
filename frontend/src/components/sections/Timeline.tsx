import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

export const Timeline = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      type: "work",
      titleKey: "experience.timeline.current.title",
      companyKey: "experience.timeline.current.company",
      periodKey: "experience.timeline.current.period",
      descKey: "experience.timeline.current.description",
    },
    {
      type: "work",
      titleKey: "experience.timeline.junior.title",
      companyKey: "experience.timeline.junior.company",
      periodKey: "experience.timeline.junior.period",
      descKey: "experience.timeline.junior.description",
    },
    {
      type: "education",
      titleKey: "experience.timeline.degree.title",
      companyKey: "experience.timeline.degree.school",
      periodKey: "experience.timeline.degree.period",
      descKey: "experience.timeline.degree.description",
    },
  ];

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t("experience.title")}</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.titleKey}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? "pr-1/2 text-right" : "pl-1/2 text-left"
              }`}
            >
              <div
                className={`glass-card p-6 rounded-xl ${
                  index % 2 === 0 ? "mr-8" : "ml-8"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {exp.type === "work" ? (
                    <Briefcase className="h-5 w-5 text-primary" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-secondary" />
                  )}
                  <h3 className="text-xl font-semibold">{t(exp.titleKey)}</h3>
                </div>
                <p className="text-primary font-medium mb-2">{t(exp.companyKey)}</p>
                <p className="text-sm text-muted-foreground mb-3">{t(exp.periodKey)}</p>
                <p className="text-muted-foreground">{t(exp.descKey)}</p>
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
