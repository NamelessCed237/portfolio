import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t("services.title")}</h2>
          <p className="text-muted-foreground text-lg">{t("services.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-xl hover-glow"
            >
              <service.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{t(service.titleKey)}</h3>
              <p className="text-muted-foreground">{t(service.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
