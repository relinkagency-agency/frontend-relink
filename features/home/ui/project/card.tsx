/** @format */

import Image from "next/image";
import { Project } from "@/lib/strapi.types";

export function ProjectCard({ project }: { project: Project }) {
  const category = project.services?.map(s => s.title).join(", ") || "Project";

  return (
    <a
      href={`/work-services/${project.slug}`}
      className="group relative h-[430px] w-[320px] shrink-0 overflow-hidden bg-[#11161d]"
    >
      {project.thumbnail?.url ? (
        <Image
          src={project.thumbnail.url}
          alt={project.thumbnail.alt || project.title}
          fill
          sizes="320px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="bg-relink-dark h-full w-full flex items-center justify-center">
          <span className="text-white/20">No Image</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/50" />

      <div className="absolute left-7 top-7 right-7">
        <div className="text-[12px] font-semibold tracking-[0.22em] text-white/80 uppercase">
          {category}
        </div>
        <div className="mt-2 text-[20px] font-semibold leading-snug text-white/90">
          {project.clientName || project.title}
        </div>
      </div>

      <div className="absolute bottom-6 left-7 right-7 flex items-center gap-3 text-[13px] text-white/85">
        <span className="inline-block h-3 w-3 rounded-full border border-white/60" />

        <span className="whitespace-nowrap transition-opacity duration-200 group-hover:opacity-0">
          {project.title}
        </span>

        <span className="flex gap-2 items-center whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          View Project
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
    </a>
  );
}
