export interface Bilingual {
  fr: string;
  en: string;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  stack: string[];
  cover: string;
  gallery: string[];
  category: Bilingual;
  role: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  highlights: { fr: string[]; en: string[] };
}

/** Single source of truth for projects (home list + detail pages). */
export const projects: Project[] = [
  {
    slug: "transfergratis",
    title: "Transfergratis",
    year: "2024",
    liveUrl: "https://transfergratis.com",
    stack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Mobile Money"],
    cover: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=1400&h=900&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=600&fit=crop",
    ],
    category: { fr: "FinTech · Transfert d'argent", en: "FinTech · Money transfer" },
    role: { fr: "Développeur Full-Stack", en: "Full-Stack Developer" },
    tagline: {
      fr: "Envoyer de l'argent vers l'Afrique, simplement.",
      en: "Sending money to Africa, made simple.",
    },
    description: {
      fr: "Transfergratis est une plateforme de transfert d'argent vers l'Afrique. J'ai participé à la conception et au développement de l'application — de l'interface aux API — avec une intégration Mobile Money pour des transactions rapides, fiables et traçables.",
      en: "Transfergratis is a money-transfer platform for Africa. I helped design and build the application — from the UI to the APIs — with Mobile Money integration for fast, reliable and traceable transactions.",
    },
    highlights: {
      fr: [
        "Intégration Mobile Money (MTN, Orange)",
        "API REST sécurisée avec NestJS",
        "Interface rapide et responsive en React",
        "Suivi des transactions en temps réel",
      ],
      en: [
        "Mobile Money integration (MTN, Orange)",
        "Secure REST API with NestJS",
        "Fast, responsive React interface",
        "Real-time transaction tracking",
      ],
    },
  },
  {
    slug: "bikecedric-dev",
    title: "BikeCedric.dev",
    year: "2025",
    liveUrl: "https://bikecedric.dev",
    githubUrl: "https://github.com",
    stack: ["React", "TypeScript", "Tailwind", "Framer Motion", "Three.js"],
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    category: { fr: "Portfolio · Personnel", en: "Portfolio · Personal" },
    role: { fr: "Conception & développement", en: "Design & development" },
    tagline: {
      fr: "Mon portfolio de développeur Web3.",
      en: "My Web3 developer portfolio.",
    },
    description: {
      fr: "Ce portfolio — une vitrine de mon univers de développeur Full-Stack & Blockchain. Construit avec React, TypeScript et Tailwind, animé avec Framer Motion et agrémenté d'une scène 3D temps réel en react-three-fiber.",
      en: "This portfolio — a showcase of my world as a Full-Stack & Blockchain developer. Built with React, TypeScript and Tailwind, animated with Framer Motion and featuring a real-time 3D scene with react-three-fiber.",
    },
    highlights: {
      fr: [
        "Animations sur-mesure (Framer Motion)",
        "Scène 3D temps réel (react-three-fiber / three.js)",
        "Dark & light mode soignés",
        "Bilingue FR / EN",
        "Optimisé et découpé en chunks (lazy-loading)",
      ],
      en: [
        "Custom animations (Framer Motion)",
        "Real-time 3D scene (react-three-fiber / three.js)",
        "Polished dark & light mode",
        "Bilingual FR / EN",
        "Optimized and code-split (lazy-loading)",
      ],
    },
  },
  {
    slug: "tulivu",
    title: "Tulivu",
    year: "2025",
    stack: ["React", "Node.js", "Web3.js", "Ethereum", "Tron"],
    cover: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1400&h=900&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&h=600&fit=crop",
    ],
    category: { fr: "Web3 · P2P Crypto", en: "Web3 · P2P Crypto" },
    role: { fr: "Développeur Full-Stack & Blockchain", en: "Full-Stack & Blockchain Developer" },
    tagline: {
      fr: "Gestion P2P de stablecoins, automatisée.",
      en: "Automated P2P stablecoin management.",
    },
    description: {
      fr: "Tulivu est une application de gestion P2P de USDT et USDC sur Ethereum et Tron. Elle intègre des modems pour automatiser la réception des confirmations et fluidifier le traitement des transactions crypto.",
      en: "Tulivu is a P2P management app for USDT and USDC on Ethereum and Tron. It integrates modems to automate confirmation handling and streamline crypto transaction processing.",
    },
    highlights: {
      fr: [
        "Support USDT & USDC (Ethereum & Tron)",
        "Automatisation via intégration de modems",
        "Gestion P2P des transactions",
        "Suivi et réconciliation des paiements",
      ],
      en: [
        "USDT & USDC support (Ethereum & Tron)",
        "Automation via modem integration",
        "P2P transaction management",
        "Payment tracking and reconciliation",
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
