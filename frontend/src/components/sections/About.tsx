import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Briefcase } from "lucide-react";
import { Counter } from "@/components/Counter";
import { SectionHeader } from "@/components/SectionHeader";

export const About = () => {
  const { t } = useTranslation();

  const stats = [
    { to: 3, suffix: "+", label: t("home.stats.years") },
    { to: 10, suffix: "+", label: t("home.stats.projects") },
    { to: 15, suffix: "+", label: t("home.stats.tech") },
  ];

  return (
    <section id="about" className="section">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeader eyebrow={t("nav.about")} title={t("about.title")} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-surface p-7 lg:col-span-3"
          >
            <p className="text-base leading-relaxed text-muted-foreground">{t("about.description")}</p>
            <p className="mt-4 text-base font-medium leading-relaxed">{t("about.highlight")}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="chip-soft px-3 py-1.5 text-sm">
                <MapPin className="h-4 w-4 text-primary" /> Bafoussam, Cameroun
              </span>
              <span className="chip-soft px-3 py-1.5 text-sm">
                <Briefcase className="h-4 w-4 text-primary" /> Lazer SARL
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 lg:col-span-2 lg:grid-cols-1">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-surface flex flex-col justify-center p-5 text-center lg:flex-row lg:items-baseline lg:justify-between lg:text-left"
              >
                <div className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground lg:mt-0 lg:text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
