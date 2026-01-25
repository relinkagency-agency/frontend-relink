import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/strapi";
import ArticleHero from "@/features/news/ui/article-hero";
import ArticleContent from "@/features/news/ui/article-content";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const { success, data: article, error } = await getPostBySlug(slug);

  if (!success || !article) {
    if (error) console.error(`Error loading article: ${error}`);
    notFound();
  }

  return (
    <main className="min-h-screen bg-amber-50">
      <ArticleHero article={article} />
      <article className="pb-10">
        <ArticleContent blocks={article.blocks} />

        {/* Author Signature & Date */}
        <div className="max-w-3xl mx-auto px-6 mb-20">
          <div className="flex items-center justify-between pt-10 border-t border-black/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 font-relink-neue rounded-full bg-black/5 flex items-center justify-center text-xs font-bold text-black/40 uppercase">
                {article.author?.name?.charAt(0) || "R"}
              </div>
              <div>
                <p className="text-sm font-bold font-relink-neue text-black/80">
                  {article.author?.name || "Relink Editorial"}
                </p>
                <p className="text-xs font-relink-neue text-black/40 uppercase tracking-widest">
                  Author
                </p>
              </div>
            </div>
            {article.publishedAt && (
              <div className="text-right">
                <p className="text-xs font-relink-neue text-black/40 uppercase tracking-widest mb-1">
                  Published
                </p>
                <p className="text-sm font-medium text-black/60">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </article>

      <div className="max-w-4xl mx-auto px-6 pt-12 pb-56 border-t border-black/10 text-center">
        <Link
          href="/news-insight"
          className="inline-flex font-relink-neue text-md items-center gap-2 text-black/60 hover:text-black transition-colors font-medium"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </span>
          Back to the Journal
        </Link>
      </div>
    </main>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const { data: article } = await getPostBySlug(slug);

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Relink Agency`,
    description: article.excerpt || `Read ${article.title} on Relink Agency.`,
  };
}
