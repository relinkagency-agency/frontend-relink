/** @format */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/strapi.types";

export default function BlogList({ articles }: { articles: Article[] }) {
  if (!articles?.length) return null;

  return (
    <section className="w-full bg-relink-dark py-24 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[13px] font-semibold tracking-[0.22em] text-white/60 uppercase mb-4">
              Insights & Updates
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl text-white">
              The Journal
            </h3>
          </div>
          <Link
            href="/news-insight"
            className="hidden md:inline-flex items-center gap-3 border-b border-white/60 pb-1 text-[16px] font-semibold text-white/90 hover:text-white transition-colors"
          >
            Read all articles <span className="text-[18px] leading-none">↗</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news-insight/${article.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-[#1a1f26]">
                {article.coverImage?.url ? (
                  <Image
                    src={article.coverImage.url}
                    alt={article.coverImage.alt || article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/10 italic">No illustration</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  {article.category && (
                    <span className="text-[11px] font-bold tracking-widest text-white/40 uppercase">
                      {article.category.name}
                    </span>
                  )}
                  <span className="h-[1px] w-4 bg-white/20" />
                  <span className="text-[11px] text-white/40 uppercase">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      : "Recent"}
                  </span>
                </div>

                <h4 className="text-xl md:text-2xl font-medium text-white/90 group-hover:text-white transition-colors duration-300 leading-tight mb-4">
                  {article.title}
                </h4>

                {article.excerpt && (
                  <p className="text-white/50 text-base leading-relaxed line-clamp-2 mb-6">
                    {article.excerpt}
                  </p>
                )}

                <div className="mt-auto flex items-center gap-2 text-white/80 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                  Read More <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 md:hidden flex justify-center">
          <Link
            href="/news-insight"
            className="inline-flex items-center gap-3 border-b border-white/60 pb-1 text-[16px] font-semibold text-white/90 hover:text-white transition-colors"
          >
            Read all articles <span className="text-[18px] leading-none">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

