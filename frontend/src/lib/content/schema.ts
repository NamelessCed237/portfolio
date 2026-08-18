import type { CollectionKey } from "./types";
import { createId } from "./store";

export type FieldType =
  | "text"
  | "localized"
  | "localizedArea"
  | "list"
  | "icon"
  | "image"
  | "date"
  | "number"
  | "boolean";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
}

/** A record being edited. Shapes are enforced by the field definitions below. */
export type EditableRecord = Record<string, unknown>;

export interface CollectionDef {
  key: CollectionKey;
  label: string;
  icon: string;
  /** Field rendered as the row title in the list view. */
  titleField: string;
  fields: FieldDef[];
  blank: () => EditableRecord;
}

const emptyText = () => ({ fr: "", en: "" });

/**
 * One definition per editable collection. The dashboard list and form pages are
 * generic: adding a field here is enough to make it editable, and adding a
 * collection only needs an entry in this array plus the matching type.
 */
export const COLLECTIONS: CollectionDef[] = [
  {
    key: "posts",
    label: "Blog",
    icon: "code",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre", type: "localized" },
      { name: "slug", label: "Slug", type: "text", help: "Segment d'URL : /blog/mon-article" },
      { name: "date", label: "Date", type: "date" },
      { name: "cover", label: "Image de couverture", type: "image" },
      { name: "tags", label: "Tags", type: "list" },
      { name: "excerpt", label: "Résumé", type: "localizedArea" },
      {
        name: "body",
        label: "Contenu",
        type: "localizedArea",
        help: "Une ligne vide sépare les paragraphes. « ## » pour un titre, « - » pour une puce.",
      },
      { name: "published", label: "Publié", type: "boolean" },
    ],
    blank: () => ({
      id: createId(),
      slug: "",
      title: emptyText(),
      excerpt: emptyText(),
      body: emptyText(),
      cover: "",
      tags: [],
      date: new Date().toISOString().slice(0, 10),
      published: false,
    }),
  },
  {
    key: "projects",
    label: "Projets",
    icon: "layers",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre", type: "localized" },
      { name: "description", label: "Description", type: "localizedArea" },
      { name: "image", label: "Image", type: "image" },
      { name: "url", label: "Lien", type: "text" },
      { name: "tech", label: "Technologies", type: "list" },
    ],
    blank: () => ({
      id: createId(),
      title: emptyText(),
      description: emptyText(),
      image: "",
      url: "",
      tech: [],
    }),
  },
  {
    key: "services",
    label: "Services",
    icon: "monitor",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre", type: "localized" },
      { name: "description", label: "Description", type: "localizedArea" },
      { name: "icon", label: "Icône", type: "icon" },
    ],
    blank: () => ({ id: createId(), icon: "monitor", title: emptyText(), description: emptyText() }),
  },
  {
    key: "skills",
    label: "Compétences",
    icon: "code2",
    titleField: "title",
    fields: [
      { name: "title", label: "Catégorie", type: "localized" },
      { name: "skills", label: "Technologies", type: "list" },
      { name: "level", label: "Niveau", type: "localized" },
      { name: "percent", label: "Maîtrise (%)", type: "number" },
      { name: "icon", label: "Icône", type: "icon" },
    ],
    blank: () => ({
      id: createId(),
      icon: "code2",
      title: emptyText(),
      skills: [],
      level: emptyText(),
      percent: 80,
    }),
  },
  {
    key: "experience",
    label: "Expérience",
    icon: "briefcase",
    titleField: "title",
    fields: [
      { name: "title", label: "Poste", type: "localized" },
      { name: "company", label: "Entreprise", type: "text" },
      { name: "location", label: "Lieu", type: "text" },
      { name: "period", label: "Période", type: "localized" },
      { name: "description", label: "Description", type: "localizedArea" },
      { name: "tech", label: "Technologies", type: "list" },
    ],
    blank: () => ({
      id: createId(),
      title: emptyText(),
      company: "",
      location: "",
      period: emptyText(),
      description: emptyText(),
      tech: [],
    }),
  },
  {
    key: "education",
    label: "Formation",
    icon: "graduationCap",
    titleField: "title",
    fields: [
      { name: "title", label: "Diplôme", type: "localized" },
      { name: "school", label: "Établissement", type: "text" },
      { name: "period", label: "Période", type: "localized" },
      { name: "description", label: "Description", type: "localizedArea" },
    ],
    blank: () => ({
      id: createId(),
      title: emptyText(),
      school: "",
      period: emptyText(),
      description: emptyText(),
    }),
  },
];

export const PROFILE_FIELDS: FieldDef[] = [
  { name: "name", label: "Nom", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "location", label: "Localisation", type: "text" },
  { name: "greeting", label: "Accroche", type: "localized" },
  { name: "role", label: "Titre professionnel", type: "localized" },
  { name: "bio", label: "Présentation (hero)", type: "localizedArea" },
  { name: "availability", label: "Disponibilité", type: "localized" },
  { name: "aboutTitle", label: "Titre de la section À propos", type: "localized" },
  { name: "aboutDescription", label: "À propos — description", type: "localizedArea" },
  { name: "aboutHighlight", label: "À propos — phrase mise en avant", type: "localizedArea" },
];

export const findCollection = (key?: string) => COLLECTIONS.find((c) => c.key === key);
