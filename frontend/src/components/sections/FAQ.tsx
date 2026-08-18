import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { fadeUp } from "@/lib/motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const items = ["q1", "q2", "q3", "q4"];

export const FAQ = () => {
  const { t } = useTranslation();

  return (
    <Section
      id="faq"
      eyebrow="faq"
      title={t("aboutPage.faq.title")}
      subtitle={t("aboutPage.faq.subtitle")}
      narrow
      tinted
    >
      <motion.div {...fadeUp} className="card px-6">
        <Accordion type="single" collapsible>
          {items.map((item) => (
            <AccordionItem key={item} value={item} className="border-border last:border-b-0">
              <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                {t(`aboutPage.faq.items.${item}.question`)}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-7 text-muted-foreground">
                {t(`aboutPage.faq.items.${item}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  );
};
