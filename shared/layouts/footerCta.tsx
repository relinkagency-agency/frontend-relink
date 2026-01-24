"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "./transitionLink";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FooterCta() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname(); 

  useGSAP(
    () => {
      
      ScrollTrigger.refresh();

      const lines = gsap.utils.toArray<HTMLElement>(".cta-line");

      gsap.from(lines, {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: wrapRef, dependencies: [pathname] }
  );

  return (
    <div
      ref={wrapRef}
      className="relative z-20 container mx-auto md:px-2 px-4 md:mb-36 mb-32 md:py-18"
    >
      <div className="max-w-[1100px]">
        <div className="overflow-hidden">
          <h2 className="cta-line font-relink-headline font-semibold text-white/95 text-[28px] leading-[1.05] md:text-[86px]">
            Have a project in mind?
          </h2>
        </div>

        <div className="overflow-hidden mt-2 md:mt-6">
          <h2 className="cta-line font-relink-headline font-semibold text-white/95 text-[28px] leading-[1.05] md:text-[76px]">
            <TransitionLink
              href="/contact-us"
              className="group relative inline-flex items-center gap-4 pb-2 md:pb-3"
            >
              <span className="hover:underline hover:text-white transition-all duration-300">Talk to our experts</span>
              <span
                aria-hidden="true"
                className="inline-block translate-x-[-8px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-9"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </span>
            </TransitionLink>
          </h2>
        </div>
      </div>
    </div>
  );
}