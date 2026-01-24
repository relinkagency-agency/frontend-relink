/** @format */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/strapi.types";

export default function BlogList({ articles }: { articles: Article[] }) {
  if (!articles?.length) return null;

  return (
    <section className="w-full bg-relink-dark py-32 px-10 selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-[13px] font-bold tracking-[0.3em] text-white/40 uppercase mb-5">
              Insights & Updates
            </h2>
            <h3 className="font-serif text-5xl md:text-6xl text-white leading-tight">
              The Journal
            </h3>
          </div>
          <Link
            href="/news-insight"
            className="hidden md:inline-flex items-center gap-4 border-b border-white/30 pb-2 text-[16px] font-medium text-white/70 hover:text-white hover:border-white transition-all duration-500 group"
          >
            Explore all stories <span className="text-[20px] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news-insight/${article.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-8 bg-[#1a1f26] rounded-sm transform transition-transform duration-700 group-hover:-translate-y-2">
                {article.coverImage?.url ? (
                  <Image
                    src={article.coverImage.url}
                    alt={article.coverImage.alt || article.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/5 font-serif italic text-2xl">Relink</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />

                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest rounded-full border border-white/20">
                    Read Article
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-5">
                  {article.category && (
                    <span className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">
                      {article.category.name}
                    </span>
                  )}
                  <span className="h-[1px] w-5 bg-white/20" />
                  <span className="text-[11px] font-medium text-white/40 uppercase tracking-widest">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      : "Recent"}
                  </span>
                </div>

                <h4 className="text-2xl md:text-3xl font-serif text-white/90 group-hover:text-white transition-colors duration-500 leading-tight mb-5">
                  {article.title}
                </h4>

                {article.excerpt && (
                  <p className="text-white/50 text-base leading-relaxed line-clamp-2 mb-8 font-light">
                    {article.excerpt}
                  </p>
                )}

                <div className="mt-auto flex items-center gap-3 text-white/40 font-semibold text-xs uppercase tracking-widest group-hover:text-white transition-all duration-500">
                  Full Story <span className="text-lg transition-transform duration-500 group-hover:translate-x-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 md:hidden flex justify-center">
          <Link
            href="/news-insight"
            className="inline-flex items-center gap-3 border-b border-white/30 pb-2 text-[16px] font-semibold text-white/90 hover:text-white transition-colors"
          >
            View all stories <span className="text-[18px] leading-none">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

