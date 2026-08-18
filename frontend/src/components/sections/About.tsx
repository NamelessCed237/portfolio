import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeEditor, C, K, S, P, Pn } from "@/components/ui/code-window";

export const About = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "2+", label: t("about.stats.experience") },
    { value: "10+", label: t("about.stats.projects") },
    { value: "15+", label: t("about.stats.clients") },
    { value: "3+", label: "Blockchains" },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading eyebrow="about me" title={t("about.title")} dot />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* Left: description + config card + CV */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t("about.description")}
            </p>
            <p className="text-lg font-medium text-foreground">{t("about.highlight")}</p>

            <CodeEditor tabs={["contact.config.ts"]}>
              <C>{"// contact.config.ts"}</C>{"\n"}
              <P>location</P>  <Pn>:</Pn> <S>"Bafoussam, Cameroun"</S>{"\n"}
              <P>email</P>     <Pn>:</Pn> <S>"cedric@example.com"</S>{"\n"}
              <P>chains</P>    <Pn>:</Pn> <Pn>[</Pn><S>"Ethereum"</S><Pn>,</Pn> <S>"Tron"</S><Pn>]</Pn>{"\n"}
              <P>available</P> <Pn>:</Pn> <K>true</K>
            </CodeEditor>

            <Button className="gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
              <Download className="h-4 w-4" />
              Télécharger mon CV
            </Button>
          </motion.div>

          {/* Right: stats JSON + stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <CodeEditor tabs={["developer.stats.json"]}>
              <K>const</K> <P>stats</P> <Pn>= {"{"}</Pn>{"\n"}
              {"  "}<P>yearsXp</P><Pn>:</Pn> <S>"2+"</S><Pn>,</Pn>   <C>{"// Années d'expérience"}</C>{"\n"}
              {"  "}<P>projects</P><Pn>:</Pn> <S>"20+"</S><Pn>,</Pn> <C>{"// Projets réalisés"}</C>{"\n"}
              {"  "}<P>clients</P><Pn>:</Pn> <S>"15+"</S><Pn>,</Pn>  <C>{"// Clients satisfaits"}</C>{"\n"}
              {"  "}<P>chains</P><Pn>:</Pn> <S>"3+"</S><Pn>,</Pn>    <C>{"// Blockchains"}</C>{"\n"}
              <Pn>{"}"}</Pn>
            </CodeEditor>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glow-card p-6 text-center"
                >
                  <div className="gradient-text mb-1 text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
