import { Github, Linkedin, Twitter, Mail } from "lucide-react";

/** Single source of truth for the social links used in the hero, footer and contact page. */
export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", Icon: Twitter },
  { label: "Email", href: "mailto:cedric@example.com", Icon: Mail },
];
