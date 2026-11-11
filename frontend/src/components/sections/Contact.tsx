import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SectionHeader } from "@/components/SectionHeader";
import { sendContactEmail, isEmailConfigured } from "@/lib/emailjs";

const EMAIL = "contact@bikecedric.dev";

export const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!isEmailConfigured) {
      toast({ title: t("contact.form.error"), description: "EmailJS n'est pas configuré (voir .env.example)." });
      return;
    }
    setIsSubmitting(true);
    try {
      await sendContactEmail(form);
      toast({ title: t("contact.form.success") });
      form.reset();
    } catch {
      toast({ title: t("contact.form.error") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeader eyebrow={t("nav.contact")} title={t("contact.title")} subtitle={t("contact.subtitle")} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Info */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="card-surface p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Disponible pour des missions Full-Stack, mobile et blockchain (Web3, paiements, Mobile Money).
              </p>
              <div className="mt-5 space-y-3">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm link-accent">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><Mail className="h-4 w-4" /></span>
                  {EMAIL}
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><MapPin className="h-4 w-4" /></span>
                  Bafoussam, Cameroun
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"><Github className="h-[18px] w-[18px]" /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"><Linkedin className="h-[18px] w-[18px]" /></a>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-surface space-y-4 p-6 lg:col-span-3"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t("contact.form.name")}</label>
                <Input name="name" required placeholder={t("contact.form.name")} className="bg-background" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t("contact.form.email")}</label>
                <Input type="email" name="email" required placeholder="you@example.com" className="bg-background" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t("contact.form.message")}</label>
              <Textarea name="message" required rows={5} placeholder={t("contact.form.message")} className="bg-background" />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full gap-2 sm:w-auto">
              {isSubmitting ? t("contact.form.sending") : <><Send className="h-4 w-4" /> {t("contact.form.send")}</>}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
