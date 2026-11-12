import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, setToken } from "@/lib/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post<{ token: string }>("/auth/login", { email, password });
      setToken(res.token);
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="card-surface w-full max-w-sm p-7">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-lg font-semibold">Espace admin</h1>
            <p className="text-xs text-muted-foreground">Connectez-vous pour gérer le contenu</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@bikecedric.dev" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Mot de passe</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Connexion…" : "Se connecter"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
