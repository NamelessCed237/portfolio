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
      level: "Expert",
      percent: 95,
    },
    {
      icon: Server,
      category: t("skills.categories.backend"),
      skills: ["NestJS", "Laravel"],
      level: "Avancé",
      percent: 88,
    },
    {
      icon: Smartphone,
      category: t("skills.categories.mobile"),
      skills: ["React Native"],
      level: "Avancé",
      percent: 82,
    },
    {
      icon: Database,
      category: t("skills.categories.database"),
      skills: ["MySQL", "PostgreSQL"],
      level: "Avancé",
      percent: 85,
    },
    {
      icon: Blocks,
      category: t("skills.categories.blockchain"),
      skills: ["Solidity", "Web3.js", "Motoko"],
      level: "Avancé",
      percent: 80,
    },
    {
      icon: Settings,
      category: t("skills.categories.other"),
      skills: ["Clean Architecture", "REST APIs", "Integrations"],
      level: "Expert",
      percent: 90,
    },
  ];

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">// tech stack</p>
          <h2 className="mb-4 text-4xl font-bold">
            {t("skills.title")}<span className="text-primary">.</span>
          </h2>
          <p className="text-lg text-muted-foreground">{t("skills.subtitle")}</p>
        </motion.div>

        {/* npm install terminal line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 overflow-x-auto rounded-lg border border-border/70 bg-[hsl(200_35%_6%)]/90 px-4 py-3 font-mono text-sm"
        >
          <span className="text-primary">$</span>{" "}
          <span className="text-muted-foreground">npm install</span>{" "}
          <span className="text-foreground/90">react solidity web3 nestjs hardhat tailwind</span>
          <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glow-card p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {category.level}
                </span>
              </div>
              <h3 className="mb-3 text-xl font-semibold">{category.category}</h3>

              {/* progress bar */}
              <div className="mb-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.08 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary"
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
