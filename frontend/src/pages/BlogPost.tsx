import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SplitText } from "@/components/anim/SplitText";
import { api } from "@/lib/api";

interface Bi { fr: string; en: string }
interface Post {
  slug: string;
  title: Bi;
  excerpt: Bi;
  content: Bi;
  cover?: string | null;
  tags: string[];
  publishedAt?: string | null;
}

const BlogPost = () => {
  const { slug = "" } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("fr") ? "fr" : "en";
  const [post, setPost] = useState<Post | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let active = true;
    setState("loading");
    api
      .get<Post>(`/blog/slug/${slug}`)
      .then((p) => { if (active) { setPost(p); setState("ok"); } })
      .catch(() => { if (active) setState("error"); });
    return () => { active = false; };
  }, [slug]);

  const back = (
    <Link to="/blog" className="inline-flex items-center gap-2 text-sm link-accent">
      <ArrowLeft className="h-4 w-4" /> {lang === "fr" ? "Tous les articles" : "All articles"}
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container-px mx-auto max-w-3xl pb-20 pt-32">
        {back}
        {state === "loading" && <p className="mt-10 text-muted-foreground">{lang === "fr" ? "Chargement…" : "Loading…"}</p>}
        {state === "error" && <p className="mt-10 text-muted-foreground">{lang === "fr" ? "Article introuvable." : "Article not found."}</p>}
        {state === "ok" && post && (
          <article className="mt-8">
            <h1 className="headline text-[clamp(2.2rem,7vw,4.5rem)]">
              <SplitText text={post.title[lang]} immediate />
            </h1>
            {post.publishedAt && (
              <p className="mt-4 text-sm text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            )}
            {post.cover && (
              <img src={post.cover} alt="" className="mt-8 aspect-[16/9] w-full rounded-2xl border border-border object-cover" />
            )}
            <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
              {post.content[lang]}
            </div>
            <div className="mt-12 border-t border-border pt-8">{back}</div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
