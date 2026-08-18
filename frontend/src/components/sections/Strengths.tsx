import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUpAt } from "@/lib/motion";
import { Layers, Smartphone, Coins, Plug, Boxes, Rocket } from "lucide-react";

export const Strengths = () => {
  const { t } = useTranslation();

  const items = [
    { key: "fullstack", icon: Layers },
    { key: "mobile", icon: Smartphone },
    { key: "blockchain", icon: Coins },
    { key: "integrations", icon: Plug },
    { key: "architecture", icon: Boxes },
    { key: "deployment", icon: Rocket },
  ];

  return (
    <section className="section">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="strengths"
          title={t("aboutPage.strengths.title")}
          subtitle={t("aboutPage.strengths.subtitle")}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div key={item.key} {...fadeUpAt(index)} className="card card-hover p-6">
              <item.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-medium">
                {t(`aboutPage.strengths.list.${item.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`aboutPage.strengths.list.${item.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
