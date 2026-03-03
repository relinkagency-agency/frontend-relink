/** @format */
import React from "react";
import Image from "next/image";
import img from "../../../public/overview2.jpg";

interface OverviewProps {
  title?: React.ReactNode;
  description?: string;
  image?: any;
  showCta?: boolean;
}

export default function MobileOverview({
  title = (
    <>
      We create digital
      <br />
      products that drive
      <br />
      real business growth.
    </>
  ),
  description = "We combine advanced AI automation, web development, and strategic marketing to build brands that lead the future.",
  image = img,
  showCta = true,
}: OverviewProps) {
  return (
    <section className="relative z-10 w-full bg-amber-50 flex flex-col-reverse">
      <div className="relative w-full h-[450px] overflow-hidden">
        <Image
          src={image}
          alt="Relink Brand Overview"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="w-full bg-amber-50 flex flex-col justify-center px-8 py-18 overflow-hidden text-black">
        <div className="max-w-xl">
          <h2 className="text-4xl font-light leading-tight text-black mb-6">
            {title}
          </h2>

          <div className="max-w-[500px]">
            <p className="text-lg text-black/90 leading-relaxed">
              {description}
            </p>
          </div>

          {showCta && (
            <a
              href="/about-culture"
              className="mt-10 inline-flex items-center gap-2 text-lg font-semibold border-b-2 border-black/80 pb-1 hover:gap-4 transition-all text-black w-fit"
            >
              See what we do <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
