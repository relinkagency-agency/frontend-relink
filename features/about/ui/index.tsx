

import Hero from "@/features/about/ui/hero";
import Main from "@/features/about/ui/main";
import BlogList from "@/features/home/ui/blog-list";
import { getArticles } from "@/lib/actions/articles";
import { mapDrizzleArticle } from "@/lib/db/mappers";

export default async function Index() {

    const result = await getArticles('published');
    const articles = (result.data || []).slice(0, 3).map(mapDrizzleArticle);

    return <>
        <Hero />
        <Main articles={articles} />
    </>
}