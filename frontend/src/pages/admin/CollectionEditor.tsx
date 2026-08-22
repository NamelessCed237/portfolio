import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/admin/Field";
import { PageHeader } from "@/components/admin/PageHeader";
import { useContent, useLocalized } from "@/lib/content/useContent";
import { reportSaveError } from "@/lib/content/saveError";
import { findCollection } from "@/lib/content/schema";
import type { EditableRecord, FieldDef } from "@/lib/content/schema";
import { isValidSlug, slugify } from "@/lib/content/slug";
import type { LocalizedText, SiteContent } from "@/lib/content/types";

/** Fields that belong in the right-hand column rather than the main body. */
const META_FIELDS = new Set(["slug", "date", "cover", "tags", "published", "icon", "percent"]);

const localizedValue = (value: unknown): LocalizedText | null => {
  if (!value || typeof value !== "object") return null;
  const record = value as Partial<LocalizedText>;
  return typeof record.fr === "string" && typeof record.en === "string"
    ? (record as LocalizedText)
    : null;
};

/** Create or edit one record of any collection, driven by its field definitions. */
export const CollectionEditor = () => {
  const { collection: key, id } = useParams();
  const collection = findCollection(key);
  const { content, update } = useContent();
  const localized = useLocalized();
  const navigate = useNavigate();

  const isNew = id === "new";
  const existing = collection
    ? (content[collection.key].find((item) => item.id === id) as EditableRecord | undefined)
    : undefined;

  // Captured once: blank() mints a fresh id on every call, so recomputing the
  // baseline would report the form as dirty before a single keystroke.
  const [baseline] = useState<EditableRecord>(() => existing ?? collection?.blank() ?? {});
  const [draft, setDraft] = useState<EditableRecord>(baseline);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(baseline),
    [draft, baseline],
  );

  // Closing the tab mid-edit should cost a confirmation, not the text.
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (!collection) return <Navigate to="/admin" replace />;
  if (!isNew && !existing) return <Navigate to={`/admin/${collection.key}`} replace />;

  const setField = (name: string, value: unknown) => {
    setErrors((current) => ({ ...current, [name]: "" }));
    setDraft((current) => {
      const next = { ...current, [name]: value };

      // A post is reachable by its slug: derive one from the title until the
      // author writes their own.
      if (name === "title" && "slug" in current) {
        const title = localizedValue(value);
        const currentSlug = typeof current.slug === "string" ? current.slug : "";
        const previousTitle = localizedValue(current.title);
        const wasDerived = !currentSlug || currentSlug === slugify(previousTitle?.fr ?? "");
        if (title && wasDerived) next.slug = slugify(title.fr);
      }

      return next;
    });
  };

  const validate = (): boolean => {
    const found: Record<string, string> = {};

    for (const field of collection.fields) {
      const value = draft[field.name];

      if (field.type === "localized" || field.type === "localizedArea") {
        const text = localizedValue(value);
        if (field.name === collection.titleField && !text?.fr.trim() && !text?.en.trim()) {
          found[field.name] = "Renseignez au moins une langue.";
        }
      }

      if (field.name === "slug") {
        const slug = typeof value === "string" ? value : "";
        if (!slug) found.slug = "Le slug est obligatoire.";
        else if (!isValidSlug(slug))
          found.slug = "Minuscules, chiffres et tirets uniquement (ex. mon-article).";
        else if (
          content.posts.some((post) => post.slug === slug && post.id !== draft.id)
        )
          found.slug = "Ce slug est déjà utilisé par un autre article.";
      }
    }

    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const save = async () => {
    if (!validate()) {
      toast.error("Corrigez les champs signalés");
      return;
    }

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
      reportSaveError(error);
    } finally {
      setSaving(false);
    }
  };

  const leave = () => {
    if (dirty && !window.confirm("Modifications non enregistrées. Quitter quand même ?")) return;
    navigate(`/admin/${collection.key}`);
  };

  const renderFields = (fields: FieldDef[]) =>
    fields.map((field) => (
      <Field
        key={field.name}
        field={field}
        value={draft[field.name]}
        error={errors[field.name] || undefined}
        onChange={(value) => setField(field.name, value)}
      />
    ));

  const mainFields = collection.fields.filter((field) => !META_FIELDS.has(field.name));
  const metaFields = collection.fields.filter((field) => META_FIELDS.has(field.name));

  const titleValue = draft[collection.titleField];
  const heading =
    (typeof titleValue === "string" ? titleValue : localized(localizedValue(titleValue) ?? undefined)) ||
    (isNew ? "Nouvelle entrée" : "Sans titre");

  const slug = typeof draft.slug === "string" ? draft.slug : "";
  const isPublished = draft.published === true;

  return (
    <>
      <PageHeader
        eyebrow={`// ${collection.label.toLowerCase()}`}
        title={heading}
        status={
          dirty ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Non enregistré
            </span>
          ) : null
        }
        actions={
          <>
            {isPublished && slug && (
              <Button asChild size="sm" variant="ghost">
                <a href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Voir
                </a>
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={leave}>
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <Button size="sm" onClick={() => void save()} disabled={saving || !dirty}>
              <Save className="h-4 w-4" />
              {saving ? "Enregistrement…" : "Enregistrer"}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="glow-card space-y-6 p-6">{renderFields(mainFields)}</div>

        {metaFields.length > 0 && (
          <aside className="glow-card h-fit space-y-6 p-6 xl:sticky xl:top-28">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Réglages
            </p>
            {renderFields(metaFields)}
          </aside>
        )}
      </div>
    </>
  );
};
