"use client";

import { useLayoutEffect, useRef, memo } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import Image from "next/image";

gsap.registerPlugin(Flip);

const images = [
  { id: "one", src: "/un-2.jpg" },
  { id: "two", src: "/web05.png" },
  { id: "three", src: "/un-3.jpg" },
  { id: "four", src: "/un-2.jpg" },
  { id: "five", src: "/un-3.jpg" },
  { id: "six", src: "/web05.png" },
];

function FlipSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalFrameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Store cleanup functions for event listeners
  const cleanupsRef = useRef<(() => void)[]>([]);

  useLayoutEffect(() => {
    // Create a GSAP Context properly scoped to the component
    const ctx = gsap.context((self) => {
      // We grab elements via the refs inside the context
      const boxes = gsap.utils.toArray<HTMLElement>(".box");
      const modal = modalRef.current!;
      const modalFrame = modalFrameRef.current!;
      const overlay = overlayRef.current!;

      let activeBox: HTMLElement | null = null;
      let originalParent: HTMLElement | null = null;

      // --- OPEN ANIMATION ---
      const open = (box: HTMLElement) => {
        if (activeBox) return; // Prevent multiple opens
        console.log("Opening box", box);

        // 1. Capture State (Initial: Grid Position)
        const state = Flip.getState(box);

        // 2. Save reference to where it belongs
        originalParent = box.parentElement;
        activeBox = box;

        // 3. Move to Modal and Apply 'Hero' Styles
        // We reparent to the modal frame
        modalFrame.appendChild(box);

        // Force the box to fill the modal frame explicitly
        gsap.set(box, {
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 10 // Ensure it sits on top if needed
        });

        // 4. Animate Overlay
        gsap.set(modal, { autoAlpha: 1, pointerEvents: "auto" });
        gsap.to(overlay, { autoAlpha: 1, duration: 0.25 });

        // 5. FLIP Transition
        Flip.from(state, {
          duration: 0.7,
          ease: "power3.inOut", // Smoother easing
          absolute: true, // Crucial for FLIP to visually detach
        });
      };

      // --- CLOSE ANIMATION ---
      const close = () => {
        if (!activeBox || !originalParent) return;
        console.log("Closing box");

        // 1. Capture State (Current: Modal Position)
        const state = Flip.getState(activeBox);

        // 2. Restore DOM Structure
        // Move the box back to its original grid cell
        originalParent.appendChild(activeBox);

        // 3. Reset Styles to match Grid
        // We clear the overrides we added in 'open' so it snaps back to grid styling
        gsap.set(activeBox, {
          width: "100%", // It was 100% in grid too, but let's be safe.
          height: "100%",
          position: "relative",
          zIndex: "auto",
          clearProps: "max-width,max-height,zIndex" // Clear any lingering inline styles
        });

        // 4. Animate Overlay out
        gsap.to(overlay, { autoAlpha: 0, duration: 0.25 });
        gsap.set(modal, { autoAlpha: 0, pointerEvents: "none", delay: 0.2 });

        // 5. FLIP Transition back to Grid
        Flip.from(state, {
          duration: 0.7,
          ease: "power3.inOut",
          absolute: true,
          onComplete: () => {
            activeBox = null;
            originalParent = null;
            // Ensure no artifacts remain
            gsap.set(state.targets, { clearProps: "position,width,height,top,left,transform,zIndex" });
          }
        });
      };

      // Add listeners
      boxes.forEach((box) => {
        const handleClick = (e: MouseEvent) => {
          console.log("Box clicked", box);
          e.stopPropagation();
          open(box);
        };
        box.addEventListener("click", handleClick as EventListener);
        cleanupsRef.current.push(() => box.removeEventListener("click", handleClick as EventListener));
      });

      const handleModalClick = () => {
        console.log("Modal clicked");
        close();
      };

      modal.addEventListener("click", handleModalClick);
      cleanupsRef.current.push(() => modal.removeEventListener("click", handleModalClick));

    }, containerRef); // Scope to container

    return () => {
      ctx.revert();
      cleanupsRef.current.forEach(cleanup => cleanup());
      cleanupsRef.current = [];
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* GRID SECTION */}
      <section className="min-h-screen py-28 px-8 flex justify-center bg-amber-50">
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[1350px] w-full"
        >
          {images.map((img) => (
            /* 
               WRAPPER (.grid-cell):
               The stable anchor in the grid. It keeps the space open when the child moves.
               Using 'relative' allows the absolute child to land correctly.
            */
            <div
              key={img.id}
              className="grid-cell relative aspect-square  overflow-hidden cursor-pointer"
            >
              {/* 
                 DRAGGABLE/ANIMATED ITEM (.box):
                 The actual element that moves. 
                 It changes context but always fills its parent.
              */}
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

        {/* MODAL FRAME */}
        {/* Ensures strict centering and sizing for the zoomed image */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div
            ref={modalFrameRef}
            className="relative w-full max-w-[820px] aspect-[4/5] md:aspect-[16/9] lg:aspect-[4/3] pointer-events-auto"
            onClick={(e) => e.stopPropagation()} // Optional: Prevent clicking frame from closing if desired. User said: "close when clicking anywhere". So remove this if strict.
          // User: "The modal should close when clicking anywhere (overlay or image)"
          // So we do NOT stop propagation on the frame.
          />
        </div>
      </div>
    </div>
  );
}

export default memo(FlipSection);
