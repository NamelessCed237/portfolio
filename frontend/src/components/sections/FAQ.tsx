import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUp } from "@/lib/motion";
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
    <section id="faq" className="section border-t border-border">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="faq"
          title={t("aboutPage.faq.title")}
          subtitle={t("aboutPage.faq.subtitle")}
        />

        <motion.div {...fadeUp}>
          <Accordion type="single" collapsible className="border-t border-border">
            {items.map((item) => (
              <AccordionItem key={item} value={item}>
                <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                  {t(`aboutPage.faq.items.${item}.question`)}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
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
