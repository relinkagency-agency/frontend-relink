/** @format */
"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { ProjectCard } from "./card";
import { Project } from "../../types.home";


export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <section className="w-full bg-relink-dark">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_260px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

        <div className="relative px-10 py-10">
          <div className="flex items-start gap-8 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <a
              href="/work"
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
