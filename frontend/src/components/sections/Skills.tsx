import type { ComponentType, CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import {
  SiReact, SiTypescript, SiNextdotjs, SiNestjs, SiLaravel,
  SiMysql, SiPostgresql, SiSolidity, SiWeb3Dotjs, SiTether, SiDocker, SiTailwindcss,
} from "react-icons/si";
import { Coins } from "lucide-react";
import { Marquee } from "@/components/anim/Marquee";
import { SplitText } from "@/components/anim/SplitText";

type Icon = ComponentType<{ className?: string; style?: CSSProperties }>;

const ROW_A: { name: string; Icon: Icon; color?: string }[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
];

const ROW_B: { name: string; Icon: Icon; color?: string }[] = [
  { name: "Solidity", Icon: SiSolidity },
  { name: "Web3.js", Icon: SiWeb3Dotjs, color: "#F16822" },
  { name: "USDT/USDC", Icon: SiTether, color: "#26A17B" },
  { name: "Tron", Icon: Coins, color: "#EF060A" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
];

const Pill = ({ name, Icon, color }: { name: string; Icon: Icon; color?: string }) => (
  <span className="mx-3 inline-flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 text-lg font-medium">
    <Icon className="h-6 w-6" style={color ? { color } : undefined} />
    {name}
  </span>
);

export const Skills = () => {
  const { t } = useTranslation();

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
          {ROW_A.map((s) => <Pill key={s.name} {...s} />)}
        </Marquee>
        <Marquee reverse duration={36}>
          {ROW_B.map((s) => <Pill key={s.name} {...s} />)}
        </Marquee>
      </div>
    </section>
  );
};
