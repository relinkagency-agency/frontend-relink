/** @format */
"use client";

import React from "react";
import { ProjectCard } from "./card";
import { Project } from "@/lib/types";
import { Testimonials } from "../../../../shared/ui/testimonials";


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
    <section className="w-full bg-[#0B0D13]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_380px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

        <div className="relative mx-auto max-w-[1800px] px-8 md:px-12 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          <div className="mt-18 flex justify-end">


            <a
              href="/projects"
              className="md:mt-10 mt-2 inline-flex items-center gap-2 text-lg font-semibold border-b-2 border-white/80 pb-1 hover:gap-4 transition-all text-white w-fit"
            >
              View all work <span aria-hidden>↗</span>
            </a>
          </div>

          <Testimonials />
        </div>
      </div>
    </section>
  );
}
