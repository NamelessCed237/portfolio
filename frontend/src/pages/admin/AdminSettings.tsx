import { useEffect, useState } from "react";
import { Save, Loader2, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, resolveMediaUrl } from "@/lib/api";
import { Field } from "./fields";
import { FileUpload } from "./FileUpload";

const AdminSettings = () => {
  const [cvUrl, setCvUrl] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const s = await api.get<Record<string, string>>("/settings");
        setCvUrl(s.cvUrl ?? "");
        setEmail(s.email ?? "");
        setLocation(s.location ?? "");
        setGithubUrl(s.githubUrl ?? "");
        setLinkedinUrl(s.linkedinUrl ?? "");
        setTwitterUrl(s.twitterUrl ?? "");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Chargement impossible");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      await Promise.all([
        api.put("/settings/cvUrl", { value: cvUrl }),
        api.put("/settings/email", { value: email }),
        api.put("/settings/location", { value: location }),
        api.put("/settings/githubUrl", { value: githubUrl }),
        api.put("/settings/linkedinUrl", { value: linkedinUrl }),
        api.put("/settings/twitterUrl", { value: twitterUrl }),
      ]);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Chargement…</div>;
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">Paramètres</h1>
      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      <div className="space-y-6">
        <Field label="CV (PDF)">
          <FileUpload value={cvUrl} onChange={setCvUrl} accept="application/pdf" preview={false} />
          {cvUrl && (
            <a href={resolveMediaUrl(cvUrl)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1.5 text-sm link-accent">
              <FileText className="h-4 w-4" /> Voir le CV actuel <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </Field>

        <Field label="Email de contact"><Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@bikecedric.dev" /></Field>
        <Field label="Localisation"><Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Bafoussam, Cameroun" /></Field>

        <div className="space-y-4 border-t border-border pt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Réseaux sociaux</h2>
          <Field label="Lien GitHub"><Input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/votre-profil" /></Field>
          <Field label="Lien LinkedIn"><Input type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/votre-profil" /></Field>
          <Field label="Lien Twitter / X (optionnel)"><Input type="url" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} placeholder="https://twitter.com/votre-profil" /></Field>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={save} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Enregistrer
          </Button>
          {saved && <span className="text-sm text-primary">Enregistré ✓</span>}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
