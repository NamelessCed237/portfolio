import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface Bi {
  fr: string;
  en: string;
}

export const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium">{label}</label>
    {children}
  </div>
);

/** Bilingual (FR/EN) text field — input or textarea. */
export const BiField = ({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: Bi;
  onChange: (v: Bi) => void;
  textarea?: boolean;
}) => (
  <Field label={label}>
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {(["fr", "en"] as const).map((l) =>
        textarea ? (
          <Textarea key={l} rows={3} placeholder={l.toUpperCase()} value={value[l]} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
        ) : (
          <Input key={l} placeholder={l.toUpperCase()} value={value[l]} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
        ),
      )}
    </div>
  </Field>
);
