/** @format */
"use client";

import React from "react";
import { ProjectCard } from "./card";
import { Project } from "@/lib/strapi.types";


export function ProjectList({ projects }: { projects: Project[] }) {
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

          <div className="mt-20 flex justify-center">
            <a
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-3 bg-amber-50 text-black text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:scale-[1.02]"
            >
              View all work <span className="text-[16px] leading-none">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
