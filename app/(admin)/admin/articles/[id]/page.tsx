/** @format */

import { ArticleForm } from "@/features/admin/ui/article-form";
import { getArticleById } from "@/lib/actions/articles";
import { notFound } from "next/navigation";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const result = await getArticleById(parseInt(id));

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-12 ">
            <div>
                <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                    Edit Article
                </h1>
                <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2">
                    Update your story: {result.data.title}.
                </p>
            </div>

            <ArticleForm initialData={result.data} />
        </div>
    );
}
