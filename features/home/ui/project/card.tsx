/** @format */

import Image from "next/image";
import { Project } from "@/lib/types";

export function ProjectCard({ project, className = "" }: { project: Project, className?: string }) {
  const category = project.services?.map(s => s.title).join(", ") || "Project";

  return (
    <a
      href={`/projects/${project.slug}`}
      className={`group relative h-[480px] w-full overflow-hidden bg-[#0B0D13] block border border-white/5 transition-all duration-700 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] ${className}`}
    >
      {project.thumbnail?.url ? (
        <Image
          src={project.thumbnail.url}
          alt={project.thumbnail.alt || project.title}
          fill
          sizes="400px"
          className="object-cover transition-all duration-1000 group-hover:scale-105 group-hover:opacity-70 group-hover:rotate-1"
        />
      ) : (
        <div className="bg-relink-dark h-full w-full flex items-center justify-center">
          <span className="text-white/20 uppercase tracking-widest text-[10px]">No Imagery</span>
        </div>
      )}

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13]/20 via-[#0B0D13]/10 to-transparent transition-opacity duration-700 opacity-100 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/0 transition-colors duration-700" />

      {/* Metadata Reveal */}
      <div className="absolute inset-x-8 top-8 overflow-hidden">
        <div className="text-[10px] font-bold tracking-[0.3em] text-amber-50/80 uppercase mb-2 translate-y-0 transition-transform duration-500 group-hover:-translate-y-full">
          {category}
        </div>
        <div className="text-[10px] font-bold tracking-[0.3em] text-white uppercase absolute top-0 left-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-full">
          CASE STUDY
        </div>
      </div>

      <div className="absolute left-8 right-8 bottom-8 z-20">
        <div className="text-[12px] font-medium tracking-[0.1em] text-white/50 uppercase mb-1">
          {project.clientName || "Relink Agency"}
        </div>
        <div className="text-2xl font-serif text-white tracking-tight leading-[1.1] transition-transform duration-500 group-hover:-translate-y-2">
          {project.title}
        </div>

        <div className="mt-6 flex items-center gap-4 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
          <span className="h-[1px] w-8 bg-amber-50" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-amber-50 uppercase">
            EXPLORE PROJECT
          </span>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
        <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-amber-50/40" />
      </div>
    </a>
  );
}
