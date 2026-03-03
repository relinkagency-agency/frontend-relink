/** @format */
"use client";

import React from "react";
import { ProjectCard } from "./card";
import { Project } from "@/lib/types";
import Image from "next/image";
import JenyAvatar from "../../../../public/jen.jpg";


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
            {/* <a
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-3b text-lg font-semibold border-b-2 border-white/80 text-white transition-all hover:scale-[1.02]"
            >
              View all work <span className="text-[16px] leading-none">↗</span>
            </a> */}

            <a
              href="#"
              className="mt-10 inline-flex items-center gap-2 text-lg font-semibold border-b-2 border-white/80 pb-1 hover:gap-4 transition-all text-white w-fit"
            >
              View all work <span aria-hidden>↗</span>
            </a>
          </div>

          <div className="w-full py-12   mx-auto text-white font-relink-neue">
            <h3 className="text-[55px] capitalize">What our clients say</h3>

            <div className="flex gap-8 justify-center items-end mt-12">
              <div className="flex gap-6 items-end">
                <div><Image className="w-10 h-10 rounded-full object-cover" src={JenyAvatar} alt="client with quote" width={50} height={50} /></div>
                <div className="flex flex-col gap-1 ">
                  <h4 className="text-[25px]"> John Doe</h4>
                  <p className="text-[20px]">CEO, Company</p>
                  <p className="max-w-[350px] font-relink-neue flex-wrap">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                </div>
              </div>


              <div className="flex gap-6  items-end">
                <div><Image className="w-10 h-10 rounded-full object-cover" src={JenyAvatar} alt="client with quote" width={50} height={50} /></div>
                <div className="flex flex-col gap-1 ">
                  <h4 className="text-[25px]"> John Doe</h4>
                  <p className="text-[20px]">CEO, Company</p>
                  <p className="max-w-[350px] font-relink-neue">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                </div>
              </div>


              <div className="flex gap-6 items-end">
                <div><Image className="w-10 h-10 rounded-full object-cover" src={JenyAvatar} alt="client with quote" width={50} height={50} /></div>
                <div className="flex flex-col gap-1 ">
                  <h4 className="text-[25px]"> John Doe</h4>
                  <p className="text-[20px]">CEO, Company</p>
                  <p className="max-w-[350px] font-relink-neue">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
