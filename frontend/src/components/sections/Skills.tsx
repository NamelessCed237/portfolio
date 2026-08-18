import type { ComponentType, CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Coins, Boxes, Network, Plug } from "lucide-react";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useContent, useLocalized } from "@/lib/content/useContent";
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
  const { content } = useContent();
  const localized = useLocalized();

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="tech stack"
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
          dot
          className="mb-10"
        />

        {/* Solidity import line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 overflow-x-auto rounded-lg border border-border/70 bg-card/50 px-4 py-3 font-mono text-sm"
        >
          <span className="text-secondary">import</span>{" "}
          <span className="text-primary">"@bikecedric/stack/FullStack.sol"</span>
          <span className="text-muted-foreground">;</span>
          <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.skills.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glow-card p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15">
                  <DynamicIcon name={category.icon} className="h-6 w-6 text-primary" />
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {localized(category.level)}
                </span>
              </div>
              <h3 className="mb-3 text-xl font-semibold">{localized(category.title)}</h3>

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
                {category.skills.map((skill) => {
                  const meta = skillMeta[skill];
                  const Icon = meta?.Icon;
                  return (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-card/40 px-2.5 py-1 text-sm text-foreground/80"
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
