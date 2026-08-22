import { useState } from "react";
import { ImageOff, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/DynamicIcon";
import { ICON_KEYS } from "@/lib/icons";
import { LOCALES } from "@/lib/content/types";
import type { Locale, LocalizedText } from "@/lib/content/types";
import type { FieldDef } from "@/lib/content/schema";

interface FieldProps {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
  /** Validation message shown under the control. */
  error?: string;
}

const asText = (value: unknown) => (typeof value === "string" ? value : "");
const asLocalized = (value: unknown): LocalizedText => {
  const record = (value ?? {}) as Partial<LocalizedText>;
  return { fr: record.fr ?? "", en: record.en ?? "" };
};

const selectClass =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

const Label = ({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium">
    {children}
  </label>
);

const Help = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs leading-5 text-muted-foreground">{children}</p>
);

/** Renders one editable field. New field types are added here, once. */
export const Field = ({ field, value, onChange, error }: FieldProps) => {
  const { name, label, type, help } = field;
  const [locale, setLocale] = useState<Locale>("fr");

  const wrap = (control: React.ReactNode, htmlFor = name) => (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {control}
      {error ? <p className="text-xs text-destructive">{error}</p> : help && <Help>{help}</Help>}
    </div>
  );

  if (type === "localized" || type === "localizedArea") {
    const localized = asLocalized(value);
    const Control = type === "localized" ? Input : Textarea;
    const missing = LOCALES.filter((code) => !localized[code].trim());

    return (
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor={`${name}-${locale}`}>{label}</Label>

          {/* One language at a time: side by side, long fields turn the form
              into a wall of text and the eye loses the pair it is comparing. */}
          <div
            role="tablist"
            aria-label={`Langue du champ ${label}`}
            className="flex items-center rounded-md border border-border/70 p-0.5 font-mono text-[11px]"
          >
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                role="tab"
                aria-selected={locale === code}
                onClick={() => setLocale(code)}
                className={`rounded px-2 py-0.5 uppercase transition-colors ${
                  locale === code
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {code}
                {!localized[code].trim() && <span className="ml-1 text-destructive">•</span>}
              </button>
            ))}
          </div>
        </div>

        <Control
          id={`${name}-${locale}`}
          rows={type === "localizedArea" ? 8 : undefined}
          value={localized[locale]}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            onChange({ ...localized, [locale]: e.target.value })
          }
        />

        {error ? (
          <p className="text-xs text-destructive">{error}</p>
        ) : missing.length > 0 ? (
          <Help>
            Manquant en {missing.map((code) => code.toUpperCase()).join(" et ")}
            {help ? ` — ${help}` : ""}
          </Help>
        ) : (
          help && <Help>{help}</Help>
        )}
      </div>
    );
  }

  if (type === "list") {
    const list = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <Input
          id={name}
          value={list.join(", ")}
          placeholder="React, NestJS, PostgreSQL"
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            )
          }
        />
        {list.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {list.map((item) => (
              <span key={item} className="chip rounded-md px-2 py-0.5 text-xs">
                {item}
              </span>
            ))}
          </div>
        )}
        {error ? <p className="text-xs text-destructive">{error}</p> : <Help>Séparées par des virgules.</Help>}
      </div>
    );
  }

  if (type === "icon") {
    const current = asText(value);
    return wrap(
      <div className="flex items-center gap-3">
        <span className="icon-tile h-10 w-10 shrink-0">
          <DynamicIcon name={current} className="h-5 w-5" />
        </span>
        <select
          id={name}
          className={selectClass}
          value={current}
          onChange={(e) => onChange(e.target.value)}
        >
          {ICON_KEYS.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>,
    );
  }

  if (type === "boolean") {
    const checked = Boolean(value);
    return (
      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border/70 p-3 transition-colors hover:border-primary/40">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>
          <span className="text-sm font-medium">{label}</span>
          <span className="mt-0.5 block text-xs text-muted-foreground">
            {checked ? "Visible sur le site." : "Brouillon, invisible pour les visiteurs."}
          </span>
        </span>
      </label>
    );
  }

  if (type === "image") {
    const url = asText(value);
    return (
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <div className="flex gap-2">
          <Input
            id={name}
            value={url}
            placeholder="https://…"
            onChange={(e) => onChange(e.target.value)}
          />
          {url && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Retirer l'image"
              onClick={() => onChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid aspect-[16/10] w-44 place-items-center overflow-hidden rounded-md border border-border/70 bg-card/40">
          {url ? (
            <img src={url} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageOff className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        {error ? <p className="text-xs text-destructive">{error}</p> : help && <Help>{help}</Help>}
      </div>
    );
  }

  if (type === "number") {
    const current = typeof value === "number" ? value : 0;
    return wrap(
      <div className="flex items-center gap-3">
        <Input
          id={name}
          type="number"
          min={0}
          max={100}
          className="w-24"
          value={current}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: `${Math.min(Math.max(current, 0), 100)}%` }}
          />
        </div>
      </div>,
    );
  }

  return wrap(
    <Input
      id={name}
      type={type === "date" ? "date" : "text"}
      value={asText(value)}
      onChange={(e) => onChange(e.target.value)}
    />,
  );
};
