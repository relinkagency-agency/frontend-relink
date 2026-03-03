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

  const TESTIMONIALS = [
    {
      id: 1,
      name: "Laura",
      duration: "5 months with relink",
      quote: "I have never felt healthier and more comfortable in my own skin and I owe it all to the Relink app.",
      image: JenyAvatar,
    },
    {
      id: 2,
      name: "Rohan",
      duration: "13 months with relink",
      quote: "Before Relink, I lacked any sort of plan. With Relink, I've been able to get into the gym 5, 6, 7 days a week.",
      image: JenyAvatar,
    },
    {
      id: 3,
      name: "Deanna",
      duration: "15 months with relink",
      quote: "My Relink coach has taught me how to consistently work out and to appreciate that time for myself.",
      image: JenyAvatar,
    },
    {
      id: 4,
      name: "Marcus",
      duration: "8 months with relink",
      quote: "The personalized attention I get feels like having a personal trainer right in my pocket at all times.",
      image: JenyAvatar,
    },
    {
      id: 5,
      name: "Sarah",
      duration: "2 years with relink",
      quote: "I finally broke through my plateau. The progressive workouts keep challenging me in exactly the right ways.",
      image: JenyAvatar,
    },
    {
      id: 6,
      name: "David",
      duration: "11 months with relink",
      quote: "As a busy professional, finding time was my biggest hurdle. Relink fits perfectly into my unpredictable schedule.",
      image: JenyAvatar,
    },
  ];

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
              href="#"
              className="md:mt-10 mt-2 inline-flex items-center gap-2 text-lg font-semibold border-b-2 border-white/80 pb-1 hover:gap-4 transition-all text-white w-fit"
            >
              View all work <span aria-hidden>↗</span>
            </a>
          </div>

          <div className="w-full pt-12 pb-16 mx-auto text-white">
            <div className="text-center mb-16 px-4">
              <h3 className="text-5xl md:text-[64px] font-medium tracking-tight mb-6 mt-4">Our clients get real results</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-[15px] md:text-base text-gray-300">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>4.9/5 reviews</span>
                </div>
                <span className="hidden sm:inline text-gray-500">|</span>
                <span>95% of are clients are satisfied with us</span>
              </div>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="flex flex-col gap-4 sm:gap-6 w-[260px] sm:w-[300px] lg:w-[320px] shrink-0 snap-center">
                  <div className="relative aspect-square rounded-[5px] sm:rounded-[5px] overflow-hidden group cursor-pointer">
                    <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 flex justify-between items-end">
                      <div>
                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-medium text-white mb-1 sm:mb-2">{testimonial.name}</h4>
                        <p className="text-[10px] sm:text-xs font-bold text-white/80 uppercase tracking-widest leading-tight">{testimonial.duration}</p>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 transition-transform group-hover:scale-110 shrink-0">
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg lg:text-[16px] font-light text-white/90 leading-relaxed font-relink-neue px-1">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
}
