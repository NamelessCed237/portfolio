import { useRef } from "react";
import { Link } from "react-router-dom";
import { Download, RotateCcw, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content/useContent";
import { COLLECTIONS } from "@/lib/content/schema";
import { DynamicIcon } from "@/components/DynamicIcon";
import type { SiteContent } from "@/lib/content/types";

export const Dashboard = () => {
  const { content, update, reset } = useContent();
  const fileInput = useRef<HTMLInputElement>(null);

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
    try {
      const parsed = JSON.parse(await file.text()) as SiteContent;
      update(() => parsed);
      toast.success("Contenu importé");
    } catch {
      toast.error("Fichier JSON invalide");
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Tableau de bord</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Modifiez le contenu du portfolio et rédigez les articles du blog.
        </p>
      </header>

      <div className="glow-card border-l-4 border-l-primary p-5">
        <p className="text-sm font-medium">Stockage local</p>
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
          Les modifications sont enregistrées dans <strong>ce navigateur uniquement</strong> et ne
          sont visibles par personne d&apos;autre. Exportez le JSON pour le versionner dans le
          dépôt — ou branchez une API : seul <code>lib/content/store.ts</code> est à remplacer.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Exporter le JSON
          </Button>
          <Button size="sm" variant="outline" onClick={() => fileInput.current?.click()}>
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
            onClick={() => {
              reset();
              toast.success("Contenu réinitialisé");
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((collection) => {
          const count = content[collection.key].length;
          return (
            <Link
              key={collection.key}
              to={`/admin/${collection.key}`}
              className="glow-card p-5"
            >
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
