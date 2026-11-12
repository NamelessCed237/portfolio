import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SplitText } from "@/components/anim/SplitText";
import { useApiData } from "@/lib/useApiData";

interface Bi { fr: string; en: string }
interface Post {
  id: string;
  slug: string;
  title: Bi;
  excerpt: Bi;
  cover?: string | null;
  tags: string[];
  publishedAt?: string | null;
}

const Blog = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("fr") ? "fr" : "en";
  const posts = useApiData<Post[]>("/blog", []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container-px mx-auto max-w-5xl pb-20 pt-32">
        <span className="eyebrow mb-4">Blog</span>
        <h1 className="headline text-[clamp(2.6rem,9vw,6rem)]">
          <SplitText text={lang === "fr" ? "Articles" : "Writing"} immediate />
        </h1>

        {posts.length === 0 ? (
          <p className="mt-12 text-muted-foreground">
            {lang === "fr" ? "Aucun article pour le moment." : "No articles yet."}
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="card-surface group overflow-hidden">
                {p.cover && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={p.cover} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-xl font-semibold tracking-tight">{p.title[lang]}</h2>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt[lang]}</p>
                  {p.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
