import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NetworkBackground } from "@/components/NetworkBackground";
import { Terminal, Line, Out, Cursor, CodeEditor, C, K, S, P, Pn } from "@/components/ui/code-window";

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
              <span className="gradient-text font-semibold">Web3 & Full-Stack Engineer</span> — Blockchain, DeFi, Mobile & Backend
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

        {/* Right: terminal + code editor */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-5"
        >
          <Terminal>
            <Line>whoami</Line>
            <Out>Bike Cedric</Out>
            <Line>cat role.txt</Line>
            <Out>Web3 &amp; Full-Stack Engineer — Blockchain, DeFi, Backend</Out>
            <Line>ls skills/</Line>
            <Out tone="cyan">React TypeScript Solidity Web3.js NestJS Motoko</Out>
            <Line>./run --deploy-contract</Line>
            <Out tone="green">✔ Smart contract deployed — ready to build dApps</Out>
            <Cursor />
          </Terminal>

          <CodeEditor tabs={["developer.tsx", "about.md"]}>
            <C>{"// on-chain builder"}</C>{"\n"}
            <K>const</K> <P>developer</P> <Pn>= {"{"}</Pn>{"\n"}
            {"  "}<P>name</P><Pn>:</Pn> <S>"Bike Cedric"</S><Pn>,</Pn>{"\n"}
            {"  "}<P>role</P><Pn>:</Pn> <S>"Web3 &amp; Full-Stack Engineer"</S><Pn>,</Pn>{"\n"}
            {"  "}<P>stack</P><Pn>:</Pn> <Pn>[</Pn><S>"React"</S><Pn>,</Pn> <S>"Solidity"</S><Pn>,</Pn> <S>"NestJS"</S><Pn>],</Pn>{"\n"}
            {"  "}<P>chains</P><Pn>:</Pn> <Pn>[</Pn><S>"Ethereum"</S><Pn>,</Pn> <S>"Polygon"</S><Pn>,</Pn> <S>"ICP"</S><Pn>],</Pn>{"\n"}
            {"  "}<P>status</P><Pn>:</Pn> <S>"open_to_work"</S><Pn>,</Pn>{"\n"}
            <Pn>{"}"}</Pn><Pn>;</Pn>
          </CodeEditor>
        </motion.div>
      </div>
    </section>
  );
};
