/** @format */
"use client";

import React from "react";

const items = [
  {
    title: "Creative",
    body: (
      <>
        We craft <span className="linkish">photography</span>,{" "}
        <span className="linkish">graphic design</span>, and{" "}
        <span className="linkish">video</span> that carries a clear narrative,
        aligns stakeholders, boosts engagement, and makes complexity feel
        simple.
      </>
    ),
  },
  {
    title: "Brand",
    body: (
      <>
        From positioning through identity, we sharpen your story and claim the
        space only you can own—helping <span className="linkish">brands</span>{" "}
        out-position competitors and win in the market.
      </>
    ),
  },
  {
    title: "Development",
    body: (
      <>
        We <span className="linkish">design and develop</span> digital
        experiences that join brand, function, and UX into one system—from
        websites to portals, built to carry the brand and do the heavy lifting.
      </>
    ),
  },
  {
    title: "Marketing",
    body: (
      <>
        From strategy and concepting to delivery, we ensure your message lands
        the right way, in the right places—through creative that stays anchored
        to the brand.
      </>
    ),
  },
];

export default function Services() {
  return (
    <section className="w-full bg-relink-dark">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_380px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

        <div className="relative mx-auto w-full px-8 md:px-12 py-10">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-4 md:gap-x-20">
            {items.map((it) => (
              <div key={it.title} className="min-w-0">
                <h3 className=" text-3xl mb-3 md:mb-0 md:text-[44px] font-normal leading-none tracking-tight text-white">
                  {it.title}
                </h3>

                <p className=" text-sm md:mt-7 md:text-[16px] leading-[1.9] text-white/90">
                  {it.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .linkish {
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
          color: rgba(255, 255, 255, 0.95);
        }
      `}</style>
    </section>
  );
}
