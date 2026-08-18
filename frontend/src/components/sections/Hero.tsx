import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Twitter, Mail, CheckCircle2, Hexagon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NetworkBackground } from "@/components/NetworkBackground";
import { CodeEditor, C, K, S, P, N, Pn, Fn } from "@/components/ui/code-window";

export const Hero = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:cedric@example.com", label: "Email" },
  ];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Animated blockchain network + grid + glow */}
      <NetworkBackground className="opacity-50" />
      <div className="grid-bg absolute inset-0" />
      <div className="glow-blob left-[-10%] top-[10%] h-72 w-72 bg-primary/30" />
      <div className="glow-blob right-[-5%] bottom-[5%] h-80 w-80 bg-secondary/30" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:gap-14">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="chip inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            ◆ Open to Work
          </motion.div>

          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-sm text-primary"
            >
              // {t("hero.greeting")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
            >
              {t("hero.name")}
              <span className="text-primary">.</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl font-medium text-muted-foreground md:text-2xl"
            >
              <span className="gradient-text font-semibold">{t("hero.title")}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              {t("hero.subtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link to="/projects">
              <Button size="lg" className="group min-w-[180px] gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90">
                Voir mes projets
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="min-w-[150px] border-primary/40 hover:bg-primary/10">
                Me contacter
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="flex gap-2 pt-2"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-lg border border-border/70 bg-card/40 text-muted-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Solidity contract + on-chain deployment card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative space-y-5"
        >
          <CodeEditor tabs={["Developer.sol"]} hint="solidity ^0.8.24">
            <C>{"// SPDX-License-Identifier: MIT"}</C>{"\n"}
            <K>pragma</K> <K>solidity</K> <N>^0.8.24</N><Pn>;</Pn>{"\n\n"}
            <K>contract</K> <Fn>Developer</Fn> <Pn>{"{"}</Pn>{"\n"}
            {"  "}<K>string</K> <K>public</K> <P>name</P>  <Pn>=</Pn> <S>"Bike Cedric"</S><Pn>;</Pn>{"\n"}
            {"  "}<K>string</K> <K>public</K> <P>role</P>  <Pn>=</Pn> <S>"Full-Stack & Blockchain"</S><Pn>;</Pn>{"\n"}
            {"  "}<K>string</K><Pn>[]</Pn> <K>public</K> <P>stack</P> <Pn>=</Pn> <Pn>[</Pn><S>"React"</S><Pn>,</Pn> <S>"NestJS"</S><Pn>,</Pn> <S>"Solidity"</S><Pn>];</Pn>{"\n\n"}
            {"  "}<K>function</K> <Fn>hire</Fn><Pn>()</Pn> <K>external</K> <K>payable</K> <K>returns</K> <Pn>(</Pn><K>bool</K><Pn>)</Pn> <Pn>{"{"}</Pn>{"\n"}
            {"    "}<Fn>require</Fn><Pn>(</Pn><P>msg.value</P> <Pn>&gt;</Pn> <N>0</N><Pn>,</Pn> <S>"let's build"</S><Pn>);</Pn>{"\n"}
            {"    "}<K>return</K> <N>true</N><Pn>;</Pn>{"\n"}
            {"  "}<Pn>{"}"}</Pn>{"\n"}
            <Pn>{"}"}</Pn>
          </CodeEditor>

          {/* Distinctive on-chain deployment receipt */}
          <div className="glow-card relative overflow-hidden p-5">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Hexagon className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">Contract deployed</p>
                  <p className="font-mono text-[11px] text-muted-foreground">Developer.sol</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Confirmed
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">tx hash</span>
                <span className="gradient-text font-semibold">0x9f3a…B1KE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">network</span>
                <span className="flex gap-1.5">
                  <span className="rounded border border-border/70 bg-card/50 px-1.5 py-0.5 text-foreground/80">Ethereum</span>
                  <span className="rounded border border-border/70 bg-card/50 px-1.5 py-0.5 text-foreground/80">Tron</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">block</span>
                <span className="text-foreground/80">#19_872_301</span>
              </div>
            </div>

            {/* animated confirmations bar */}
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
