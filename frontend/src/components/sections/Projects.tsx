import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { useContent } from "@/lib/content/useContent";
import { useLocalized } from "@/lib/content/useContent";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const Projects = () => {
  const { t } = useTranslation();
  const { content } = useContent();
  const localized = useLocalized();

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
          {content.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glow-card group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-semibold">{localized(project.title)}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {localized(project.description)}
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
