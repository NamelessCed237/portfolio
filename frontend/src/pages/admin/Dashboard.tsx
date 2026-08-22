import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Download, FileText, PenLine, Plus, RefreshCw, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/DynamicIcon";
import { PageHeader } from "@/components/admin/PageHeader";
import { useContent, useLocalized } from "@/lib/content/useContent";
import { reportSaveError } from "@/lib/content/saveError";
import { COLLECTIONS } from "@/lib/content/schema";
import type { SiteContent } from "@/lib/content/types";

export const Dashboard = () => {
  const { content, status, update, reload } = useContent();
  const localized = useLocalized();
  const fileInput = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const published = content.posts.filter((post) => post.published);
  const drafts = content.posts.filter((post) => !post.published);
  const recent = [...content.posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  const stats = [
    { label: "Articles publiés", value: published.length, to: "/admin/posts" },
    { label: "Brouillons", value: drafts.length, to: "/admin/posts" },
    { label: "Projets", value: content.projects.length, to: "/admin/projects" },
    { label: "Services", value: content.services.length, to: "/admin/services" },
  ];

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-content-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    setBusy(true);
    try {
      const parsed = JSON.parse(await file.text()) as SiteContent;
      await update(() => parsed);
      toast.success("Contenu importé et enregistré");
    } catch (error) {
      reportSaveError(error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="// admin"
        title="Tableau de bord"
        description="Contenu du portfolio et articles du blog."
        actions={
          <Button asChild size="sm">
            <Link to="/admin/posts/new">
              <Plus className="h-4 w-4" />
              Nouvel article
            </Link>
          </Button>
        }
        status={
          status === "ready" ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              Base connectée
            </span>
          ) : null
        }
      />

      <div className="space-y-8">
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link key={stat.label} to={stat.to} className="glow-card p-5">
              <p className="gradient-text text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </Link>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="glow-card p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="font-semibold">Derniers articles</h2>
              <Button asChild size="sm" variant="ghost">
                <Link to="/admin/posts">Tout voir</Link>
              </Button>
            </div>

            {recent.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border/70 p-8 text-center">
                <FileText className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">Aucun article pour le moment.</p>
                <Button asChild size="sm" className="mt-4">
                  <Link to="/admin/posts/new">
                    <Plus className="h-4 w-4" />
                    Écrire le premier
                  </Link>
                </Button>
              </div>
            ) : (
              <ul className="divide-y divide-border/60">
                {recent.map((post) => (
                  <li key={post.id}>
                    <Link
                      to={`/admin/posts/${post.id}`}
                      className="flex items-center gap-4 py-3 transition-colors hover:text-primary"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">
                        {localized(post.title) || "Sans titre"}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground">
                        {post.date}
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          post.published
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {post.published ? "Publié" : "Brouillon"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-6">
            <div className="glow-card p-6">
              <h2 className="font-semibold">Raccourcis</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {COLLECTIONS.map((collection) => (
                  <Link
                    key={collection.key}
                    to={`/admin/${collection.key}`}
                    className="flex items-center gap-2.5 rounded-lg border border-border/70 px-3 py-2.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <DynamicIcon name={collection.icon} className="h-4 w-4 shrink-0" />
                    <span className="truncate">{collection.label}</span>
                  </Link>
                ))}
                <Link
                  to="/admin/profile"
                  className="col-span-2 flex items-center gap-2.5 rounded-lg border border-border/70 px-3 py-2.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <PenLine className="h-4 w-4 shrink-0" />
                  Modifier le profil
                </Link>
              </div>
            </div>

            <div className="glow-card p-6">
              <h2 className="font-semibold">Sauvegarde</h2>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                Le contenu est enregistré dans Neon à chaque modification. L&apos;export reste utile
                comme copie de secours.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                  Exporter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busy}
                  onClick={() => fileInput.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Importer
                </Button>
                <input
                  ref={fileInput}
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleImport(file);
                    e.target.value = "";
                  }}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busy}
                  onClick={async () => {
                    await reload();
                    toast.success("Contenu rechargé");
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Recharger
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
