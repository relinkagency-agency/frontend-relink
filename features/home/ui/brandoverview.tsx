/** @format */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import img from "../../../public/overview.jpg"
gsap.registerPlugin(ScrollTrigger);

export default function Overview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    gsap.set(left, { flexBasis: "75%" });
    gsap.set(right, { flexBasis: "25%" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=140%", // shorter than 180% 
        scrub: true,
        pin: true,
        pinSpacing: true, // keep spacing so layout doesn't jump
        anticipatePin: 1,
        // markers: true,
      },
    });

    tl.to(left, { flexBasis: "50%", ease: "none" }, 0.5);
    tl.to(right, { flexBasis: "50%", ease: "none" }, 0.5);

    tl.to(left, { flexBasis: "40%", ease: "none" }, 1);
    tl.to(right, { flexBasis: "60%", ease: "none" }, 1);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="bg-transparent">
      <section
        ref={sectionRef}
        className="overflow-hidden bg-r[#1f2937] h-[calc(120vh-90px)]"
      >
        <div className="flex h-full bg-[#1f2937]">
          <div
            ref={leftRef}
            className="shrink-0 overflow-hidden will-change-[flex-basis] h-full min-w-0"
            style={{ flexBasis: "75%" }}
          >
            <div className="w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt="about-relink"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>{" "}
            </div>
          </div>

          <div
            ref={rightRef}
            className="shrink-0 bg-relink-purple-dark h-full flex flex-col justify-center px-16 will-change-[flex-basis] min-w-0 overflow-hidden"
            style={{ flexBasis: "25%" }}
          >
            <div className="max-w-none">
              <div className="w-[600px] shrink-0">
                <h1 className="text-[55px] font-light leading-tight text-white">
                  We&apos;re here to create work
                  <br />
                  that earns its place in
                  <br />
                  culture.
                </h1>

                <div className="max-w-[500px]">
                  <p className="mt-5 text-lg text-white/90 leading-relaxed">
                    We&apos;re a strategic brand and creative agency built for
                    the brands that want to ratchet up culture.
                  </p>
                </div>

                <a
                  href="#"
                  className="mt-10 inline-flex items-center gap-2 text-lg font-semibold border-b-2 border-white/80 pb-1 hover:gap-4 transition-all text-white"
                >
                  See what we do <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
