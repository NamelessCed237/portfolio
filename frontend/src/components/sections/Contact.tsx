import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CodeEditor, K, S, P, Pn } from "@/components/ui/code-window";
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
        description: "EmailJS n'est pas configuré (voir .env.example).",
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
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="glow-blob right-[-8%] top-[20%] h-72 w-72 bg-secondary/20" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="contact"
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
          dot
        />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* Left: description + contact code card + socials */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              Disponible pour des opportunités Fullstack, SaaS, Mobile, Backend, FinTech
              ou développement de produits Web3 & blockchain.
            </p>

            <CodeEditor tabs={["contact.ts"]}>
              <K>const</K> <P>contact</P> <Pn>= {"{"}</Pn>{"\n"}
              {"  "}<P>email</P>    <Pn>:</Pn> <S>"cedric@example.com"</S><Pn>,</Pn>{"\n"}
              {"  "}<P>location</P> <Pn>:</Pn> <S>"Bafoussam, Cameroun"</S><Pn>,</Pn>{"\n"}
              {"  "}<P>chains</P>   <Pn>:</Pn> <Pn>[</Pn><S>"Ethereum"</S><Pn>,</Pn> <S>"Tron"</S><Pn>],</Pn>{"\n"}
              {"  "}<P>timezone</P> <Pn>:</Pn> <S>"GMT+1"</S><Pn>,</Pn>{"\n"}
              <Pn>{"}"}</Pn><Pn>;</Pn>
            </CodeEditor>

            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/40 px-4 py-2.5 text-sm font-medium text-foreground/80 backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/40 px-4 py-2.5 text-sm font-medium text-foreground/80 backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right: code-editor styled form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl border border-border/70 bg-card/60 shadow-2xl backdrop-blur"
          >
            <div className="flex items-center gap-2 border-b border-border/60 bg-[hsl(200_30%_9%)]/80 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="font-mono text-xs text-foreground">sendMessage.ts</span>
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">Ctrl+Enter to send</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <p className="font-mono text-sm">
                <span className="text-secondary">await</span>{" "}
                <span className="text-[#7aa2f7]">sendMessage</span>
                <span className="text-muted-foreground">({"{"}</span>
              </p>

              <div className="space-y-2 pl-4">
                <label className="font-mono text-sm text-muted-foreground">
                  name <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder={t("contact.form.name")}
                  required
                  className="border-border/70 bg-background/50 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2 pl-4">
                <label className="font-mono text-sm text-muted-foreground">
                  email <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder={t("contact.form.email")}
                  required
                  className="border-border/70 bg-background/50 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2 pl-4">
                <label className="font-mono text-sm text-muted-foreground">
                  message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  name="message"
                  placeholder={t("contact.form.message")}
                  rows={5}
                  required
                  className="border-border/70 bg-background/50 focus-visible:ring-primary"
                />
              </div>

              <p className="font-mono text-sm text-muted-foreground">{"});"}</p>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
              >
                {isSubmitting ? (
                  t("contact.form.sending")
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t("contact.form.send")}
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
