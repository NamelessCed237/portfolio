import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

interface Bi { fr: string; en: string }
interface BiList { fr: string[]; en: string[] }

interface Project {
  id: string;
  slug: string;
  title: string;
  year: string;
  category: Bi;
  role: Bi;
  tagline: Bi;
  description: Bi;
  highlights: BiList;
  stack: string[];
  gallery: string[];
  cover: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  order: number;
  published: boolean;
}

const empty = (): Project => ({
  id: "", slug: "", title: "", year: new Date().getFullYear().toString(),
  category: { fr: "", en: "" }, role: { fr: "", en: "" }, tagline: { fr: "", en: "" },
  description: { fr: "", en: "" }, highlights: { fr: [], en: [] },
  stack: [], gallery: [], cover: "", liveUrl: "", githubUrl: "", order: 0, published: true,
});

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium">{label}</label>
    {children}
  </div>
);

const BiField = ({ label, value, onChange, textarea }: { label: string; value: Bi; onChange: (v: Bi) => void; textarea?: boolean }) => (
  <Field label={label}>
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {(["fr", "en"] as const).map((l) => (
        textarea ? (
          <Textarea key={l} rows={3} placeholder={l.toUpperCase()} value={value[l]} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
        ) : (
          <Input key={l} placeholder={l.toUpperCase()} value={value[l]} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
        )
      ))}
    </div>
  </Field>
);

const AdminProjects = () => {
  const [list, setList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setList(await api.get<Project[]>("/projects/admin/all"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chargement impossible");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      const { id, ...payload } = editing;
      if (id) await api.put(`/projects/${id}`, payload);
      else await api.post("/projects", payload);
      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Project) => {
    if (!confirm(`Supprimer « ${p.title} » ?`)) return;
    try {
      await api.del(`/projects/${p.id}`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Suppression impossible");
    }
  };

  // ---- Edit form ----
  if (editing) {
    const e = editing;
    const set = (patch: Partial<Project>) => setEditing({ ...e, ...patch });
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{e.id ? "Modifier le projet" : "Nouveau projet"}</h1>
          <Button variant="ghost" onClick={() => setEditing(null)} className="gap-2"><X className="h-4 w-4" /> Annuler</Button>
        </div>

        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Titre"><Input value={e.title} onChange={(ev) => set({ title: ev.target.value })} /></Field>
            <Field label="Slug (url)"><Input value={e.slug} onChange={(ev) => set({ slug: ev.target.value })} placeholder="mon-projet" /></Field>
            <Field label="Année"><Input value={e.year} onChange={(ev) => set({ year: ev.target.value })} /></Field>
          </div>

          <BiField label="Catégorie" value={e.category} onChange={(v) => set({ category: v })} />
          <BiField label="Rôle" value={e.role} onChange={(v) => set({ role: v })} />
          <BiField label="Accroche (tagline)" value={e.tagline} onChange={(v) => set({ tagline: v })} />
          <BiField label="Description" value={e.description} onChange={(v) => set({ description: v })} textarea />

          <Field label="Points clés — un par ligne (FR puis EN)">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Textarea rows={4} placeholder="FR" value={e.highlights.fr.join("\n")} onChange={(ev) => set({ highlights: { ...e.highlights, fr: ev.target.value.split("\n").filter(Boolean) } })} />
              <Textarea rows={4} placeholder="EN" value={e.highlights.en.join("\n")} onChange={(ev) => set({ highlights: { ...e.highlights, en: ev.target.value.split("\n").filter(Boolean) } })} />
            </div>
          </Field>

          <Field label="Stack — séparé par des virgules"><Input value={e.stack.join(", ")} onChange={(ev) => set({ stack: ev.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></Field>
          <Field label="Image de couverture (URL)"><Input value={e.cover} onChange={(ev) => set({ cover: ev.target.value })} /></Field>
          <Field label="Galerie — une URL par ligne"><Textarea rows={3} value={e.gallery.join("\n")} onChange={(ev) => set({ gallery: ev.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })} /></Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Lien du site (optionnel)"><Input value={e.liveUrl ?? ""} onChange={(ev) => set({ liveUrl: ev.target.value })} /></Field>
            <Field label="Lien GitHub (optionnel)"><Input value={e.githubUrl ?? ""} onChange={(ev) => set({ githubUrl: ev.target.value })} /></Field>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Field label="Ordre"><Input type="number" className="w-24" value={e.order} onChange={(ev) => set({ order: Number(ev.target.value) })} /></Field>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={e.published} onChange={(ev) => set({ published: ev.target.checked })} /> Publié
            </label>
          </div>

          <Button onClick={save} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Enregistrer
          </Button>
        </div>
      </div>
    );
  }

  // ---- List ----
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projets</h1>
          <p className="text-sm text-muted-foreground">{list.length} projet(s)</p>
        </div>
        <Button onClick={() => setEditing(empty())} className="gap-2"><Plus className="h-4 w-4" /> Nouveau</Button>
      </div>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Chargement…</div>
      ) : list.length === 0 ? (
        <p className="text-muted-foreground">Aucun projet. Cliquez sur « Nouveau ».</p>
      ) : (
        <div className="space-y-2">
          {list.map((p) => (
            <div key={p.id} className="card-surface flex items-center gap-4 p-3">
              <img src={p.cover} alt="" className="h-12 w-16 shrink-0 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.title}</p>
                <p className="truncate text-xs text-muted-foreground">/{p.slug} · {p.year} · {p.published ? "publié" : "brouillon"}</p>
              </div>
              <button onClick={() => setEditing(p)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Modifier"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => remove(p)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Supprimer"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
