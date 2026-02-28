'use client';

import { Project } from "@/lib/types";
import { CldImage } from "next-cloudinary";

export default function FeaturedProject({ project }: { project: Project }) {
  const category = project.services?.map(s => s.title).join(", ") || "Project";

  return (
    <section className="relative w-full bg-relink-dark/50">
      <div className="relative h-[72vh] min-h-[520px] w-full overflow-hidden">
        {project.thumbnail?.publicId && (
          <CldImage
            src={project.thumbnail.publicId}
            alt={project.thumbnail.alt || project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/50 to-black/30" />

        <div className="absolute left-10 top-8 flex items-center gap-3 text-[13px] tracking-[0.22em] text-white/85">
          <span className="uppercase">{category}</span>
        </div>


        <div className="absolute bottom-12 left-10 right-10">
          <div className="max-w-[980px]">
            <div className="mb-3 text-[13px] font-semibold tracking-[0.22em] text-white/85 uppercase">
              {project.clientName || "Featured"}
            </div>

            <h1 className="font-serif text-5xl md:text-[54px] leading-[1.05] tracking-tight text-white md:text-[64px]">
              {project.title}
            </h1>

            <a
              href={`/projects/${project.slug}`}
              className="mt-10 inline-flex items-center gap-3 bg-amber-50 px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-black uppercase transition-all hover:gap-5"
            >
              VIEW PROJECT <span className="text-[16px] leading-none">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
