import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/NetworkBackground";
import { Terminal, Line, Out } from "@/components/ui/code-window";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <NetworkBackground className="opacity-40" />
      <div className="grid-bg absolute inset-0" />
      <div className="glow-blob left-1/4 top-1/3 h-72 w-72 bg-primary/25" />

      <div className="relative z-10 w-full max-w-lg space-y-6 text-center">
        <h1 className="gradient-text text-8xl font-bold">404</h1>

        <Terminal title="error — bash" className="text-left">
          <Line>cat {location.pathname}</Line>
          <Out tone="muted">bash: route not found</Out>
          <Line>cd /home</Line>
          <Out tone="green">✔ redirecting to a safe block...</Out>
        </Terminal>

        <Link to="/">
          <Button className="gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
            <Home className="h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
