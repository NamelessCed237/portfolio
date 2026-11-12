import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { Field, BiField, type Bi } from "./fields";

interface Post {
  id: string;
  slug: string;
  title: Bi;
  excerpt: Bi;
  content: Bi;
  cover?: string | null;
  tags: string[];
  published: boolean;
}

const empty = (): Post => ({
  id: "", slug: "", title: { fr: "", en: "" }, excerpt: { fr: "", en: "" },
  content: { fr: "", en: "" }, cover: "", tags: [], published: false,
});

const AdminBlog = () => {
  const [list, setList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Post | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setList(await api.get<Post[]>("/blog/admin/all"));
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
      if (id) await api.put(`/blog/${id}`, payload);
      else await api.post("/blog", payload);
      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Post) => {
    if (!confirm("Supprimer cet article ?")) return;
    try {
      await api.del(`/blog/${p.id}`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Suppression impossible");
    }
  };

  if (editing) {
    const e = editing;
    const set = (patch: Partial<Post>) => setEditing({ ...e, ...patch });
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{e.id ? "Modifier l'article" : "Nouvel article"}</h1>
          <Button variant="ghost" onClick={() => setEditing(null)} className="gap-2"><X className="h-4 w-4" /> Annuler</Button>
        </div>
        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
        <div className="space-y-5">
          <Field label="Slug (url)"><Input value={e.slug} onChange={(ev) => set({ slug: ev.target.value })} placeholder="mon-article" /></Field>
          <BiField label="Titre" value={e.title} onChange={(v) => set({ title: v })} />
          <BiField label="Extrait" value={e.excerpt} onChange={(v) => set({ excerpt: v })} textarea />
          <BiField label="Contenu (Markdown / HTML)" value={e.content} onChange={(v) => set({ content: v })} textarea />
          <Field label="Image de couverture (URL)"><Input value={e.cover ?? ""} onChange={(ev) => set({ cover: ev.target.value })} /></Field>
          <Field label="Tags — séparés par des virgules"><Input value={e.tags.join(", ")} onChange={(ev) => set({ tags: ev.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} /></Field>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={e.published} onChange={(ev) => set({ published: ev.target.checked })} /> Publié
          </label>
          <Button onClick={save} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Enregistrer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="text-sm text-muted-foreground">{list.length} article(s)</p>
        </div>
        <Button onClick={() => setEditing(empty())} className="gap-2"><Plus className="h-4 w-4" /> Nouvel article</Button>
      </div>
      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Chargement…</div>
      ) : list.length === 0 ? (
        <p className="text-muted-foreground">Aucun article.</p>
      ) : (
        <div className="space-y-2">
          {list.map((p) => (
            <div key={p.id} className="card-surface flex items-center gap-4 p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.title.fr || "(sans titre)"}</p>
                <p className="truncate text-xs text-muted-foreground">/{p.slug} · {p.published ? "publié" : "brouillon"}</p>
              </div>
              <button onClick={() => setEditing(p)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => remove(p)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
