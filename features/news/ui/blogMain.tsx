/** @format */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/strapi.types";

export default function BlogMain({ articles }: { articles: Article[] }) {
  if (!articles?.length) return null;

  const [featuredArticle, ...gridArticles] = articles;

  return (
    <section className="w-full py-24 px-6 md:px-12 bg-amber-50 text-black selection:bg-black selection:text-white">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h3 className="font-relink-headline text-center md:text-left text-[35px] md:text-6xl leading-tight capitalize">
              News & Updates

            </h3>
          </div>
        </div>

        {/* Featured Article */}
        <Link
          href={`/news-insight/${featuredArticle.slug}`}
          className="group block mb-16"
        >
          <div className="relative md:aspect-[21/9] aspect-[20/30] overflow-hidden bg-[#1a1f26] rounded-xs transform transition-transform duration-700 group-hover:-translate-y-2">
            {featuredArticle.coverImage?.url ? (
              <Image
                src={featuredArticle.coverImage.url}
                alt={featuredArticle.coverImage.alt || featuredArticle.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white font-relink-neue uppercase text-xs tracking-widest leading-16">
                  Relink
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            
            <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="px-4 py-2 text-white bg-black/10 backdrop-blur-md text-[10px] uppercase font-relink-neue font-bold tracking-widest rounded-xs border border-black/20">
                Featured
              </span>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="flex items-center gap-3 mb-4">
                {featuredArticle.category && (
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                    {featuredArticle.category.name}
                  </span>
                )}
                
              </div>

              <h2 className="text-2xl md:text-5xl font-medium font-relink-neue leading-tight mb-4 md:mb-6">
                {featuredArticle.title}
              </h2>

              {featuredArticle.excerpt && (
                <p className="text-base md:text-lg leading-relaxed mb-6 font-light text-gray-200 max-w-3xl">
                  {featuredArticle.excerpt}
                </p>
              )}

              <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-widest transition-all duration-500">
                Read Full Story{" "}
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
          </div>
        </Link>

        {/* Grid Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {gridArticles.map((article) => (
            <Link
              key={article.id}
              href={`/news-insight/${article.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-8 bg-[#1a1f26] rounded-xs transform transition-transform duration-700 group-hover:-translate-y-2">
                {article.coverImage?.url ? (
                  <Image
                    src={article.coverImage.url}
                    alt={article.coverImage.alt || article.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white font-relink-neue uppercase text-xs tracking-widest leading-16">
                      Relink
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />

                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="px-3 py-1 text-white bg-white/10 backdrop-blur-md text-[10px] uppercase font-relink-neue font-bold tracking-wider rounded-xs border border-white/20">
                    Read Article
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  {article.category && (
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                      {article.category.name}
                    </span>
                  )}
                  {/* <span className="h-[1px] w-5 bg-black" /> */}
                  <span className="text-[11px] px-2 bg-black font-medium text-white uppercase tracking-widest">
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

                <h4 className="text-xl md:text-2xl font-medium font-relink-neue group-hover:text-black transition-colors duration-500 leading-tight mb-5">
                  {article.title}
                </h4>

                {article.excerpt && (
                  <p className="text-base font-sans leading-relaxed line-clamp-2 mb-8 font-light">
                    {article.excerpt}
                  </p>
                )}

                <div className="mt-auto flex items-center gap-2 font-semibold text-xs uppercase tracking-widest group-hover:text-black transition-all duration-500">
                  Read Story{" "}
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

        
      </div>
    </section>
  );
}