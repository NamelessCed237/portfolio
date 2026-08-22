import { useEffect, useRef, useState } from "react";
import { Check, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteProps {
  onConfirm: () => void | Promise<void>;
  label?: string;
}

/**
 * Two-step delete: the trash icon arms the action, a second click carries it
 * out. Removing an entry is irreversible, and a modal for a one-line row is
 * more ceremony than it is worth.
 */
export const ConfirmDelete = ({ onConfirm, label = "Supprimer" }: ConfirmDeleteProps) => {
  const [armed, setArmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Disarm on its own, so a forgotten click is not a landmine for the next one.
  useEffect(() => {
    if (!armed) return;
    timer.current = setTimeout(() => setArmed(false), 5000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [armed]);

  if (!armed) {
    return (
      <Button size="icon" variant="ghost" aria-label={label} onClick={() => setArmed(true)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <span className="hidden text-xs text-muted-foreground sm:inline">Confirmer ?</span>
      <Button
        size="icon"
        variant="ghost"
        aria-label="Confirmer la suppression"
        disabled={busy}
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={async () => {
          setBusy(true);
          try {
            await onConfirm();
          } finally {
            setBusy(false);
            setArmed(false);
          }
        }}
      >
        <Check className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" aria-label="Annuler" onClick={() => setArmed(false)}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
