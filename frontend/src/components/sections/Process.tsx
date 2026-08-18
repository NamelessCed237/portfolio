import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUpAt } from "@/lib/motion";

export const Process = () => {
  const { t } = useTranslation();
  const steps = ["s1", "s2", "s3", "s4", "s5"];

  return (
    <section className="section border-t border-border">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="workflow"
          title={t("aboutPage.process.title")}
          subtitle={t("aboutPage.process.subtitle")}
        />

        <ol className="space-y-8">
          {steps.map((step, index) => (
            <motion.li key={step} {...fadeUpAt(index)} className="flex gap-5">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-sm font-medium text-muted-foreground">
                {index + 1}
              </span>
              <div>
                <h3 className="font-medium">{t(`aboutPage.process.steps.${step}.title`)}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">
                  {t(`aboutPage.process.steps.${step}.description`)}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
