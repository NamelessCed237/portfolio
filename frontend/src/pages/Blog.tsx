import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CalendarDays } from "lucide-react";
import { useContent, useLocalized } from "@/lib/content/useContent";

const Blog = () => {
  const { t } = useTranslation();
  const { content } = useContent();
  const localized = useLocalized();

  const posts = content.posts
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="glow-blob right-[-8%] top-[15%] h-72 w-72 bg-secondary/25" />
      <div className="relative mx-auto max-w-3xl px-4">
        <header className="mb-12 text-center md:mb-16">
          <p className="eyebrow">// blog</p>
          <h1 className="mt-4 text-4xl font-bold">
            {t("blog.title")}<span className="text-primary">.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("blog.subtitle")}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="glow-card p-10 text-center text-muted-foreground">{t("blog.empty")}</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }} className="glow-card">
                <Link to={`/blog/${post.slug}`} className="flex flex-col gap-6 p-6 sm:flex-row">
                  {post.cover && (
                    <img
                      src={post.cover}
                      alt=""
                      loading="lazy"
                      className="aspect-[16/10] w-full rounded-md border border-border object-cover sm:w-48"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span className="font-mono">{post.date}</span>
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">{localized(post.title)}</h2>
                    <p className="mt-2 leading-7 text-muted-foreground">{localized(post.excerpt)}</p>

                    {post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((chip) => (
                          <span
                            key={chip}
                            className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
