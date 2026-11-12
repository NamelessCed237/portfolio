import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Counter } from "@/components/Counter";
import { SplitText } from "@/components/anim/SplitText";

export const About = () => {
  const { t } = useTranslation();

  const stats = [
    { to: 3, suffix: "+", label: t("home.stats.years") },
    { to: 10, suffix: "+", label: t("home.stats.projects") },
    { to: 15, suffix: "+", label: t("home.stats.tech") },
  ];

  return (
    <section id="about" className="section">
      <div className="container-px mx-auto max-w-6xl">
        <span className="eyebrow mb-6">(01) {t("nav.about")}</span>

        <h2 className="headline max-w-5xl text-[clamp(1.8rem,5vw,4rem)]">
          <SplitText text={t("home.statement.lead")} />{" "}
          <span className="text-primary">
            <SplitText text={t("home.statement.highlight")} delay={0.2} />
          </span>
        </h2>

        <div className="mt-11 grid grid-cols-1 gap-8 border-t border-border pt-8 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-muted-foreground md:col-span-5"
          >
            {t("home.statement.body")}
          </motion.p>

          <div className="grid grid-cols-3 gap-6 md:col-span-6 md:col-start-7">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-t-2 border-primary/40 pt-4"
              >
                <div className="headline text-[clamp(2.2rem,5vw,3.75rem)] text-foreground">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
