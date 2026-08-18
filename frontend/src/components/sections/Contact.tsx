import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Section } from "@/components/Section";
import { fadeUp } from "@/lib/motion";
import { SOCIAL_LINKS } from "@/lib/links";
import { sendContactEmail, isEmailConfigured } from "@/lib/emailjs";

const EMAIL = "cedric@example.com";

export const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!isEmailConfigured) {
      toast({
        title: t("contact.form.error"),
        description: t("contact.form.notConfigured"),
      });
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
    <Section
      id="contact"
      eyebrow="contact"
      title={t("contact.title")}
      subtitle={t("contact.subtitle")}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
        <motion.div {...fadeUp} className="space-y-8">
          <dl className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="icon-badge">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <dt className="text-sm text-muted-foreground">{t("contact.info.email")}</dt>
                <dd className="mt-0.5">
                  <a href={`mailto:${EMAIL}`} className="font-medium hover:text-primary">
                    {EMAIL}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="icon-badge">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <dt className="text-sm text-muted-foreground">{t("contact.info.location")}</dt>
                <dd className="mt-0.5 font-medium">Bafoussam, Cameroun</dd>
              </div>
            </div>
          </dl>

          <div className="border-t border-border pt-6">
            <p className="eyebrow">{t("contact.info.social")}</p>
            <div className="mt-4 flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form {...fadeUp} onSubmit={handleSubmit} className="card space-y-5 p-7">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t("contact.form.name")}
            </label>
            <Input id="name" name="name" type="text" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {t("contact.form.email")}
            </label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t("contact.form.message")}
            </label>
            <Textarea id="message" name="message" rows={6} required className="resize-y" />
          </div>

          <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
            {isSubmitting ? (
              t("contact.form.sending")
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t("contact.form.send")}
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </Section>
  );
};
