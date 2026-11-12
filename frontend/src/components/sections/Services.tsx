import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SplitText } from "@/components/anim/SplitText";

const SERVICES = [
  { key: "web", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=440&fit=crop" },
  { key: "mobile", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=640&h=440&fit=crop" },
  { key: "backend", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&h=440&fit=crop" },
  { key: "web3", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=640&h=440&fit=crop" },
  { key: "integrations", image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=640&h=440&fit=crop" },
  { key: "architecture", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=640&h=440&fit=crop" },
];

export const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="section bg-secondary/30">
      <div className="container-px mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow mb-4">(02) {t("home.why.title")}</span>
            <h2 className="headline text-[clamp(2.2rem,6vw,4.5rem)]">
              <SplitText text={t("services.title")} />
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">{t("services.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="card-surface group overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={s.image}
                  alt={t(`services.list.${s.key}.title`)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 font-mono text-xs backdrop-blur">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold tracking-tight">{t(`services.list.${s.key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`services.list.${s.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
