import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowDown, ArrowUp, ExternalLink, Pencil, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/admin/PageHeader";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useContent, useLocalized } from "@/lib/content/useContent";
import { reportSaveError } from "@/lib/content/saveError";
import { findCollection } from "@/lib/content/schema";
import type { LocalizedText, Post, SiteContent } from "@/lib/content/types";

type Row = Record<string, unknown> & { id: string };

/** Rows of one collection: search, reorder, edit, delete. */
export const CollectionList = () => {
  const { collection: key } = useParams();
  const collection = findCollection(key);
  const { content, update } = useContent();
  const localized = useLocalized();
  const [query, setQuery] = useState("");

  const items = useMemo(
    () => (collection ? (content[collection.key] as unknown as Row[]) : []),
    [collection, content],
  );

  const rowTitle = useMemo(() => {
    const titleField = collection?.titleField ?? "title";
    return (item: Row) => {
      const value = item[titleField];
      const label = typeof value === "string" ? value : localized(value as LocalizedText);
      return label || "Sans titre";
    };
  }, [collection, localized]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) => rowTitle(item).toLowerCase().includes(needle));
  }, [items, query, rowTitle]);

  if (!collection) return <Navigate to="/admin" replace />;

  const writeList = async (next: Row[], message: string) => {
    try {
      await update(
        (current) => ({ ...current, [collection.key]: next }) as unknown as SiteContent,
      );
      toast.success(message);
    } catch (error) {
      reportSaveError(error);
    }
  };

  const remove = (id: string) =>
    writeList(
      items.filter((item) => item.id !== id),
      "Entrée supprimée",
    );

  // Order is what the public site renders, so it is edited here rather than
  // hidden behind a position field in the form.
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    return writeList(next, "Ordre mis à jour");
  };

  const isPosts = collection.key === "posts";

  return (
    <>
      <PageHeader
        eyebrow={`// ${collection.key}`}
        title={collection.label}
        description={`${items.length} ${items.length > 1 ? "entrées" : "entrée"}`}
        actions={
          <Button asChild size="sm">
            <Link to={`/admin/${collection.key}/new`}>
              <Plus className="h-4 w-4" />
              Nouvelle entrée
            </Link>
          </Button>
        }
      />

      <div className="space-y-4">
        {items.length > 3 && (
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher…"
              aria-label="Rechercher dans la liste"
              className="pl-9"
            />
          </div>
        )}

        {items.length === 0 ? (
          <div className="glow-card p-12 text-center">
            <span className="icon-tile mx-auto">
              <DynamicIcon name={collection.icon} className="h-6 w-6" />
            </span>
            <p className="mt-4 font-medium">Aucune entrée</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Créez la première pour la voir apparaître sur le site.
            </p>
            <Button asChild className="mt-6">
              <Link to={`/admin/${collection.key}/new`}>
                <Plus className="h-4 w-4" />
                Nouvelle entrée
              </Link>
            </Button>
          </div>
        ) : visible.length === 0 ? (
          <p className="glow-card p-10 text-center text-sm text-muted-foreground">
            Aucun résultat pour « {query} ».
          </p>
        ) : (
          <ul className="glow-card divide-y divide-border/60">
            {visible.map((item) => {
              const index = items.indexOf(item);
              const post = isPosts ? (item as unknown as Post) : null;

              return (
                <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                  {/* Reordering follows the stored order, so it is disabled
                      while a search is narrowing the list. */}
                  <div className="hidden shrink-0 flex-col sm:flex">
                    <button
                      type="button"
                      aria-label="Monter"
                      disabled={index === 0 || Boolean(query)}
                      onClick={() => void move(index, -1)}
                      className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Descendre"
                      disabled={index === items.length - 1 || Boolean(query)}
                      onClick={() => void move(index, 1)}
                      className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <Link
                    to={`/admin/${collection.key}/${item.id}`}
                    className="min-w-0 flex-1 py-1 transition-colors hover:text-primary"
                  >
                    <p className="truncate font-medium">{rowTitle(item)}</p>
                    {post && (
                      <p className="truncate font-mono text-xs text-muted-foreground">
                        {post.date} · /blog/{post.slug || "…"}
                      </p>
                    )}
                  </Link>

                  {post && (
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        post.published
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {post.published ? "Publié" : "Brouillon"}
                    </span>
                  )}

                  <div className="flex shrink-0 items-center gap-1">
                    {post?.published && post.slug && (
                      <Button asChild size="icon" variant="ghost" aria-label="Voir sur le site">
                        <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button asChild size="icon" variant="ghost" aria-label="Modifier">
                      <Link to={`/admin/${collection.key}/${item.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <ConfirmDelete onConfirm={() => remove(item.id)} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};
