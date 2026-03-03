
import BlogMain from "@/features/news/ui/blogMain";
import Hero from "@/features/news/ui/hero";
import { getArticles } from "@/lib/actions/articles";
import { mapDrizzleArticle } from "@/lib/db/mappers";

export default async function page() {
  const res = await getArticles('published');
  const articles = (res.data || []).map(mapDrizzleArticle);
  return (
    <>
      <Hero />
      <BlogMain articles={articles} />
    </>
  );
}

export const metadata = {
  title: "News + Insight",
};