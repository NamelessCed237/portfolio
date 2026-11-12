import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Check, Calendar, User, Tag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SplitText } from "@/components/anim/SplitText";
import { projects, getProject } from "@/data/projects";

const ProjectDetail = () => {
  const { slug = "" } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("fr") ? "fr" : "en";
  const project = getProject(slug);

  if (!project) return <Navigate to="/#projects" replace />;

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { icon: Calendar, label: lang === "fr" ? "Année" : "Year", value: project.year },
    { icon: User, label: lang === "fr" ? "Rôle" : "Role", value: project.role[lang] },
    { icon: Tag, label: lang === "fr" ? "Catégorie" : "Category", value: project.category[lang] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container-px mx-auto max-w-5xl pb-20 pt-28">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm link-accent">
          <ArrowLeft className="h-4 w-4" /> {lang === "fr" ? "Tous les projets" : "All projects"}
        </Link>

        <div className="mt-8">
          <p className="eyebrow mb-4">{project.category[lang]}</p>
          <h1 className="headline text-[clamp(2.6rem,9vw,6rem)]">
            <SplitText text={project.title} immediate />
          </h1>
          <p className="mt-5 max-w-2xl text-xl text-muted-foreground">{project.tagline[lang]}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {lang === "fr" ? "Voir le site" : "Visit site"}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/60"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
          </div>
        </div>

        {/* cover */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-2xl border border-border"
        >
          <img src={project.cover} alt={project.title} className="aspect-[16/9] w-full object-cover" />
        </motion.div>

        {/* meta + description */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <aside className="space-y-6 lg:col-span-1">
            {meta.map((m) => (
              <div key={m.label} className="border-t border-border pt-4">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <m.icon className="h-3.5 w-3.5" /> {m.label}
                </span>
                <p className="mt-1.5 font-medium">{m.value}</p>
              </div>
            ))}
            <div className="border-t border-border pt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stack</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="chip-soft px-2.5 py-1 text-xs">{s}</span>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold">{lang === "fr" ? "À propos du projet" : "About the project"}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{project.description[lang]}</p>

            <h2 className="mt-8 text-lg font-semibold">{lang === "fr" ? "Points clés" : "Highlights"}</h2>
            <ul className="mt-3 space-y-2.5">
              {project.highlights[lang].map((h) => (
                <li key={h} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* gallery */}
        <div className="mt-14">
          <h2 className="mb-5 text-lg font-semibold">{lang === "fr" ? "Galerie" : "Gallery"}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.gallery.map((g, i) => (
              <motion.img
                key={i}
                src={g}
                alt=""
                loading="lazy"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="aspect-[4/3] w-full rounded-xl border border-border object-cover"
              />
            ))}
          </div>
        </div>

        {/* next project */}
        <Link
          to={`/projects/${next.slug}`}
          className="group mt-16 flex items-center justify-between gap-4 border-t border-border pt-8"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {lang === "fr" ? "Projet suivant" : "Next project"}
            </span>
            <p className="mt-1 text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary md:text-3xl">
              {next.title}
            </p>
          </div>
          <ArrowRight className="h-7 w-7 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
