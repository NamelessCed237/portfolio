import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { ExternalLink, Send, Globe, Coins } from "lucide-react";

export const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      key: "transfergratis",
      titleKey: "projects.list.transfergratis.title",
      descKey: "projects.list.transfergratis.description",
      tech: ["React", "NestJS", "Mobile Money"],
      icon: Send,
      image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&h=600&fit=crop",
    },
    {
      key: "portfolio",
      titleKey: "projects.list.portfolio.title",
      descKey: "projects.list.portfolio.description",
      tech: ["React", "TypeScript", "Tailwind"],
      icon: Globe,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      key: "tulivu",
      titleKey: "projects.list.tulivu.title",
      descKey: "projects.list.tulivu.description",
      tech: ["USDT", "USDC", "Ethereum", "Tron"],
      icon: Coins,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    },
  ];

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="glow-blob right-[-8%] top-[20%] h-72 w-72 bg-secondary/30" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="featured work"
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
          dot
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glow-card group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={t(project.titleKey)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-lg border border-border/60 bg-background/70 backdrop-blur">
                  <project.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-semibold">{t(project.titleKey)}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(project.descKey)}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="w-full gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary">
                  {t("projects.viewProject")}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
