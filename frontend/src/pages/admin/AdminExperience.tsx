import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { Field, BiField, type Bi } from "./fields";

interface Experience {
  id: string;
  kind: string; // work | education
  title: Bi;
  company: string;
  location?: string | null;
  period: string;
  description: Bi;
  tags: string[];
  order: number;
}

const empty = (): Experience => ({
  id: "", kind: "work", title: { fr: "", en: "" }, company: "", location: "",
  period: "", description: { fr: "", en: "" }, tags: [], order: 0,
});

const AdminExperience = () => {
  const [list, setList] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Experience | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setList(await api.get<Experience[]>("/experience/admin/all"));
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
      if (id) await api.put(`/experience/${id}`, payload);
      else await api.post("/experience", payload);
      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (x: Experience) => {
    if (!confirm("Supprimer cette entrée ?")) return;
    try {
      await api.del(`/experience/${x.id}`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Suppression impossible");
    }
  };

  if (editing) {
    const e = editing;
    const set = (patch: Partial<Experience>) => setEditing({ ...e, ...patch });
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{e.id ? "Modifier l'entrée" : "Nouvelle entrée"}</h1>
          <Button variant="ghost" onClick={() => setEditing(null)} className="gap-2"><X className="h-4 w-4" /> Annuler</Button>
        </div>
        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
        <div className="space-y-5">
          <Field label="Type">
            <select value={e.kind} onChange={(ev) => set({ kind: ev.target.value })} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="work">Expérience</option>
              <option value="education">Formation</option>
            </select>
          </Field>
          <BiField label="Titre / Poste" value={e.title} onChange={(v) => set({ title: v })} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Entreprise / École"><Input value={e.company} onChange={(ev) => set({ company: ev.target.value })} /></Field>
            <Field label="Lieu (optionnel)"><Input value={e.location ?? ""} onChange={(ev) => set({ location: ev.target.value })} /></Field>
          </div>
          <Field label="Période"><Input value={e.period} onChange={(ev) => set({ period: ev.target.value })} placeholder="Déc. 2023 - Présent" /></Field>
          <BiField label="Description" value={e.description} onChange={(v) => set({ description: v })} textarea />
          <Field label="Tags — séparés par des virgules"><Input value={e.tags.join(", ")} onChange={(ev) => set({ tags: ev.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} /></Field>
          <Field label="Ordre"><Input type="number" className="w-24" value={e.order} onChange={(ev) => set({ order: Number(ev.target.value) })} /></Field>
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
          <h1 className="text-2xl font-bold">Expérience & Formation</h1>
          <p className="text-sm text-muted-foreground">{list.length} entrée(s)</p>
        </div>
        <Button onClick={() => setEditing(empty())} className="gap-2"><Plus className="h-4 w-4" /> Nouvelle</Button>
      </div>
      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Chargement…</div>
      ) : (
        <div className="space-y-2">
          {list.map((x) => (
            <div key={x.id} className="card-surface flex items-center gap-4 p-3">
              <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{x.kind === "work" ? "Exp" : "Formation"}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{x.title.fr}</p>
                <p className="truncate text-xs text-muted-foreground">{x.company} · {x.period}</p>
              </div>
              <button onClick={() => setEditing(x)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => remove(x)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminExperience;
