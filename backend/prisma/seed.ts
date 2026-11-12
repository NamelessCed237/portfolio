import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    slug: 'transfergratis',
    title: 'Transfergratis',
    year: '2024',
    liveUrl: 'https://transfergratis.com',
    githubUrl: null,
    stack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Mobile Money'],
    cover: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=1400&h=900&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=600&fit=crop',
    ],
    category: { fr: "FinTech · Transfert d'argent", en: 'FinTech · Money transfer' },
    role: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
    tagline: { fr: "Envoyer de l'argent vers l'Afrique, simplement.", en: 'Sending money to Africa, made simple.' },
    description: {
      fr: "Transfergratis est une plateforme de transfert d'argent vers l'Afrique, avec intégration Mobile Money pour des transactions rapides et fiables.",
      en: 'Transfergratis is a money-transfer platform for Africa, with Mobile Money integration for fast, reliable transactions.',
    },
    highlights: {
      fr: ['Intégration Mobile Money (MTN, Orange)', 'API REST sécurisée avec NestJS', 'Interface rapide en React', 'Suivi des transactions en temps réel'],
      en: ['Mobile Money integration (MTN, Orange)', 'Secure REST API with NestJS', 'Fast React interface', 'Real-time transaction tracking'],
    },
    order: 0,
    published: true,
  },
  {
    slug: 'bikecedric-dev',
    title: 'BikeCedric.dev',
    year: '2025',
    liveUrl: 'https://bikecedric.dev',
    githubUrl: 'https://github.com',
    stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Three.js'],
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    ],
    category: { fr: 'Portfolio · Personnel', en: 'Portfolio · Personal' },
    role: { fr: 'Conception & développement', en: 'Design & development' },
    tagline: { fr: 'Mon portfolio de développeur Web3.', en: 'My Web3 developer portfolio.' },
    description: {
      fr: 'Ce portfolio, construit avec React, TypeScript et Tailwind, animé avec Framer Motion et une scène 3D en react-three-fiber.',
      en: 'This portfolio, built with React, TypeScript and Tailwind, animated with Framer Motion and a react-three-fiber 3D scene.',
    },
    highlights: {
      fr: ['Animations sur-mesure (Framer Motion)', 'Scène 3D temps réel', 'Dark & light mode', 'Bilingue FR / EN'],
      en: ['Custom animations (Framer Motion)', 'Real-time 3D scene', 'Dark & light mode', 'Bilingual FR / EN'],
    },
    order: 1,
    published: true,
  },
  {
    slug: 'tulivu',
    title: 'Tulivu',
    year: '2025',
    liveUrl: null,
    githubUrl: null,
    stack: ['React', 'Node.js', 'Web3.js', 'Ethereum', 'Tron'],
    cover: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1400&h=900&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&h=600&fit=crop',
    ],
    category: { fr: 'Web3 · P2P Crypto', en: 'Web3 · P2P Crypto' },
    role: { fr: 'Développeur Full-Stack & Blockchain', en: 'Full-Stack & Blockchain Developer' },
    tagline: { fr: 'Gestion P2P de stablecoins, automatisée.', en: 'Automated P2P stablecoin management.' },
    description: {
      fr: 'Tulivu est une application de gestion P2P de USDT et USDC sur Ethereum et Tron, avec intégration de modems pour automatiser le traitement des transactions.',
      en: 'Tulivu is a P2P management app for USDT and USDC on Ethereum and Tron, with modem integration to automate transaction processing.',
    },
    highlights: {
      fr: ['Support USDT & USDC (Ethereum & Tron)', 'Automatisation via modems', 'Gestion P2P des transactions', 'Suivi et réconciliation'],
      en: ['USDT & USDC support (Ethereum & Tron)', 'Automation via modems', 'P2P transaction management', 'Payment tracking & reconciliation'],
    },
    order: 2,
    published: true,
  },
];

const skills = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'NestJS', category: 'Backend' },
  { name: 'Laravel', category: 'Backend' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'MySQL', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Solidity', category: 'Blockchain' },
  { name: 'Web3.js', category: 'Blockchain' },
  { name: 'USDT/USDC', category: 'Blockchain' },
  { name: 'Tron', category: 'Blockchain' },
  { name: 'Clean Architecture', category: 'Other' },
  { name: 'REST APIs', category: 'Other' },
  { name: 'Integrations', category: 'Other' },
].map((s, i) => ({ ...s, order: i }));

const services = [
  {
    title: { fr: 'Développement Web', en: 'Web Development' },
    description: { fr: 'Applications web responsive et performantes avec React, Next.js et TypeScript', en: 'Responsive, high-performance web apps with React, Next.js and TypeScript' },
  },
  {
    title: { fr: 'Développement Mobile', en: 'Mobile Development' },
    description: { fr: 'Applications mobiles multiplateformes avec React Native', en: 'Cross-platform mobile applications with React Native' },
  },
  {
    title: { fr: 'API & Backend', en: 'API & Backend' },
    description: { fr: "Conception et implémentation d'APIs RESTful avec NestJS et Laravel", en: 'Designing and building RESTful APIs with NestJS and Laravel' },
  },
  {
    title: { fr: 'Blockchain & Web3', en: 'Blockchain & Web3' },
    description: { fr: 'Paiements USDT/USDC (ETH, Tron), smart contracts et intégrations décentralisées', en: 'USDT/USDC payments (ETH, Tron), smart contracts and decentralized integrations' },
  },
  {
    title: { fr: 'Intégrations & Paiements', en: 'Integrations & Payments' },
    description: { fr: 'Mobile Money (MTN, Orange), passerelles de paiement et APIs tierces', en: 'Mobile Money (MTN, Orange), payment gateways and third-party APIs' },
  },
  {
    title: { fr: 'Architecture & Déploiement', en: 'Architecture & Deployment' },
    description: { fr: 'Code maintenable, mise en production (VPS, Docker, Nginx) et suivi', en: 'Maintainable code, production deployment (VPS, Docker, Nginx) and monitoring' },
  },
].map((s, i) => ({ ...s, order: i, published: true }));

const experience = [
  {
    kind: 'work',
    title: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
    company: 'Lazer SARL',
    location: 'Bafoussam, Cameroun',
    period: 'Déc. 2023 - Présent',
    description: {
      fr: "Conception et développement d'applications web et mobiles complètes : front, back, intégrations de paiement et déploiement.",
      en: 'Designing and building complete web and mobile applications: front, back, payment integrations and deployment.',
    },
    tags: ['React', 'React Native', 'NestJS', 'Laravel'],
    order: 0,
  },
  {
    kind: 'work',
    title: { fr: 'Hackathon Blockchain BAM', en: 'Blockchain Hackathon BAM' },
    company: 'Blockchain Africa Movement',
    location: 'Cameroun',
    period: 'Mai 2025',
    description: {
      fr: "Participation au hackathon blockchain BAM : conception d'une solution décentralisée en équipe.",
      en: 'Took part in the BAM blockchain hackathon: designing a decentralized solution as a team.',
    },
    tags: ['Blockchain', 'Web3', 'Smart Contracts'],
    order: 1,
  },
  {
    kind: 'education',
    title: { fr: 'Licence en Informatique', en: "Bachelor's Degree in Computer Science" },
    company: 'Université',
    location: null,
    period: '2023',
    description: {
      fr: 'Diplôme de licence en informatique : développement logiciel, algorithmique et bases de données.',
      en: "Bachelor's degree in computer science: software development, algorithms and databases.",
    },
    tags: [],
    order: 2,
  },
  {
    kind: 'education',
    title: { fr: 'GCE Advanced Level, Science', en: 'GCE Advanced Level, Science' },
    company: 'GCE Board',
    location: null,
    period: '2019',
    description: {
      fr: 'Baccalauréat scientifique (GCE A Level, série Science).',
      en: 'Scientific high-school diploma (GCE A Level, Science stream).',
    },
    tags: [],
    order: 3,
  },
];

async function main() {
  for (const p of projects) {
    await prisma.project.upsert({ where: { slug: p.slug }, update: p, create: p });
  }
  console.log(`Seeded ${projects.length} projects.`);

  // Idempotent: only seed these when their table is empty (don't clobber admin edits).
  if ((await prisma.skill.count()) === 0) {
    await prisma.skill.createMany({ data: skills });
    console.log(`Seeded ${skills.length} skills.`);
  }
  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({ data: services });
    console.log(`Seeded ${services.length} services.`);
  }
  if ((await prisma.experience.count()) === 0) {
    await prisma.experience.createMany({ data: experience });
    console.log(`Seeded ${experience.length} experience entries.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
