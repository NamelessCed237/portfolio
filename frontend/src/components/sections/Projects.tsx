import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight, Send, Globe, Coins } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const PROJECTS = [
  { key: "transfergratis", tags: ["React", "NestJS", "Mobile Money"], icon: Send, href: "https://transfergratis.com", image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=900&h=600&fit=crop" },
  { key: "portfolio", tags: ["React", "TypeScript", "Tailwind"], icon: Globe, href: "/", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop" },
  { key: "tulivu", tags: ["USDT/USDC", "Ethereum", "Tron"], icon: Coins, href: "#", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&h=600&fit=crop" },
];

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="section">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeader eyebrow={t("home.works.title")} title={t("projects.title")} subtitle={t("projects.subtitle")} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.key}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="card-surface group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={t(`projects.list.${p.key}.title`)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-lg border border-border bg-background/80 backdrop-blur">
                  <p.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold">{t(`projects.list.${p.key}.title`)}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(`projects.list.${p.key}.description`)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
