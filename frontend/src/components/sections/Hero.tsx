import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:contact@bikecedric.dev", label: "Email" },
];

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="dotted-grid pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--hero-glow)" }}
      />

      <div className="container-px relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center text-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src="/logo.png"
          alt="Bike Cedric"
          className="mb-8 h-20 w-20 rounded-2xl border border-border shadow-[var(--shadow)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="chip-soft px-3.5 py-1.5 text-sm font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {t("home.available")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          {t("hero.name")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 text-xl font-semibold sm:text-2xl"
        >
          <span className="gradient-text">{t("home.role")}</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("home.cta.button")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/50"
          >
            <Download className="h-4 w-4" />
            {t("hero.downloadCV")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex items-center gap-2"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <s.icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
