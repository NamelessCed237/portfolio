/** Editable content model. Everything the admin dashboard can change lives here. */

export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** A string the visitor sees, held in both site languages. */
export type LocalizedText = Record<Locale, string>;

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  /** Key of the icon registry in lib/icons.ts. */
  icon: string;
}

export interface Profile {
  name: string;
  email: string;
  location: string;
  greeting: LocalizedText;
  role: LocalizedText;
  bio: LocalizedText;
  availability: LocalizedText;
  aboutTitle: LocalizedText;
  aboutDescription: LocalizedText;
  aboutHighlight: LocalizedText;
  socials: SocialLink[];
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface ProjectItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  url: string;
  tech: string[];
}

export interface SkillGroup {
  id: string;
  icon: string;
  title: LocalizedText;
  skills: string[];
  /** Badge shown on the card, e.g. Expert / Avancé. */
  level: LocalizedText;
  /** Progress bar, 0-100. */
  percent: number;
}

export interface ExperienceItem {
  id: string;
  title: LocalizedText;
  company: string;
  location: string;
  period: LocalizedText;
  description: LocalizedText;
  tech: string[];
}

export interface EducationItem {
  id: string;
  title: LocalizedText;
  school: string;
  period: LocalizedText;
  description: LocalizedText;
}

export interface Post {
  id: string;
  /** URL segment, e.g. /blog/deployer-un-smart-contract */
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  /** Markdown-ish body: paragraphs, "## " headings and "- " bullets. */
  body: LocalizedText;
  cover: string;
  tags: string[];
  /** ISO date (YYYY-MM-DD). */
  date: string;
  published: boolean;
}

export interface SiteContent {
  profile: Profile;
  services: ServiceItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  posts: Post[];
}

/** Collections the dashboard edits as a list. */
export type CollectionKey = "services" | "projects" | "skills" | "experience" | "education" | "posts";
