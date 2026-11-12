import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { Field } from "./fields";

interface Skill {
  id: string;
  name: string;
  category: string;
  order: number;
}

const empty = (): Skill => ({ id: "", name: "", category: "", order: 0 });

const AdminSkills = () => {
  const [list, setList] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Skill | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setList(await api.get<Skill[]>("/skills/admin/all"));
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
      if (id) await api.put(`/skills/${id}`, payload);
      else await api.post("/skills", payload);
      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (s: Skill) => {
    if (!confirm(`Supprimer « ${s.name} » ?`)) return;
    try {
      await api.del(`/skills/${s.id}`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Suppression impossible");
    }
  };

  if (editing) {
    const e = editing;
    const set = (patch: Partial<Skill>) => setEditing({ ...e, ...patch });
    return (
      <div className="mx-auto max-w-lg">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{e.id ? "Modifier" : "Nouvelle compétence"}</h1>
          <Button variant="ghost" onClick={() => setEditing(null)} className="gap-2"><X className="h-4 w-4" /> Annuler</Button>
        </div>
        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
        <div className="space-y-4">
          <Field label="Nom"><Input value={e.name} onChange={(ev) => set({ name: ev.target.value })} placeholder="React" /></Field>
          <Field label="Catégorie"><Input value={e.category} onChange={(ev) => set({ category: ev.target.value })} placeholder="Frontend" /></Field>
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
          <h1 className="text-2xl font-bold">Compétences</h1>
          <p className="text-sm text-muted-foreground">{list.length} compétence(s)</p>
        </div>
        <Button onClick={() => setEditing(empty())} className="gap-2"><Plus className="h-4 w-4" /> Nouvelle</Button>
      </div>
      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Chargement…</div>
      ) : (
        <div className="space-y-2">
          {list.map((s) => (
            <div key={s.id} className="card-surface flex items-center gap-4 p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">{s.category}</p>
              </div>
              <button onClick={() => setEditing(s)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => remove(s)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSkills;
