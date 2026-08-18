import type { ComponentType, CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUpAt } from "@/lib/motion";
import { Code2, Server, Smartphone, Database, Blocks, Settings, Coins, Boxes, Network, Plug } from "lucide-react";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiNestjs,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiSolidity,
  SiWeb3Dotjs,
  SiTether,
} from "react-icons/si";

type SkillIcon = ComponentType<{ className?: string; style?: CSSProperties }>;

// Single source of truth for skill logos (DRY). `color` is the brand color;
// omit it to inherit the theme text color (e.g. dark-on-dark brands).
const skillMeta: Record<string, { Icon: SkillIcon; color?: string }> = {
  React: { Icon: SiReact, color: "#61DAFB" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "Next.js": { Icon: SiNextdotjs },
  NestJS: { Icon: SiNestjs, color: "#E0234E" },
  Laravel: { Icon: SiLaravel, color: "#FF2D20" },
  "React Native": { Icon: SiReact, color: "#61DAFB" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  Solidity: { Icon: SiSolidity },
  "Web3.js": { Icon: SiWeb3Dotjs, color: "#F16822" },
  "USDT/USDC": { Icon: SiTether, color: "#26A17B" },
  Tron: { Icon: Coins, color: "#EF060A" },
  "Clean Architecture": { Icon: Boxes },
  "REST APIs": { Icon: Network },
  Integrations: { Icon: Plug },
};

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
      skills: ["Solidity", "Web3.js", "USDT/USDC", "Tron"],
    },
    {
      icon: Settings,
      category: t("skills.categories.other"),
      skills: ["Clean Architecture", "REST APIs", "Integrations"],
    },
  ];

  return (
    <section id="skills" className="section border-t border-border">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="tech stack"
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              {...fadeUpAt(index)}
              className="card card-hover p-6"
            >
              <div className="flex items-center gap-3">
                <category.icon className="h-5 w-5 text-primary" />
                <h3 className="font-medium">{category.category}</h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const meta = skillMeta[skill];
                  const Icon = meta?.Icon;
                  return (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-sm text-muted-foreground"
                    >
                      {Icon && (
                        <Icon
                          className="h-4 w-4"
                          style={meta.color ? { color: meta.color } : undefined}
                        />
                      )}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
