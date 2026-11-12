import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDownRight, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { SplitText } from "@/components/anim/SplitText";
import { RotatingText } from "@/components/anim/RotatingText";
import { Magnetic } from "@/components/anim/Magnetic";
import { Marquee } from "@/components/anim/Marquee";
import { Hero3D } from "@/components/three/Hero3D";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:contact@bikecedric.dev", label: "Email" },
];

const MARQUEE = ["WEB3", "BLOCKCHAIN", "DEFI", "FULL-STACK", "MOBILE", "SMART CONTRACTS"];

export const Hero = () => {
  const { t } = useTranslation();
  const rotating = t("home.rotating", { returnObjects: true }) as string[];

  // Only mount the (heavy) 3D scene on desktop so mobile never loads three.js.
  const [is3D, setIs3D] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIs3D(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28">
      <div className="dotted-grid pointer-events-none absolute inset-0" />
      {is3D && (
        <Hero3D className="absolute right-[-6%] top-1/2 z-0 h-[70%] w-[55%] -translate-y-1/2 opacity-90 lg:right-0" />
      )}

      <div className="container-px relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
        >
          <span>{t("home.role")}</span>
          <span className="hidden sm:inline">Bafoussam, Cameroun</span>
        </motion.div>

        <h1 className="headline text-[clamp(3rem,13vw,11rem)]">
          <SplitText text="Bike Cedric" immediate />
        </h1>

        <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-xl"
          >
            <p className="text-2xl font-medium leading-tight sm:text-3xl">
              {t("home.build")}{" "}
              <RotatingText words={rotating} className="font-semibold text-primary" />
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground"
                >
                  {t("home.cta.button")}
                  <ArrowDownRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <div className="flex items-center gap-1.5">
                {socials.map((s) => (
                  <Magnetic key={s.label} strength={0.5}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                    >
                      <s.icon className="h-[18px] w-[18px]" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            <span className="h-10 w-px bg-border" />
            {t("home.scroll")}
          </motion.a>
        </div>
      </div>

      <Marquee className="mt-10 border-y border-border py-5" duration={24}>
        {MARQUEE.map((w) => (
          <span key={w} className="headline mx-5 flex items-center gap-10 text-4xl text-foreground/90 md:text-6xl">
            {w}
            <span className="text-primary">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
};
