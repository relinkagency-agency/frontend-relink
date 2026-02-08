/** @format */
"use client";

import React from "react";
import { ProjectCard } from "./card";
import { Project } from "@/lib/strapi.types";


export function ProjectList({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const itemWidth = 320 + 32; // Card width + gap-8
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(0, index), projects.length - 1));
    }
  };

  const scrollToProject = (index: number) => {
    if (scrollContainerRef.current) {
      const itemWidth = 320 + 32;
      scrollContainerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section className="w-full bg-relink-dark">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_260px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

        <div className="relative px-10 py-10">
          <div
            ref={scrollContainerRef}
            className="flex items-start gap-8 overflow-x-auto pb-6 scrollbar-none"
          >
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToProject(i)}
                className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex
                    ? "bg-white scale-110"
                    : "bg-white/20 hover:bg-white/40"
                  }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <a
              href="/work-services"
              className="inline-flex items-center gap-3 border-b border-white/60 pb-1 text-[16px] font-semibold text-white/90 hover:text-white"
            >
              View all work <span className="text-[18px] leading-none">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
