import { useMemo, useState } from "react";
import { GripVertical, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/admin/Field";
import { PageHeader } from "@/components/admin/PageHeader";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useContent } from "@/lib/content/useContent";
import { reportSaveError } from "@/lib/content/saveError";
import { PROFILE_FIELDS } from "@/lib/content/schema";
import { ICON_KEYS } from "@/lib/icons";
import { createId } from "@/lib/content/store";
import type { Profile, SocialLink } from "@/lib/content/types";

/** Field groups, so the form reads as sections instead of one long column. */
const GROUPS: { title: string; description: string; fields: string[] }[] = [
  {
    title: "Identité",
    description: "Utilisée dans le hero, le pied de page et la page contact.",
    fields: ["name", "email", "location"],
  },
  {
    title: "Hero",
    description: "Le bloc en haut de la page d'accueil.",
    fields: ["greeting", "role", "bio", "availability"],
  },
  {
    title: "À propos",
    description: "La section de présentation sur l'accueil.",
    fields: ["aboutTitle", "aboutDescription", "aboutHighlight"],
  },
];

export const ProfileEditor = () => {
  const { content, update } = useContent();
  const [draft, setDraft] = useState<Profile>(content.profile);
  const [saving, setSaving] = useState(false);

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(content.profile),
    [draft, content.profile],
  );

  const setField = (name: string, value: unknown) =>
    setDraft((current) => ({ ...current, [name]: value }) as Profile);

  const setSocial = (id: string, patch: Partial<SocialLink>) =>
    setDraft((current) => ({
      ...current,
      socials: current.socials.map((social) =>
        social.id === id ? { ...social, ...patch } : social,
      ),
    }));

  const save = async () => {
    setSaving(true);
    try {
      await update((current) => ({ ...current, profile: draft }));
      toast.success("Profil enregistré");
    } catch (error) {
      reportSaveError(error);
    } finally {
      setSaving(false);
    }
  };

  const fieldByName = (name: string) => PROFILE_FIELDS.find((field) => field.name === name);

  return (
    <>
      <PageHeader
        eyebrow="// profil"
        title="Profil"
        description="Identité, textes du hero et de la section À propos."
        status={
          dirty ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Non enregistré
            </span>
          ) : null
        }
        actions={
          <Button size="sm" onClick={() => void save()} disabled={saving || !dirty}>
            <Save className="h-4 w-4" />
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
        }
      />

      <div className="space-y-6">
        {GROUPS.map((group) => (
          <section key={group.title} className="glow-card p-6">
            <div className="mb-5 border-b border-border/60 pb-4">
              <h2 className="font-semibold">{group.title}</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{group.description}</p>
            </div>

            <div className="space-y-6">
              {group.fields.map((name) => {
                const field = fieldByName(name);
                if (!field) return null;
                return (
                  <Field
                    key={name}
                    field={field}
                    value={(draft as unknown as Record<string, unknown>)[name]}
                    onChange={(value) => setField(name, value)}
                  />
                );
              })}
            </div>
          </section>
        ))}

        <section className="glow-card p-6">
          <div className="mb-5 flex items-start justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <h2 className="font-semibold">Réseaux</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Affichés dans le hero, le pied de page et la page contact.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  socials: [
                    ...current.socials,
                    { id: createId(), label: "", href: "", icon: "link" },
                  ],
                }))
              }
            >
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </div>

          {draft.socials.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">Aucun lien.</p>
          ) : (
            <ul className="space-y-3">
              {draft.socials.map((social) => (
                <li
                  key={social.id}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-border/60 p-3 sm:grid-cols-[auto_1fr_1.6fr_auto_auto]"
                >
                  <GripVertical className="hidden h-4 w-4 text-muted-foreground sm:block" />

                  <Input
                    aria-label="Libellé"
                    placeholder="GitHub"
                    value={social.label}
                    onChange={(e) => setSocial(social.id, { label: e.target.value })}
                  />
                  <Input
                    aria-label="Lien"
                    placeholder="https://github.com/…"
                    className="col-span-2 sm:col-span-1"
                    value={social.href}
                    onChange={(e) => setSocial(social.id, { href: e.target.value })}
                  />

                  <div className="flex items-center gap-2">
                    <span className="icon-tile h-9 w-9 shrink-0">
                      <DynamicIcon name={social.icon} className="h-4 w-4" />
                    </span>
                    <select
                      aria-label="Icône"
                      className="h-9 rounded-md border border-input bg-transparent px-2 text-sm"
                      value={social.icon}
                      onChange={(e) => setSocial(social.id, { icon: e.target.value })}
                    >
                      {ICON_KEYS.map((iconKey) => (
                        <option key={iconKey} value={iconKey}>
                          {iconKey}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Supprimer ${social.label || "le lien"}`}
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        socials: current.socials.filter((item) => item.id !== social.id),
                      }))
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};
