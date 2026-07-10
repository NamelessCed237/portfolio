import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      titleKey: "projects.list.ecommerce.title",
      descKey: "projects.list.ecommerce.description",
      tech: ["React", "NestJS", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    },
    {
      titleKey: "projects.list.defi.title",
      descKey: "projects.list.defi.description",
      tech: ["Next.js", "Web3.js", "Solidity"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    },
    {
      titleKey: "projects.list.mobile.title",
      descKey: "projects.list.mobile.description",
      tech: ["React Native", "TypeScript"],
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
    },
    {
      titleKey: "projects.list.api.title",
      descKey: "projects.list.api.description",
      tech: ["Laravel", "MySQL", "APIs"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      titleKey: "projects.list.notion.title",
      descKey: "projects.list.notion.description",
      tech: ["TypeScript", "Notion API"],
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    },
    {
      titleKey: "projects.list.payment.title",
      descKey: "projects.list.payment.description",
      tech: ["React", "USDT", "Web3"],
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop",
    },
  ];

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="glow-blob right-[-8%] top-[20%] h-72 w-72 bg-secondary/25" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">// featured work</p>
          <h2 className="mb-4 text-4xl font-bold">{t("projects.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("projects.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glow-card group overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={t(project.titleKey)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{t(project.titleKey)}</h3>
                <p className="mb-4 text-muted-foreground">{t(project.descKey)}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
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
