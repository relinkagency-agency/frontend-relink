/** @format */

import Image from "next/image";
import { Project } from "../../types.home";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={`/projects/${project.slug}`}
      className="group relative h-[430px] w-[320px] shrink-0 overflow-hidden bg-[#11161d]"
    >
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        sizes="320px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/50" />

      <div className="absolute left-7 top-7 right-7">
        <div className="text-[12px] font-semibold tracking-[0.22em] text-white/80 uppercase">
          {project.category}
        </div>
        <div className="mt-2 text-[20px] font-semibold leading-snug text-white/90">
          {project.client}
        </div>
      </div>

      {/* Default: show title. Hover: hide title and show "View Project -->" */}
      <div className="absolute bottom-6 left-7 right-7 flex items-center gap-3 text-[13px] text-white/85">
        <span className="inline-block h-3 w-3 rounded-full border border-white/60" />

        <span className="whitespace-nowrap transition-opacity duration-200 group-hover:opacity-0">
          {project.title}
        </span>

        <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          View Project --&gt;
        </span>
      </div>
    </a>
  );
}
