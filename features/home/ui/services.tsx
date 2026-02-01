/** @format */

"use client";

import React from "react";
import type { Service } from "@/lib/strapi.types";

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-relink-dark">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_380px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

        <div className="relative mx-auto w-full px-8 md:px-12 py-18">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-4 md:gap-x-20">
            {services.map((service) => (
              <div key={service.id} className="min-w-0">
                <h3 className="text-3xl mb-3 md:mb-0 md:text-[44px] font-normal leading-none tracking-tight text-white">
                  {service.title}
                </h3>

                {service.shortDescription && (
                  <p className="text-sm md:mt-7 md:text-[16px] font-relink-neue leading-[1.9] text-white/90">
                    {service.shortDescription}
                  </p>
                )}
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
