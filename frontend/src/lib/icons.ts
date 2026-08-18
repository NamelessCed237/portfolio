import {
  Blocks, Boxes, Briefcase, Code, Code2, Coins, Database, Github, GraduationCap,
  Layers, Link as LinkIcon, Linkedin, Mail, MapPin, Monitor, Network, Plug,
  Rocket, Server, Settings, Smartphone, Twitter, type LucideIcon,
} from "lucide-react";

/**
 * Icons the dashboard can assign to a service, skill group or social link.
 * Content stores the key, never the component, so it stays serialisable.
 */
export const ICONS: Record<string, LucideIcon> = {
  blocks: Blocks,
  boxes: Boxes,
  briefcase: Briefcase,
  code: Code,
  code2: Code2,
  coins: Coins,
  database: Database,
  github: Github,
  graduationCap: GraduationCap,
  layers: Layers,
  link: LinkIcon,
  linkedin: Linkedin,
  mail: Mail,
  mapPin: MapPin,
  monitor: Monitor,
  network: Network,
  plug: Plug,
  rocket: Rocket,
  server: Server,
  settings: Settings,
  smartphone: Smartphone,
  twitter: Twitter,
};

export const ICON_KEYS = Object.keys(ICONS);

/** Falls back to a neutral icon so unknown keys never crash a page. */
export const getIcon = (key: string): LucideIcon => ICONS[key] ?? Boxes;
