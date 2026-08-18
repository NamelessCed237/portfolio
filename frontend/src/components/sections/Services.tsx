import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Monitor, Smartphone, Server, Blocks, Link2, Code } from "lucide-react";

export const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Monitor,
      titleKey: "services.list.web.title",
      descKey: "services.list.web.description",
    },
    {
      icon: Smartphone,
      titleKey: "services.list.mobile.title",
      descKey: "services.list.mobile.description",
    },
    {
      icon: Server,
      titleKey: "services.list.backend.title",
      descKey: "services.list.backend.description",
    },
    {
      icon: Blocks,
      titleKey: "services.list.web3.title",
      descKey: "services.list.web3.description",
    },
    {
      icon: Link2,
      titleKey: "services.list.integrations.title",
      descKey: "services.list.integrations.description",
    },
    {
      icon: Code,
      titleKey: "services.list.architecture.title",
      descKey: "services.list.architecture.description",
    },
  ];

  return (
    <section id="services" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="what i do"
          title={t("services.title")}
          subtitle={t("services.subtitle")}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glow-card group p-8"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 transition-transform group-hover:scale-110">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{t(service.titleKey)}</h3>
              <p className="text-muted-foreground">{t(service.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
