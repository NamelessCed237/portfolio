import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Blocks } from "lucide-react";
import { NetworkBackground } from "@/components/NetworkBackground";

export const AboutIntro = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <NetworkBackground className="opacity-30" />
      <div className="grid-bg absolute inset-0" />
      <div className="glow-blob left-[-10%] top-[10%] h-72 w-72 bg-primary/30" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 font-mono text-sm uppercase tracking-widest text-primary"
        >
          // {t("aboutPage.intro.eyebrow")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tight md:text-5xl"
        >
          {t("aboutPage.intro.title")}<span className="text-primary">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
        >
          {t("aboutPage.intro.lead")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-10 max-w-3xl space-y-4 text-left"
        >
          <div className="glow-card space-y-5 p-8">
            <p className="leading-relaxed text-muted-foreground">{t("aboutPage.intro.p1")}</p>
            <p className="leading-relaxed text-muted-foreground">{t("aboutPage.intro.p2")}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/40 px-3 py-1.5 text-sm text-foreground/80">
                <MapPin className="h-4 w-4 text-primary" /> Bafoussam, Cameroun
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/40 px-3 py-1.5 text-sm text-foreground/80">
                <Briefcase className="h-4 w-4 text-primary" /> Lazer SARL
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/40 px-3 py-1.5 text-sm text-foreground/80">
                <Blocks className="h-4 w-4 text-primary" /> Web3 &amp; Blockchain
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
