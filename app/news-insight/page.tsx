
import BlogMain from "@/features/news/ui/blogMain";
import Hero from "@/features/news/ui/hero";
import { getUpdates } from "@/lib/strapi";

export default async function page() {
   const res = await getUpdates();
   const articles = res.data.map((service: any) => ({
     ...service,
     postStatus: service.postStatus || 'published',
     publishedAt: service.publishedAt || new Date().toISOString(),
   }));
  return (
    <>
      <Hero />
      <BlogMain articles={articles}/>
    </>
  );
}

export const metadata = {
  title: "News + Insight",
};