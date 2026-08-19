import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isAuthenticated, signIn } from "@/lib/content/store";
import { useContent } from "@/lib/content/useContent";

/**
 * Password gate in front of the dashboard. The check that matters happens in
 * the API: every write is rejected without the session cookie, so this only
 * decides what to render.
 */
export const AdminGate = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<"checking" | "locked" | "open">("checking");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { reload } = useContent();

  useEffect(() => {
    isAuthenticated()
      .then((ok) => setState(ok ? "open" : "locked"))
      .catch(() => setState("locked"));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(false);

    const ok = await signIn(password);
    if (ok) {
      // Drafts are only returned to an authenticated caller.
      await reload();
      setState("open");
    } else {
      setError(true);
    }
    setSubmitting(false);
  };

  if (state === "checking") {
    return (
      <div className="grid min-h-screen place-items-center font-mono text-sm text-muted-foreground">
        <span className="inline-block h-4 w-2 animate-pulse bg-primary" />
      </div>
    );
  }

  if (state === "open") return <>{children}</>;

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="glow-blob left-1/3 top-1/4 h-72 w-72 bg-primary/20" />

      <form onSubmit={handleSubmit} className="glow-card relative w-full max-w-sm space-y-5 p-8">
        <div className="flex items-center gap-3">
          <span className="icon-tile">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-lg font-semibold">Administration</h1>
            <p className="font-mono text-xs text-muted-foreground">// accès restreint</p>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Mot de passe
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-destructive">Mot de passe incorrect.</p>}
        </div>

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Connexion…" : "Se connecter"}
        </Button>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au site
        </Link>
      </form>
    </div>
  );
};
