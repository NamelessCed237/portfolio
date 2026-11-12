import type { ComponentType, CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import {
  SiReact, SiTypescript, SiNextdotjs, SiNestjs, SiLaravel,
  SiMysql, SiPostgresql, SiSolidity, SiWeb3Dotjs, SiTether, SiDocker, SiTailwindcss,
} from "react-icons/si";
import { Coins, Code2 } from "lucide-react";
import { Marquee } from "@/components/anim/Marquee";
import { SplitText } from "@/components/anim/SplitText";
import { useApiData } from "@/lib/useApiData";

type Icon = ComponentType<{ className?: string; style?: CSSProperties }>;

// name -> logo mapping (DRY)
const LOGO: Record<string, { Icon: Icon; color?: string }> = {
  React: { Icon: SiReact, color: "#61DAFB" },
  "React Native": { Icon: SiReact, color: "#61DAFB" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "Next.js": { Icon: SiNextdotjs },
  NestJS: { Icon: SiNestjs, color: "#E0234E" },
  Laravel: { Icon: SiLaravel, color: "#FF2D20" },
  Tailwind: { Icon: SiTailwindcss, color: "#38BDF8" },
  Solidity: { Icon: SiSolidity },
  "Web3.js": { Icon: SiWeb3Dotjs, color: "#F16822" },
  "USDT/USDC": { Icon: SiTether, color: "#26A17B" },
  Tron: { Icon: Coins, color: "#EF060A" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
};

const FALLBACK = [
  "React", "TypeScript", "Next.js", "NestJS", "Laravel", "Tailwind",
  "Solidity", "Web3.js", "USDT/USDC", "Tron", "PostgreSQL", "MySQL", "Docker",
].map((name) => ({ name }));

interface ApiSkill { name: string }

const Pill = ({ name }: { name: string }) => {
  const meta = LOGO[name];
  const Icon = meta?.Icon ?? Code2;
  return (
    <span className="mx-3 inline-flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 text-lg font-medium">
      <Icon className="h-6 w-6" style={meta?.color ? { color: meta.color } : undefined} />
      {name}
    </span>
  );
};

export const Skills = () => {
  const { t } = useTranslation();
  const skills = useApiData<ApiSkill[]>("/skills", FALLBACK);
  const mid = Math.ceil(skills.length / 2);
  const rowA = skills.slice(0, mid);
  const rowB = skills.slice(mid);

  return (
    <section id="skills" className="section overflow-hidden">
      <div className="container-px mx-auto mb-9 max-w-6xl">
        <span className="eyebrow mb-5">(03) {t("skills.subtitle")}</span>
        <h2 className="headline text-[clamp(2.2rem,6vw,4.5rem)]">
          <SplitText text={t("skills.title")} />
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <Marquee duration={32}>
          {rowA.map((s, i) => <Pill key={`${s.name}-${i}`} name={s.name} />)}
        </Marquee>
        <Marquee reverse duration={36}>
          {rowB.map((s, i) => <Pill key={`${s.name}-${i}`} name={s.name} />)}
        </Marquee>
      </div>
    </section>
  );
};
