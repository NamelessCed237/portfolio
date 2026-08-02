import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/NetworkBackground";
import { CodeEditor, C, K, S, P, Pn, Fn } from "@/components/ui/code-window";

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

      <div className="relative z-10 w-full max-w-xl space-y-6 text-center">
        <h1 className="gradient-text text-8xl font-bold">404</h1>

        <CodeEditor tabs={["Router.sol"]} className="text-left">
          <C>{"// requested route reverted"}</C>{"\n"}
          <K>function</K> <Fn>resolve</Fn><Pn>(</Pn><K>string</K> <P>path</P><Pn>)</Pn> <K>external</K> <Pn>{"{"}</Pn>{"\n"}
          {"  "}<Fn>require</Fn><Pn>(</Pn><P>exists</P><Pn>[</Pn><P>path</P><Pn>],</Pn> <S>"404: route not found"</S><Pn>);</Pn>{"\n"}
          {"  "}<K>revert</K> <Fn>RouteNotFound</Fn><Pn>(</Pn><S>"{location.pathname}"</S><Pn>);</Pn>{"\n"}
          <Pn>{"}"}</Pn>
        </CodeEditor>

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
