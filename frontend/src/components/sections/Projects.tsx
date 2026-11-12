import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/anim/SplitText";
import { projects } from "@/data/projects";

export const Projects = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("fr") ? "fr" : "en";
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });
  const wrapRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section id="projects" className="section">
      <div className="container-px mx-auto max-w-6xl">
        <div className="mb-9 flex items-end justify-between gap-6 border-b border-border pb-6">
          <h2 className="headline text-[clamp(2.2rem,6vw,4.5rem)]">
            <SplitText text={t("projects.title")} />
          </h2>
          <span className="hidden shrink-0 pb-2 text-sm text-muted-foreground md:block">
            {String(projects.length).padStart(2, "0")}&nbsp;&nbsp;{t("home.works.title")}
          </span>
        </div>

        {/* cursor-following preview */}
        <div ref={wrapRef} onMouseMove={onMove} className="relative">
          <AnimatePresence>
            {active !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25 }}
                style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
                className="pointer-events-none absolute left-0 top-0 z-20 hidden h-56 w-80 overflow-hidden rounded-xl border border-border shadow-2xl md:block"
              >
                {projects.map((p, i) => (
                  <img
                    key={p.slug}
                    src={p.cover}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <ul>
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Link
                  to={`/projects/${p.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="group grid grid-cols-12 items-center gap-4 border-b border-border py-6 transition-colors md:py-8"
                >
                  <span className="col-span-2 text-sm text-muted-foreground md:col-span-1">
                    {String(i).padStart(2, "0")}
                  </span>

                  <h3 className="col-span-8 text-2xl font-semibold tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary md:col-span-5 md:text-4xl">
                    {p.title}
                  </h3>

                  <img
                    src={p.cover}
                    alt=""
                    loading="lazy"
                    className="col-span-2 h-12 w-16 rounded-md object-cover md:hidden"
                  />

                  <p className="col-span-12 col-start-3 mt-1 text-sm text-muted-foreground md:col-span-4 md:col-start-auto md:mt-0">
                    {p.tagline[lang]}
                  </p>

                  <div className="col-span-12 col-start-3 flex items-center justify-between gap-4 md:col-span-2 md:col-start-auto md:justify-end">
                    <span className="hidden text-sm text-muted-foreground lg:block">{p.year}</span>
                    <ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
