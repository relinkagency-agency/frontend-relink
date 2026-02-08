"use client";

import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Panel = {
  image: any;
  heading: string;
  label?: string;
};

type AnimatedContinuousSectionProps = {
  panels: Panel[];
  heightClass?: string;
};

export default function AnimatedContinuousSection({
  panels,
  heightClass = "h-[420px] md:h-[650px]",
}: AnimatedContinuousSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const queuedIndexRef = useRef<number | null>(null);
  const gotoSectionRef = useRef<((index: number, direction: number) => void) | null>(
    null
  );

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const pinEl = sectionRef.current;
    const root = containerRef.current;

    const sections = gsap.utils.toArray<HTMLElement>(".ap-section", root);
    const images = gsap.utils.toArray<HTMLElement>(".ap-bg", root);
    const headings = gsap.utils.toArray<HTMLElement>(".ap-heading", root);
    const outerWrappers = gsap.utils.toArray<HTMLElement>(".ap-outer", root);
    const innerWrappers = gsap.utils.toArray<HTMLElement>(".ap-inner", root);

    if (!sections.length) return;

    function gotoSection(index: number, direction: number) {
      const total = sections.length;
      const wrapIndex = (n: number) => (n + total) % total;
      index = wrapIndex(index);

      // queue the latest request if animation is in progress
      if (animatingRef.current) {
        queuedIndexRef.current = index;
        return;
      }

      const currentIndex = currentIndexRef.current;
      if (currentIndex === index) return;

      animatingRef.current = true;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.1, ease: "power1.inOut" },
        onComplete: () => {
          animatingRef.current = false;
          currentIndexRef.current = index;

          // run queued request (latest) after current finishes
          if (queuedIndexRef.current !== null) {
            const next = queuedIndexRef.current;
            queuedIndexRef.current = null;

            const dir = next > index ? 1 : -1;
            gotoSectionRef.current?.(next, dir);
          }
        },
      });

      gsap.set(sections[currentIndex], { zIndex: 0 });

      tl.to(images[currentIndex], { xPercent: -15 * dFactor }, 0).set(
        sections[currentIndex],
        { autoAlpha: 0 }
      );

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        { xPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { xPercent: 0 },
        0
      )
        .fromTo(images[index], { xPercent: 15 * dFactor }, { xPercent: 0 }, 0)
        .fromTo(
          headings[index],
          { autoAlpha: 0, xPercent: 80 * dFactor },
          { autoAlpha: 1, xPercent: 0, duration: 0.9, ease: "power2.out" },
          0.2
        );
    }

    gotoSectionRef.current = gotoSection;

    // initial states (instant)
    gsap.set(sections, { autoAlpha: 0 });
    gsap.set(sections[0], { autoAlpha: 1, zIndex: 1 });

    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });

    gsap.set([outerWrappers[0], innerWrappers[0]], { xPercent: 0 });
    gsap.set(images[0], { xPercent: 0 });
    gsap.set(headings[0], { autoAlpha: 1, xPercent: 0 });

    currentIndexRef.current = 0;
    animatingRef.current = false;

    // remove SSR safety inline styles
    gsap.set(sections, { clearProps: "opacity,visibility" });

    // ScrollTrigger pin + index tracking with controlled progression
    let lastIndex = 0;
    let lastProgress = 0;
    let isTransitioning = false;

    const st = ScrollTrigger.create({
      trigger: pinEl,
      start: "top top",
      end: () => "+=" + window.innerHeight * (sections.length - 1),
      pin: true,
      anticipatePin: 1,
      scrub: false,
      
      // Prevent momentum scrolling from triggering multiple sections
      onUpdate: (self) => {
        if (sections.length <= 1 || isTransitioning) return;

        const currentProgress = self.progress;
        
        // Require more substantial scroll movement
        if (Math.abs(currentProgress - lastProgress) < 0.1) return;

        const nextIndex = Math.round(currentProgress * (sections.length - 1));
        if (nextIndex === lastIndex) return;

        // Prevent rapid fire transitions
        isTransitioning = true;
        setTimeout(() => {
          isTransitioning = false;
        }, 800);

        const direction = self.direction === 1 ? 1 : -1;
        gotoSectionRef.current?.(nextIndex, direction);

        lastIndex = nextIndex;
        lastProgress = currentProgress;
      },
    });

    return () => {
      st.kill();
      gotoSectionRef.current = null;
      queuedIndexRef.current = null;
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-amber-50  mb-0">
      <div className="mx-auto px-0  md:px-0">
        <div
          ref={containerRef}
          className={`relative w-full overflow-hidden ${heightClass}`}
        >
          {panels.map((panel, i) => (
            <section
              key={i}
              className="ap-section absolute inset-0"
              style={{
                opacity: i === 0 ? 1 : 0,
                visibility: i === 0 ? "visible" : "hidden",
              }}
            >
              <div className="ap-outer absolute inset-0 overflow-hidden">
                <div className="ap-inner absolute inset-0 overflow-hidden">
                  <Image
                    src={panel.image}
                    alt={panel.heading}
                    fill
                    className="ap-bg object-cover"
                    sizes="(max-width: 768px) 100vw, 1250px"
                  />

                  {/* readability overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                  <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_120px_rgba(0,0,0,0.35)]" />

                  <div className="absolute left-6 top-24 z-10 text-white md:left-10 group">
                    <h2 className="ap-heading font-relink-headline text-3xl leading-tight md:text-5xl">
                      {panel.heading}
                    </h2>

                    {panel.label && (
                      <p className="font-relink-neue text-[16px] tracking-wider text-white flex gap-2 items-center transition-transform duration-400 ease-in-out group-hover:translate-x-2">
                        {panel.label}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}