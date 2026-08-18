import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ICON_KEYS } from "@/lib/icons";
import { DynamicIcon } from "@/components/DynamicIcon";
import { LOCALES } from "@/lib/content/types";
import type { LocalizedText } from "@/lib/content/types";
import type { FieldDef } from "@/lib/content/schema";

interface FieldProps {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}

const asText = (value: unknown) => (typeof value === "string" ? value : "");
const asLocalized = (value: unknown): LocalizedText => {
  const record = (value ?? {}) as Partial<LocalizedText>;
  return { fr: record.fr ?? "", en: record.en ?? "" };
};

const inputClass = "w-full";
const selectClass =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

/**
 * Renders one editable field. Every admin form is a list of these, so a new
 * field type is added once here rather than in each page.
 */
export const Field = ({ field, value, onChange }: FieldProps) => {
  const { name, label, type, help } = field;

  const labelled = (control: React.ReactNode, htmlFor?: string) => (
    <div className="space-y-2">
      <label htmlFor={htmlFor ?? name} className="text-sm font-medium">
        {label}
      </label>
      {control}
      {help && <p className="text-xs text-muted-foreground">{help}</p>}
    </div>
  );

  if (type === "localized" || type === "localizedArea") {
    const localized = asLocalized(value);
    const Control = type === "localized" ? Input : Textarea;
    return (
      <div className="space-y-2">
        <span className="text-sm font-medium">{label}</span>
        <div className="grid gap-3 sm:grid-cols-2">
          {LOCALES.map((locale) => (
            <div key={locale} className="space-y-1.5">
              <label
                htmlFor={`${name}-${locale}`}
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {locale}
              </label>
              <Control
                id={`${name}-${locale}`}
                rows={type === "localizedArea" ? 6 : undefined}
                value={localized[locale]}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                  onChange({ ...localized, [locale]: e.target.value })
                }
              />
            </div>
          ))}
        </div>
        {help && <p className="text-xs text-muted-foreground">{help}</p>}
      </div>
    );
  }

  if (type === "list") {
    const list = Array.isArray(value) ? (value as string[]) : [];
    return labelled(
      <>
        <Input
          id={name}
          value={list.join(", ")}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            )
          }
        />
        <p className="text-xs text-muted-foreground">Séparées par des virgules.</p>
      </>,
    );
  }

  if (type === "icon") {
    const current = asText(value);
    return labelled(
      <div className="flex items-center gap-3">
        <span className="icon-tile shrink-0">
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
    return (
      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          type="checkbox"
          className="h-4 w-4 accent-[hsl(var(--primary))]"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label}
      </label>
    );
  }

  if (type === "image") {
    const url = asText(value);
    return labelled(
      <>
        <Input id={name} value={url} onChange={(e) => onChange(e.target.value)} placeholder="https://…" />
        {url && (
          <img
            src={url}
            alt=""
            className="mt-2 aspect-[16/10] w-48 rounded-md border border-border object-cover"
          />
        )}
      </>,
    );
  }

  if (type === "number") {
    return labelled(
      <Input
        id={name}
        type="number"
        min={0}
        max={100}
        value={typeof value === "number" ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />,
    );
  }

  return labelled(
    <Input
      id={name}
      type={type === "date" ? "date" : "text"}
      className={inputClass}
      value={asText(value)}
      onChange={(e) => onChange(e.target.value)}
    />,
  );
};
