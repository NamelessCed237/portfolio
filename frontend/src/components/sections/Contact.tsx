import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUp } from "@/lib/motion";
import { SOCIAL_LINKS } from "@/lib/links";
import { sendContactEmail, isEmailConfigured } from "@/lib/emailjs";

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
    <section id="contact" className="section">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="contact"
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
          <motion.div {...fadeUp} className="space-y-8">
            <dl className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <dt className="sr-only">{t("contact.info.email")}</dt>
                <dd>
                  <a href="mailto:cedric@example.com" className="hover:text-primary">
                    cedric@example.com
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <dt className="sr-only">{t("contact.info.location")}</dt>
                <dd className="text-muted-foreground">Bafoussam, Cameroun</dd>
              </div>
            </dl>

            <div>
              <p className="eyebrow mb-3">{t("contact.info.social")}</p>
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form {...fadeUp} onSubmit={handleSubmit} className="card space-y-5 p-6">
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
              <Textarea id="message" name="message" rows={6} required />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
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
      </div>
    </section>
  );
};
