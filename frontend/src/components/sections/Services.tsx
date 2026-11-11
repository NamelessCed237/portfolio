import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Server, Blocks, Plug, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const SERVICES = [
  { icon: Monitor, key: "web" },
  { icon: Smartphone, key: "mobile" },
  { icon: Server, key: "backend" },
  { icon: Blocks, key: "web3" },
  { icon: Plug, key: "integrations" },
  { icon: Rocket, key: "architecture" },
];

export const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="section">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeader eyebrow={t("home.why.title")} title={t("services.title")} subtitle={t("services.subtitle")} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="card-surface p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t(`services.list.${s.key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`services.list.${s.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
