import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SplitText } from "@/components/anim/SplitText";
import { Magnetic } from "@/components/anim/Magnetic";
import { sendContactEmail, isEmailConfigured } from "@/lib/emailjs";
import { api } from "@/lib/api";

const EMAIL = "contact@bikecedric.dev";

export const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setIsSubmitting(true);
    let stored = false;
    let emailed = false;

    // Save to the admin inbox (best-effort — ignore if the API is down)
    try {
      await api.post("/messages", payload);
      stored = true;
    } catch {
      /* backend may be offline */
    }

    // Send the email via EmailJS if configured
    if (isEmailConfigured) {
      try {
        await sendContactEmail(form);
        emailed = true;
      } catch {
        /* ignore */
      }
    }

    if (stored || emailed) {
      toast({ title: t("contact.form.success") });
      form.reset();
    } else {
      toast({
        title: t("contact.form.error"),
        description: "Configurez EmailJS (.env) ou lancez l'API backend.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section">
      <div className="container-px mx-auto max-w-6xl">
        <span className="eyebrow mb-6">(05) {t("nav.contact")}</span>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="headline text-[clamp(2.6rem,8vw,6.5rem)]">
              <SplitText text={t("home.cta.title")} />
            </h2>
            <p className="mt-6 max-w-sm text-lg text-muted-foreground">{t("home.cta.body")}</p>

            <Magnetic strength={0.25}>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-8 inline-block text-xl font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-8 transition-colors hover:text-primary sm:text-2xl"
              >
                {EMAIL}
              </a>
            </Magnetic>

            <div className="mt-8 flex gap-6">
              {[{ l: "GitHub", h: "https://github.com" }, { l: "LinkedIn", h: "https://linkedin.com" }, { l: "Twitter / X", h: "https://twitter.com" }].map((s) => (
                <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" className="text-sm font-medium link-accent">{s.l}</a>
              ))}
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("contact.form.name")}</label>
                <Input name="name" required placeholder={t("contact.form.name")} className="bg-card" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("contact.form.email")}</label>
                <Input type="email" name="email" required placeholder="you@example.com" className="bg-card" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("contact.form.message")}</label>
              <Textarea name="message" required rows={6} placeholder={t("contact.form.message")} className="bg-card" />
            </div>
            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full gap-2 rounded-full">
              {isSubmitting ? t("contact.form.sending") : <><Send className="h-4 w-4" /> {t("contact.form.send")}</>}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
