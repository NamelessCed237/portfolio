import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Tag } from "@/components/ui/tag";
import { fadeUpAt } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

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
    <Section
      id="projects"
      eyebrow="featured work"
      title={t("projects.title")}
      subtitle={t("projects.subtitle")}
      tinted
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(({ key, tech, image }, index) => (
          <motion.article
            key={key}
            {...fadeUpAt(index)}
            className="card card-interactive group flex flex-col overflow-hidden"
          >
            <div className="overflow-hidden border-b border-border">
              <img
                src={image}
                alt=""
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold">{t(`projects.list.${key}.title`)}</h3>
              <p className="mt-2.5 leading-7 text-muted-foreground">
                {t(`projects.list.${key}.description`)}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {tech.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-medium text-primary transition-colors hover:text-foreground"
              >
                {t("projects.viewProject")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
};
