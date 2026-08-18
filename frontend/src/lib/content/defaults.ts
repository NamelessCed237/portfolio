import en from "@/i18n/locales/en.json";
import fr from "@/i18n/locales/fr.json";
import type { LocalizedText, SiteContent } from "./types";

/**
 * Seed content. Text is read from the existing translation files rather than
 * copied, so the site ships with exactly what it displayed before the
 * dashboard existed and there is only one place to fix a typo in the seed.
 */
const text = (path: string): LocalizedText => ({
  fr: resolve(fr, path),
  en: resolve(en, path),
});

const resolve = (source: unknown, path: string): string => {
  const value = path
    .split(".")
    .reduce<unknown>((node, key) => (node as Record<string, unknown> | undefined)?.[key], source);
  return typeof value === "string" ? value : "";
};

const expert: LocalizedText = { fr: "Expert", en: "Expert" };
const advanced: LocalizedText = { fr: "Avancé", en: "Advanced" };

export const DEFAULT_CONTENT: SiteContent = {
  profile: {
    name: "Bike Cedric",
    email: "cedric@example.com",
    location: "Bafoussam, Cameroun",
    greeting: text("hero.greeting"),
    role: text("hero.title"),
    bio: text("hero.subtitle"),
    availability: { fr: "Disponible pour de nouveaux projets", en: "Available for new projects" },
    aboutTitle: text("about.title"),
    aboutDescription: text("about.description"),
    aboutHighlight: text("about.highlight"),
    socials: [
      { id: "github", label: "GitHub", href: "https://github.com", icon: "github" },
      { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
      { id: "twitter", label: "Twitter", href: "https://twitter.com", icon: "twitter" },
      { id: "email", label: "Email", href: "mailto:cedric@example.com", icon: "mail" },
    ],
  },

  services: ["web", "mobile", "backend", "web3", "integrations", "architecture"].map((key) => ({
    id: key,
    icon: { web: "monitor", mobile: "smartphone", backend: "server", web3: "blocks", integrations: "link", architecture: "code" }[key] as string,
    title: text(`services.list.${key}.title`),
    description: text(`services.list.${key}.description`),
  })),

  projects: [
    {
      id: "transfergratis",
      title: text("projects.list.transfergratis.title"),
      description: text("projects.list.transfergratis.description"),
      image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&h=600&fit=crop",
      url: "",
      tech: ["React", "NestJS", "Mobile Money"],
    },
    {
      id: "portfolio",
      title: text("projects.list.portfolio.title"),
      description: text("projects.list.portfolio.description"),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      url: "",
      tech: ["React", "TypeScript", "Tailwind"],
    },
    {
      id: "tulivu",
      title: text("projects.list.tulivu.title"),
      description: text("projects.list.tulivu.description"),
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
      url: "",
      tech: ["USDT", "USDC", "Ethereum", "Tron"],
    },
  ],

  skills: (
    [
      { id: "frontend", icon: "code2", skills: ["React", "TypeScript", "Next.js"], level: expert, percent: 95 },
      { id: "backend", icon: "server", skills: ["NestJS", "Laravel"], level: advanced, percent: 88 },
      { id: "mobile", icon: "smartphone", skills: ["React Native"], level: advanced, percent: 82 },
      { id: "database", icon: "database", skills: ["MySQL", "PostgreSQL"], level: advanced, percent: 85 },
      { id: "blockchain", icon: "blocks", skills: ["Solidity", "Web3.js", "USDT/USDC", "Tron"], level: advanced, percent: 80 },
      { id: "other", icon: "settings", skills: ["Clean Architecture", "REST APIs", "Integrations"], level: expert, percent: 90 },
    ]
  ).map((group) => ({ ...group, title: text(`skills.categories.${group.id}`) })),

  experience: ["lazer", "hackathon"].map((key) => ({
    id: key,
    title: text(`experience.timeline.${key}.title`),
    company: resolve(fr, `experience.timeline.${key}.company`),
    location: resolve(fr, `experience.timeline.${key}.location`),
    period: text(`experience.timeline.${key}.period`),
    description: text(`experience.timeline.${key}.description`),
    tech:
      key === "lazer"
        ? ["React", "React Native", "NestJS", "Laravel", "PostgreSQL"]
        : ["Blockchain", "Web3", "Smart Contracts"],
  })),

  education: ["licence", "gce"].map((key) => ({
    id: key,
    title: text(`formation.list.${key}.title`),
    school: resolve(fr, `formation.list.${key}.school`),
    period: text(`formation.list.${key}.period`),
    description: text(`formation.list.${key}.description`),
  })),

  posts: [],
};
