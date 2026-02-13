/** @format */

import { ArticleForm } from "@/features/admin/ui/article-form";

export default function NewArticlePage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                    New Article
                </h1>
                <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2">
                    Create fresh content for the Relink news feed.
                </p>
            </div>

            <ArticleForm />
        </div>
    );
}
