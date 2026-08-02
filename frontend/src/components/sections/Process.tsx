import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const Process = () => {
  const { t } = useTranslation();
  const steps = ["s1", "s2", "s3", "s4", "s5"];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="glow-blob right-[-8%] top-[20%] h-72 w-72 bg-secondary/30" />
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">// workflow</p>
          <h2 className="mb-4 text-4xl font-bold">
            {t("aboutPage.process.title")}<span className="text-primary">.</span>
          </h2>
          <p className="text-lg text-muted-foreground">{t("aboutPage.process.subtitle")}</p>
        </motion.div>

        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-2 top-2 h-full w-px bg-gradient-to-b from-primary via-secondary/50 to-transparent md:left-4" />

          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <div className="absolute -left-[26px] top-1 grid h-7 w-7 place-items-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary font-mono text-xs font-bold text-primary-foreground md:-left-[38px]">
                {index + 1}
              </div>
              <div className="glow-card p-6">
                <h3 className="mb-2 text-lg font-semibold">
                  {t(`aboutPage.process.steps.${step}.title`)}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {t(`aboutPage.process.steps.${step}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
