import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Code2, Server, Smartphone, Database, Blocks, Settings } from "lucide-react";

export const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      icon: Code2,
      category: t("skills.categories.frontend"),
      skills: ["React", "TypeScript", "Next.js"],
    },
    {
      icon: Server,
      category: t("skills.categories.backend"),
      skills: ["NestJS", "Laravel"],
    },
    {
      icon: Smartphone,
      category: t("skills.categories.mobile"),
      skills: ["React Native"],
    },
    {
      icon: Database,
      category: t("skills.categories.database"),
      skills: ["MySQL", "PostgreSQL"],
    },
    {
      icon: Blocks,
      category: t("skills.categories.blockchain"),
      skills: ["Solidity", "Web3.js", "Motoko"],
    },
    {
      icon: Settings,
      category: t("skills.categories.other"),
      skills: ["Clean Architecture", "REST APIs", "Integrations"],
    },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t("skills.title")}</h2>
          <p className="text-muted-foreground text-lg">{t("skills.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl hover-glow"
            >
              <category.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
