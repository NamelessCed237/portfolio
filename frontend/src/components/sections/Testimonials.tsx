import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      nameKey: "testimonials.list.client1.name",
      positionKey: "testimonials.list.client1.position",
      textKey: "testimonials.list.client1.text",
    },
    {
      nameKey: "testimonials.list.client2.name",
      positionKey: "testimonials.list.client2.position",
      textKey: "testimonials.list.client2.text",
    },
    {
      nameKey: "testimonials.list.client3.name",
      positionKey: "testimonials.list.client3.position",
      textKey: "testimonials.list.client3.text",
    },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t("testimonials.title")}</h2>
          <p className="text-muted-foreground text-lg">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.nameKey}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-xl"
            >
              <Quote className="h-10 w-10 text-primary mb-4" />
              <p className="text-muted-foreground mb-6 italic">
                "{t(testimonial.textKey)}"
              </p>
              <div>
                <p className="font-semibold">{t(testimonial.nameKey)}</p>
                <p className="text-sm text-muted-foreground">{t(testimonial.positionKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
