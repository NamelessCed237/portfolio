import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostBody } from "@/components/PostBody";
import { useContent, useLocalized } from "@/lib/content/useContent";

const BlogPost = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { content } = useContent();
  const localized = useLocalized();

  const post = content.posts.find((item) => item.slug === slug && item.published);

  if (!post) {
    return (
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 page-narrow text-center">
          <h1 className="text-2xl font-semibold">{t("blog.notFound")}</h1>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4" />
              {t("blog.back")}
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <article className="section-padding relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-3xl px-4">
        <Button asChild variant="ghost" size="sm" className="-ml-3 mb-8">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4" />
            {t("blog.back")}
          </Link>
        </Button>

        <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span className="font-mono">{post.date}</span>
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          {localized(post.title)}<span className="text-primary">.</span>
        </h1>
        <p className="mt-4 text-xl leading-8 text-muted-foreground">{localized(post.excerpt)}</p>

        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
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

        {post.cover && (
          <img
            src={post.cover}
            alt=""
            className="mt-10 aspect-[16/9] w-full rounded-lg border border-border object-cover"
          />
        )}

        <div className="mt-10">
          <PostBody body={localized(post.body)} />
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
