import { createElement } from "react";
import { getIcon } from "@/lib/icons";

/** Renders an icon from its registry key, so content can store a string. */
export const DynamicIcon = ({ name, className }: { name: string; className?: string }) =>
  createElement(getIcon(name), { className });
