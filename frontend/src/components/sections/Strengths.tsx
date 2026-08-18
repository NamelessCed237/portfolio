import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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
    <section className="section-padding relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">// strengths</p>
          <h2 className="mb-4 text-4xl font-bold">
            {t("aboutPage.strengths.title")}<span className="text-primary">.</span>
          </h2>
          <p className="text-lg text-muted-foreground">{t("aboutPage.strengths.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glow-card p-7"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                {t(`aboutPage.strengths.list.${item.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`aboutPage.strengths.list.${item.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
