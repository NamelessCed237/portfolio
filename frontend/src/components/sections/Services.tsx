import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { fadeUpAt } from "@/lib/motion";
import { Monitor, Smartphone, Server, Blocks, Link2, Code } from "lucide-react";

const services = [
  { key: "web", Icon: Monitor },
  { key: "mobile", Icon: Smartphone },
  { key: "backend", Icon: Server },
  { key: "web3", Icon: Blocks },
  { key: "integrations", Icon: Link2 },
  { key: "architecture", Icon: Code },
];

export const Services = () => {
  const { t } = useTranslation();

  return (
    <Section
      id="services"
      eyebrow="what i do"
      title={t("services.title")}
      subtitle={t("services.subtitle")}
      tinted
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ key, Icon }, index) => (
          <motion.div
            key={key}
            {...fadeUpAt(index)}
            className="card card-interactive p-7"
          >
            <span className="icon-badge">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{t(`services.list.${key}.title`)}</h3>
            <p className="mt-2.5 leading-7 text-muted-foreground">
              {t(`services.list.${key}.description`)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
