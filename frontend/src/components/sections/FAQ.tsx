import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const { t } = useTranslation();
  const items = ["q1", "q2", "q3", "q4"];

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">// faq</p>
          <h2 className="mb-4 text-4xl font-bold">
            {t("aboutPage.faq.title")}<span className="text-primary">.</span>
          </h2>
          <p className="text-lg text-muted-foreground">{t("aboutPage.faq.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item) => (
              <AccordionItem
                key={item}
                value={item}
                className="glow-card overflow-hidden border-b-0 px-6"
              >
                <AccordionTrigger className="gap-3 py-5 text-left text-base font-semibold hover:no-underline">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                    {t(`aboutPage.faq.items.${item}.question`)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-8 text-base leading-relaxed text-muted-foreground">
                  {t(`aboutPage.faq.items.${item}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
