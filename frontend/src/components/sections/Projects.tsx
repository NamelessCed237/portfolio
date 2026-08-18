import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUpAt } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    key: "transfergratis",
    tech: ["React", "NestJS", "Mobile Money"],
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&h=600&fit=crop",
  },
  {
    key: "portfolio",
    tech: ["React", "TypeScript", "Tailwind"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    key: "tulivu",
    tech: ["USDT", "USDC", "Ethereum", "Tron"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
  },
];

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="section border-t border-border">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="featured work"
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.key}
              {...fadeUpAt(index)}
              className="card card-hover flex flex-col overflow-hidden"
            >
              <img
                src={project.image}
                alt=""
                loading="lazy"
                className="aspect-video w-full border-b border-border object-cover"
              />

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-medium">{t(`projects.list.${project.key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`projects.list.${project.key}.description`)}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="mt-6 w-full">
                  {t("projects.viewProject")}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
