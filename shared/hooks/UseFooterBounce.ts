"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

type UseFooterBounceArgs = {
  footerRef: RefObject<HTMLElement | null>;
  down: string;
  up: string;
  center: string;
};

export function useFooterBounce({ footerRef, down, up, center }: UseFooterBounceArgs) {
 useGSAP(
  () => {
    const el = footerRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      toggleActions: "play pause resume reverse",

      onEnter: () => {
        const tl = gsap.timeline({ overwrite: true });

        tl.set("#bouncy-path", { morphSVG: down })
          .to("#bouncy-path", {
            morphSVG: up,
            duration: 0.35,
            ease: "power2.out",
          })
          .to("#bouncy-path", {
            morphSVG: center,
            duration: 1.2,
            ease: "elastic.out(1.6, 0.25)",
          });
      },

      onLeaveBack: () => {
        gsap.set("#bouncy-path", { morphSVG: down });
      },
    });

    return () => st.kill();
  },
  { dependencies: [] }
);
}
