"use client";

import { useLayoutEffect, useRef, memo } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import Image from "next/image";

gsap.registerPlugin(Flip);

const images = [
  { id: "one", src: "/team-1.jpg" },
  { id: "two", src: "/growth.jpg" },
  { id: "four", src: "/who.jpg" },
  { id: "five", src: "/sales.jpg" },
  { id: "six", src: "/idea.jpg" },
  { id: "three", src: "/stra.jpg" },
];

function FlipSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalFrameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Safety check: ensure scroll is unlocked on mount/remount
    document.body.style.overflow = "";

    const controller = new AbortController();
    const { signal } = controller;

    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray<HTMLElement>(".box");
      const modal = modalRef.current!;
      const modalFrame = modalFrameRef.current!;
      const overlay = overlayRef.current!;

      let activeBox: HTMLElement | null = null;
      let originalParent: HTMLElement | null = null;

      // Event Handler for Box Click (Toggle Logic)
      function handleBoxClick(box: HTMLElement) {
        // CLOSE Logic
        if (activeBox) {
          const state = Flip.getState(activeBox);

          // Revert global scroll
          document.body.style.overflow = "";

          // Append back to original parent
          if (originalParent) {
            originalParent.appendChild(activeBox);
            // Crucial: The parent needs to allow the child to be visible outside its bounds
            // and sit ON TOP of the overlay during the transition.
            gsap.set(originalParent, { zIndex: 1001, overflow: "visible" });
          }

          // Animate Modal Out
          gsap.to(overlay, { autoAlpha: 0, duration: 0.35 });
          // Hide frame interactions immediately
          gsap.set(modalFrame, { pointerEvents: "none" });
          gsap.set(modal, { autoAlpha: 0, pointerEvents: "none", delay: 0.35 });

          // FLIP Back
          Flip.from(state, {
            duration: 0.7,
            ease: "power3.inOut",
            absolute: true, // Takes it out of flow to prevent layout jank
            zIndex: 1002,   // Ensure it sits on top of parent/overlay
            onComplete: () => {
              gsap.set(activeBox, { zIndex: "auto", clearProps: "width,height,position,top,left" });

              // Reset parent styles
              if (originalParent) {
                gsap.set(originalParent, { clearProps: "zIndex,overflow" });
              }

              activeBox = null;
              originalParent = null;
            }
          });
        }
        // OPEN Logic
        else {
          const state = Flip.getState(box);

          // Lock Global Scroll
          document.body.style.overflow = "hidden";

          originalParent = box.parentElement;
          if (!originalParent) console.error("No parent found for box!");

          activeBox = box;

          // Move to Modal
          modalFrame.appendChild(box);

          // Force layout in modal
          gsap.set(box, {
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 10
          });

          // Show Modal Helpers
          gsap.set(modal, { autoAlpha: 1, pointerEvents: "auto" });
          // Enable clicks on the frame now that it's open
          gsap.set(modalFrame, { pointerEvents: "auto" });

          gsap.to(overlay, { autoAlpha: 1, duration: 0.35 });

          // FLIP In
          Flip.from(state, {
            duration: 0.7,
            ease: "power3.inOut",
            absolute: true,
            zIndex: 1002 // Ensure flying box is on top
          });
        }
      }

      // Attach Listeners
      boxes.forEach((box) => {
        box.addEventListener("click", (e) => {
          e.stopPropagation();
          handleBoxClick(box);
        }, { signal });
      });

      // Optional: Close on overlay click
      modal.addEventListener("click", (e) => {
        if (activeBox) handleBoxClick(activeBox);
      }, { signal });

    }, containerRef);

    return () => {
      ctx.revert();
      controller.abort();
      // Ensure scroll is restored if unmounting while open
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* GRID SECTION */}
      <section className="min-h-screen py-0 md:py-18 px-8 flex justify-center bg-amber-50">
        <div className="grid grid-cols md:grid-cols-3 gap-6 md:gap-4 max-w-[1350px] w-full">
          {images.map((img) => (
            <div
              key={img.id}
              className="grid-cell relative aspect-square overflow-hidden cursor-pointer"
            >
              <div className="box w-full h-full relative">
                <Image
                  src={img.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL LAYER */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-[1000] opacity-0 pointer-events-none"
      >
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="absolute inset-0 flex items-center justify-center p-6">
          {/*
              Changed pointer-events-auto to pointer-events-none initially.
              We only enable it when the modal opens via GSAP logic.
              This prevents the invisible frame from blocking grid clicks.
          */}
          <div
            ref={modalFrameRef}
            className="relative w-full max-w-[820px] aspect-[4/5] md:aspect-[16/9] lg:aspect-[4/3] pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(FlipSection);
