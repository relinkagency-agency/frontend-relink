

import Hero from "@/features/about/ui/hero";
import Main from "@/features/about/ui/main";
import BlogList from "@/features/home/ui/blog-list";
import { getUpdates } from "@/lib/strapi";

export default async function Index() {

    const result = await getUpdates({
        limit: 3,
        onlyPublished: true,
    })

    const articles = result.success ? result.data : [];

    return <>
        <Hero />
        <Main articles={articles}/>
    </>
}