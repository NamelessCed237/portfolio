import type { ComponentType, CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Code2, Server, Smartphone, Database, Blocks, Settings, Coins, Boxes, Network, Plug } from "lucide-react";
import {
  SiReact, SiTypescript, SiNextdotjs, SiNestjs, SiLaravel,
  SiMysql, SiPostgresql, SiSolidity, SiWeb3Dotjs, SiTether,
} from "react-icons/si";
import { SectionHeader } from "@/components/SectionHeader";

type SkillIcon = ComponentType<{ className?: string; style?: CSSProperties }>;

// Single source of truth for skill logos (DRY).
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

  const categories = [
    { icon: Code2, category: t("skills.categories.frontend"), skills: ["React", "TypeScript", "Next.js"] },
    { icon: Server, category: t("skills.categories.backend"), skills: ["NestJS", "Laravel"] },
    { icon: Smartphone, category: t("skills.categories.mobile"), skills: ["React Native"] },
    { icon: Database, category: t("skills.categories.database"), skills: ["MySQL", "PostgreSQL"] },
    { icon: Blocks, category: t("skills.categories.blockchain"), skills: ["Solidity", "Web3.js", "USDT/USDC", "Tron"] },
    { icon: Settings, category: t("skills.categories.other"), skills: ["Clean Architecture", "REST APIs", "Integrations"] },
  ];

  return (
    <section id="skills" className="section">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeader eyebrow={t("skills.subtitle")} title={t("skills.title")} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="card-surface p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <cat.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const meta = skillMeta[skill];
                  const Icon = meta?.Icon;
                  return (
                    <span key={skill} className="chip-soft px-2.5 py-1 text-sm">
                      {Icon && <Icon className="h-4 w-4" style={meta.color ? { color: meta.color } : undefined} />}
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
