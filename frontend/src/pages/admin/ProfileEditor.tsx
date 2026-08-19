import { useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/admin/Field";
import { useContent } from "@/lib/content/useContent";
import { PROFILE_FIELDS } from "@/lib/content/schema";
import { ICON_KEYS } from "@/lib/icons";
import { DynamicIcon } from "@/components/DynamicIcon";
import { createId } from "@/lib/content/store";
import type { Profile, SocialLink } from "@/lib/content/types";

/** The singleton record: identity, hero copy and social links. */
export const ProfileEditor = () => {
  const { content, update } = useContent();
  const [draft, setDraft] = useState<Profile>(content.profile);

  const setField = (name: string, value: unknown) =>
    setDraft((current) => ({ ...current, [name]: value }) as Profile);

  const setSocial = (id: string, patch: Partial<SocialLink>) =>
    setDraft((current) => ({
      ...current,
      socials: current.socials.map((social) => (social.id === id ? { ...social, ...patch } : social)),
    }));

  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await update((current) => ({ ...current, profile: draft }));
      toast.success("Profil enregistré");
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
          <h1 className="text-2xl font-semibold">Profil</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Identité, textes du hero et de la section À propos.
          </p>
        </div>
        <Button onClick={() => void save()} disabled={saving}>
          <Save className="h-4 w-4" />
          Enregistrer
        </Button>
      </header>

      <div className="glow-card space-y-6 p-6">
        {PROFILE_FIELDS.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={(draft as unknown as Record<string, unknown>)[field.name]}
            onChange={(value) => setField(field.name, value)}
          />
        ))}
      </div>

      <div className="glow-card space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Réseaux</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setDraft((current) => ({
                ...current,
                socials: [...current.socials, { id: createId(), label: "", href: "", icon: "link" }],
              }))
            }
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>

        <ul className="space-y-3">
          {draft.socials.map((social) => {
            return (
              <li key={social.id} className="grid gap-3 sm:grid-cols-[auto_1fr_1.5fr_auto]">
                <span className="icon-tile">
                  <DynamicIcon name={social.icon} className="h-5 w-5" />
                </span>
                <Input
                  aria-label="Libellé"
                  placeholder="Libellé"
                  value={social.label}
                  onChange={(e) => setSocial(social.id, { label: e.target.value })}
                />
                <Input
                  aria-label="Lien"
                  placeholder="https://…"
                  value={social.href}
                  onChange={(e) => setSocial(social.id, { href: e.target.value })}
                />
                <div className="flex items-center gap-2">
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
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Supprimer"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        socials: current.socials.filter((item) => item.id !== social.id),
                      }))
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
