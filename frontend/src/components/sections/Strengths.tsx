import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { fadeUpAt } from "@/lib/motion";
import { Layers, Smartphone, Coins, Plug, Boxes, Rocket } from "lucide-react";

const items = [
  { key: "fullstack", Icon: Layers },
  { key: "mobile", Icon: Smartphone },
  { key: "blockchain", Icon: Coins },
  { key: "integrations", Icon: Plug },
  { key: "architecture", Icon: Boxes },
  { key: "deployment", Icon: Rocket },
];

export const Strengths = () => {
  const { t } = useTranslation();

  return (
    <Section
      eyebrow="strengths"
      title={t("aboutPage.strengths.title")}
      subtitle={t("aboutPage.strengths.subtitle")}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ key, Icon }, index) => (
          <motion.div key={key} {...fadeUpAt(index)} className="card card-interactive p-7">
            <span className="icon-badge">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">
              {t(`aboutPage.strengths.list.${key}.title`)}
            </h3>
            <p className="mt-2.5 leading-7 text-muted-foreground">
              {t(`aboutPage.strengths.list.${key}.description`)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
