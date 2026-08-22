import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Last line of defence. Without it a render error unmounts the whole tree and
 * the visitor gets a blank page with no way back.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[render]", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="grid min-h-screen place-items-center px-6 text-center">
        <div className="max-w-md space-y-4">
          <p className="font-mono text-sm uppercase tracking-widest text-primary">// erreur</p>
          <h1 className="text-3xl font-bold">Quelque chose a cassé</h1>
          <p className="text-muted-foreground">
            La page n&apos;a pas pu s&apos;afficher. Rechargez pour réessayer.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Recharger
            </button>
            <a
              href="/"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Accueil
            </a>
          </div>
        </div>
      </div>
    );
  }
}
