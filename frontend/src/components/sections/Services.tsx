import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useContent, useLocalized } from "@/lib/content/useContent";

export const Services = () => {
  const { t } = useTranslation();
  const { content } = useContent();
  const localized = useLocalized();

  return (
    <section id="services" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="what i do"
          title={t("services.title")}
          subtitle={t("services.subtitle")}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glow-card group p-8"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 transition-transform group-hover:scale-110">
                <DynamicIcon name={service.icon} className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{localized(service.title)}</h3>
              <p className="text-muted-foreground">{localized(service.description)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
