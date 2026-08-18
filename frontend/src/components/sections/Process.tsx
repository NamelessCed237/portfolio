import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { fadeUpAt } from "@/lib/motion";

const steps = ["s1", "s2", "s3", "s4", "s5"];

export const Process = () => {
  const { t } = useTranslation();

  return (
    <Section
      eyebrow="workflow"
      title={t("aboutPage.process.title")}
      subtitle={t("aboutPage.process.subtitle")}
      narrow
      tinted
    >
      <ol className="space-y-10">
        {steps.map((step, index) => (
          <motion.li key={step} {...fadeUpAt(index)} className="flex gap-5 sm:gap-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card text-sm font-semibold text-primary shadow-[var(--shadow-xs)]">
              {index + 1}
            </span>
            <div className="pt-1.5">
              <h3 className="text-lg font-semibold">
                {t(`aboutPage.process.steps.${step}.title`)}
              </h3>
              <p className="mt-2 leading-7 text-muted-foreground">
                {t(`aboutPage.process.steps.${step}.description`)}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
};
