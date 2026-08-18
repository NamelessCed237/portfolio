import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUpAt } from "@/lib/motion";
import { Monitor, Smartphone, Server, Blocks, Link2, Code } from "lucide-react";

export const Services = () => {
  const { t } = useTranslation();

  const services = [
    { icon: Monitor, key: "web" },
    { icon: Smartphone, key: "mobile" },
    { icon: Server, key: "backend" },
    { icon: Blocks, key: "web3" },
    { icon: Link2, key: "integrations" },
    { icon: Code, key: "architecture" },
  ];

  return (
    <section id="services" className="section border-t border-border">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="what i do"
          title={t("services.title")}
          subtitle={t("services.subtitle")}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div key={service.key} {...fadeUpAt(index)} className="card card-hover p-6">
              <service.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-medium">{t(`services.list.${service.key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`services.list.${service.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
