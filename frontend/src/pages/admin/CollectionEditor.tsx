import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/admin/Field";
import { useContent } from "@/lib/content/useContent";
import { findCollection } from "@/lib/content/schema";
import type { EditableRecord } from "@/lib/content/schema";
import type { SiteContent } from "@/lib/content/types";

/** Create or edit one record of any collection, driven by its field definitions. */
export const CollectionEditor = () => {
  const { collection: key, id } = useParams();
  const collection = findCollection(key);
  const { content, update } = useContent();
  const navigate = useNavigate();

  const isNew = id === "new";
  const existing = collection
    ? (content[collection.key].find((item) => item.id === id) as EditableRecord | undefined)
    : undefined;

  const [draft, setDraft] = useState<EditableRecord>(() => existing ?? collection?.blank() ?? {});
  const [saving, setSaving] = useState(false);

  if (!collection) return <Navigate to="/admin" replace />;
  if (!isNew && !existing) return <Navigate to={`/admin/${collection.key}`} replace />;

  const save = async () => {
    setSaving(true);
    try {
      await update((current) => {
        const list = current[collection.key] as unknown as EditableRecord[];
        const next = isNew
          ? [...list, draft]
          : list.map((item) => (item.id === draft.id ? draft : item));
        return { ...current, [collection.key]: next } as SiteContent;
      });
      toast.success(isNew ? "Entrée créée" : "Modifications enregistrées");
      navigate(`/admin/${collection.key}`);
    } catch (error) {
      toast.error(
        error instanceof Error && error.message === "unauthorized"
          ? "Session expirée — reconnectez-vous"
          : "Enregistrement impossible",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 mb-1"
            onClick={() => navigate(`/admin/${collection.key}`)}
          >
            <ArrowLeft className="h-4 w-4" />
            {collection.label}
          </Button>
          <h1 className="text-2xl font-semibold">
            {isNew ? "Nouvelle entrée" : "Modifier une entrée"}
          </h1>
        </div>
        <Button onClick={() => void save()} disabled={saving}>
          <Save className="h-4 w-4" />
          Enregistrer
        </Button>
      </header>

      <div className="glow-card space-y-6 p-6">
        {collection.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={draft[field.name]}
            onChange={(value) => setDraft((current) => ({ ...current, [field.name]: value }))}
          />
        ))}
      </div>
    </div>
  );
};
