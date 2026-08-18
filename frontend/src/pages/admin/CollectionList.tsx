import { Link, useParams, Navigate } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useContent, useLocalized } from "@/lib/content/useContent";
import { findCollection } from "@/lib/content/schema";
import type { LocalizedText, SiteContent } from "@/lib/content/types";

/** Rows of one collection, with create / edit / delete. */
export const CollectionList = () => {
  const { collection: key } = useParams();
  const collection = findCollection(key);
  const { content, update } = useContent();
  const localized = useLocalized();

  if (!collection) return <Navigate to="/admin" replace />;

  const items = content[collection.key];

  const remove = (id: string) => {
    update(
      (current) =>
        ({
          ...current,
          [collection.key]: current[collection.key].filter((item) => item.id !== id),
        }) as SiteContent,
    );
    toast.success("Entrée supprimée");
  };

  const rowTitle = (item: Record<string, unknown>) => {
    const value = item[collection.titleField];
    const label = typeof value === "string" ? value : localized(value as LocalizedText);
    return label || "Sans titre";
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{collection.label}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} {items.length > 1 ? "entrées" : "entrée"}
          </p>
        </div>
        <Button asChild>
          <Link to={`/admin/${collection.key}/new`}>
            <Plus className="h-4 w-4" />
            Nouvelle entrée
          </Link>
        </Button>
      </header>

      {items.length === 0 ? (
        <div className="glow-card p-10 text-center">
          <p className="text-sm text-muted-foreground">Aucune entrée pour le moment.</p>
        </div>
      ) : (
        <ul className="glow-card divide-y divide-border">
          {items.map((item) => {
            const record = item as unknown as Record<string, unknown>;
            const isDraft = "published" in record && record.published === false;
            return (
              <li key={item.id} className="flex items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{rowTitle(record)}</p>
                  {"slug" in record && (
                    <p className="truncate text-xs text-muted-foreground">
                      /blog/{String(record.slug)}
                    </p>
                  )}
                </div>

                {isDraft && <span className="chip shrink-0">Brouillon</span>}

                <div className="flex shrink-0 items-center gap-1">
                  <Button asChild size="icon" variant="ghost" aria-label="Modifier">
                    <Link to={`/admin/${collection.key}/${item.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Supprimer"
                    onClick={() => remove(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
