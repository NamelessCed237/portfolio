import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Download, LogOut, RefreshCw, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useContent } from "@/lib/content/useContent";
import { COLLECTIONS } from "@/lib/content/schema";
import { signOut } from "@/lib/content/store";
import type { SiteContent } from "@/lib/content/types";

export const Dashboard = () => {
  const { content, status, update, reload } = useContent();
  const fileInput = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio-content.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    setBusy(true);
    try {
      const parsed = JSON.parse(await file.text()) as SiteContent;
      await update(() => parsed);
      toast.success("Contenu importé et enregistré");
    } catch {
      toast.error("Import impossible : fichier invalide ou écriture refusée");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Tableau de bord</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Modifiez le contenu du portfolio et rédigez les articles du blog.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={async () => {
            await signOut();
            navigate("/");
          }}
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </Button>
      </header>

      {status === "offline" && (
        <div className="glow-card border-l-4 border-l-destructive p-5">
          <p className="text-sm font-medium">Base de données injoignable</p>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            Le contenu affiché vient des valeurs livrées avec le code. Vérifiez{" "}
            <code>DATABASE_URL</code> avant d&apos;enregistrer, sinon vos modifications seront
            perdues.
          </p>
        </div>
      )}

      <div className="glow-card p-5">
        <p className="text-sm font-medium">Sauvegarde</p>
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
          Le contenu est enregistré dans la base Neon à chaque modification. L&apos;export JSON
          reste utile comme copie de secours ou pour repartir d&apos;un environnement à l&apos;autre.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Exporter le JSON
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={busy}
            onClick={() => fileInput.current?.click()}
          >
            <Upload className="h-4 w-4" />
            Importer
          </Button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleImport(file);
              e.target.value = "";
            }}
          />
          <Button
            size="sm"
            variant="ghost"
            disabled={busy}
            onClick={async () => {
              await reload();
              toast.success("Contenu rechargé depuis la base");
            }}
          >
            <RefreshCw className="h-4 w-4" />
            Recharger
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((collection) => {
          const count = content[collection.key].length;
          return (
            <Link key={collection.key} to={`/admin/${collection.key}`} className="glow-card p-5">
              <span className="icon-tile">
                <DynamicIcon name={collection.icon} className="h-5 w-5" />
              </span>
              <p className="mt-4 font-medium">{collection.label}</p>
              <p className="text-sm text-muted-foreground">
                {count} {count > 1 ? "entrées" : "entrée"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
