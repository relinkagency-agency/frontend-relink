/** @format */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/strapi.types";

export default function BlogList({ articles }: { articles: Article[] }) {
  if (!articles?.length) return null;

  return (
    <section className="w-full bg-[#fff] py-22 px-10 selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-[13px] font-relink-neue font-bold tracking-[0.2em] text-black uppercase mb-5">
              Tech & Trends
            </h2>
            <h3 className="font-relink-headline text-5xl md:text-6xl text-black leading-tight capitalize">
              Our Insights
            </h3>
          </div>
          <Link
            href="/news-insight"
            className="hidden font-relink-neue md:inline-flex items-center gap-4 border-b border-black/30 pb-2 text-[16px] font-medium text-black/70 hover:text-black hover:border-black transition-all duration-500 group"
          >
            Explore all stories{" "}
            <span className="text-[20px] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news-insight/${article.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-8 bg-[#1a1f26] rounded-sm transform transition-transform duration-700 group-hover:-translate-y-1">
                {article.coverImage?.url ? (
                  <Image
                    src={article.coverImage.url}
                    alt={article.coverImage.alt || article.title}
                    fill
                    className="object-cover transition-transform duration-900 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-black font-serif italic text-2xl">
                      Relink
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />

                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="px-3 py-1 bg-black backdrop-blur-md text-white text-[10px] uppercase font-relink-neue font-bold tracking-wider rounded-xs border border-black/20">
                    Read Article
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-5">
                  {article.category && (
                    <span className="text-[11px] font-bold tracking-[0.2em] text-black uppercase">
                      {article.category.name}
                    </span>
                  )}
                  <span className="h-[1px] w-5 bg-black/20" />
                  <span className="text-[11px] font-medium text-black uppercase tracking-widest">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )
                      : "Recent"}
                  </span>
                </div>

                <h4 className="text-2xl md:text-2xl font-medium font-relink-neue text-black group-hover:text-black transition-colors duration-500 leading-tight mb-2">
                  {article.title}
                </h4>

                {article.excerpt && (
                  <p className="text-black/50  text-base leading-relaxed line-clamp-2 mb-4 font-light">
                    {article.excerpt}
                  </p>
                )}

                <div className="mt-auto flex items-center gap-2 text-black font-semibold text-xs uppercase tracking-widest group-hover:text-black transition-all duration-500">
                  Full Story{" "}
                  <span className="text-lg transition-transform duration-500 group-hover:translate-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 md:hidden flex justify-center">
          <Link
            href="/news-insight"
            className="inline-flex items-center gap-3 border-b border-black pb-2 text-[16px] font-semibold text-black/90 hover:text-black transition-colors"
          >
            View all stories{" "}
            <span className="text-[18px] leading-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
