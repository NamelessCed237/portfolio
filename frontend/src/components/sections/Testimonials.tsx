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
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">// testimonials</p>
          <h2 className="mb-4 text-4xl font-bold">{t("testimonials.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.nameKey}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glow-card p-8"
            >
              <Quote className="mb-4 h-10 w-10 text-primary/60" />
              <p className="mb-6 italic text-muted-foreground">
                "{t(testimonial.textKey)}"
              </p>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-primary-foreground">
                  {t(testimonial.nameKey).slice(0, 1)}
                </div>
                <div>
                  <p className="font-semibold">{t(testimonial.nameKey)}</p>
                  <p className="text-sm text-muted-foreground">{t(testimonial.positionKey)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
