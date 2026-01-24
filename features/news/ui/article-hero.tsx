/** @format */
import React from "react";
import Image from "next/image";
import { Article } from "@/lib/strapi.types";

interface ArticleHeroProps {
    article: Article;
}

export default function ArticleHero({ article }: ArticleHeroProps) {
    const publishedDate = article.publishedAt
        ? new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : null;

    return (
        <section className="relative w-full h-[70vh] md:h-[85vh] min-h-[600px] overflow-hidden bg-relink-dark pt-32 pb-20 flex flex-col justify-end">

            {article.coverImage?.url ? (
                <Image
                    src={article.coverImage.url}
                    alt={article.coverImage.alt || article.title}
                    fill
                    priority
                    className="object-cover opacity-50"
                />
            ) : (
                <div className="absolute inset-0 bg-neutral-900" />
            )}

            <div className="relative z-20 px-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        {article.category && (
                            <span className="text-[12px] font-bold tracking-[0.2em] text-white/80 uppercase px-3 py-1 bg-white/10 backdrop-blur-md rounded-sm">
                                {article.category.name}
                            </span>
                        )}
                        {publishedDate && (
                            <span className="text-[12px] font-medium tracking-[0.1em] text-white/50 uppercase">
                                {publishedDate}
                            </span>
                        )}
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1]">
                        {article.title}
                    </h1>

                    {article.author && (
                        <div className="flex items-center gap-3 mt-10">
                            <div className="h-8 w-8 rounded-full bg-white/20 overflow-hidden" />
                            <span className="text-white/60 text-sm font-medium">
                                By {article.author.name}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-relink-dark via-transparent to-transparent opacity-80" />
        </section>
    );
}
