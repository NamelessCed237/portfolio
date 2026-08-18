import type { ComponentType, CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Tag } from "@/components/ui/tag";
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

// Single source of truth for skill logos. `color` is the brand colour; omit it
// to inherit the theme text colour (e.g. dark-on-dark brands).
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

const categories = [
  { key: "frontend", Icon: Code2, skills: ["React", "TypeScript", "Next.js"] },
  { key: "backend", Icon: Server, skills: ["NestJS", "Laravel"] },
  { key: "mobile", Icon: Smartphone, skills: ["React Native"] },
  { key: "database", Icon: Database, skills: ["MySQL", "PostgreSQL"] },
  { key: "blockchain", Icon: Blocks, skills: ["Solidity", "Web3.js", "USDT/USDC", "Tron"] },
  { key: "other", Icon: Settings, skills: ["Clean Architecture", "REST APIs", "Integrations"] },
];

export const Skills = () => {
  const { t } = useTranslation();

  return (
    <Section
      id="skills"
      eyebrow="tech stack"
      title={t("skills.title")}
      subtitle={t("skills.subtitle")}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ key, Icon, skills }, index) => (
          <motion.div key={key} {...fadeUpAt(index)} className="card card-interactive p-7">
            <div className="flex items-center gap-3.5">
              <span className="icon-badge">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">{t(`skills.categories.${key}`)}</h3>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => {
                const meta = skillMeta[skill];
                const BrandIcon = meta?.Icon;
                return (
                  <Tag key={skill}>
                    {BrandIcon && (
                      <BrandIcon
                        className="h-4 w-4"
                        style={meta.color ? { color: meta.color } : undefined}
                      />
                    )}
                    {skill}
                  </Tag>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
