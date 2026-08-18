import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

/** Light by default; the user choice is persisted. */
const readStoredTheme = (): Theme =>
  (localStorage.getItem("theme") as Theme | null) ?? "light";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  // Keep <html> in sync with the current theme. Transitions are suppressed for
  // the swap, otherwise transitioned properties keep their previous colour.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    // Forced reflow: resolve the new colours before transitions come back.
    void getComputedStyle(root).backgroundColor;
    root.classList.remove("theme-switching");
  }, [theme]);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};
