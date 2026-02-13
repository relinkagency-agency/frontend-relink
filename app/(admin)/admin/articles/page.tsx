/** @format */

import Link from "next/link";
import { Plus, Edit, FileText, Calendar, User } from "lucide-react";
import { getArticles } from "@/lib/actions/articles";
import { DeleteArticleButton } from "./delete-button";
import { cn } from "@/lib/utils";

export default async function AdminArticlesPage() {
    const result = await getArticles();
    const articles = result.data || [];

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                        News & Articles
                    </h1>
                    <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2">
                        Share insights, news and stories from Relink.
                    </p>
                </div>

                <Link
                    href="/admin/articles/new"
                    className="flex items-center gap-2 px-6 py-3 bg-amber-50 text-[#0B0D13] rounded-none text-xs font-bold hover:bg-white transition-all duration-300 font-[family-name:var(--font-relink-neue)] uppercase tracking-widest shadow-xl"
                >
                    <Plus className="w-4 h-4" />
                    Write Article
                </Link>
            </div>

            <div className="rounded-none bg-white/[0.02] border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium font-[family-name:var(--font-relink-neue)]">
                            <th className="px-8 py-6">Article</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6">Date</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {articles.map((article: any) => (
                            <tr key={article.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-none bg-white/5 border border-white/5 flex items-center justify-center text-white/10 group-hover:text-white/20 transition-colors">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white/90 font-[family-name:var(--font-relink-neue)] tracking-tight line-clamp-1">
                                                {article.title}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 text-[10px] text-white/40 font-medium font-[family-name:var(--font-relink-neue)] uppercase tracking-wider">
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    {article.author?.name || 'Admin'}
                                                </span>
                                                <span className="w-1 h-1 rounded-none bg-white/10" />
                                                <span>{article.category?.name || 'General'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={cn(
                                        "inline-flex items-center px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider border",
                                        article.postStatus === 'published'
                                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                    )}>
                                        {article.postStatus}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2 text-sm text-white/60 font-[family-name:var(--font-relink-neue)]">
                                        <Calendar className="w-3.5 h-3.5 text-white/20" />
                                        {new Date(article.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/articles/${article.id}`}
                                            className="p-2.5 rounded-none bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all font-[family-name:var(--font-relink-neue)]"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <DeleteArticleButton id={article.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {articles.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="p-4 rounded-none bg-white/5 w-fit mx-auto mb-4 border border-white/5">
                            <FileText className="w-6 h-6 text-white/20" />
                        </div>
                        <p className="text-white/40 text-sm font-[family-name:var(--font-relink-neue)]">
                            No articles written yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

