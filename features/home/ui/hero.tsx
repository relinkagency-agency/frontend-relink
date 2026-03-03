/** @format */

import Image from "next/image";
import bg from "../../../public/hero-bg-4.jpg";

interface HeroProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  image?: any; // strict typing for static import can be tricky, 'any' or StaticImageData is fine for now
}

export default function Hero({
  title = (
    <>
      Building intelligent
      <br />
      digital experiences
    </>
  ),
  subtitle = (
    <div className="flex flex-col gap-2 font-relink-neue ">
      <p className="text-xs tracking-wide leading-4 font-medium">
        Cue Actors Web app
      </p>
      <a
        href="#"
        className="text-sm flex gap-2 items-center cursor-pointer group"
      >
        <span className="tracking-wide leading-4 font-medium">
          Read Case Study
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 transition-transform duration-300 group-hover:translate-x-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </a>
    </div>
  ),
  image = bg,
}: HeroProps) {
  return (
    <>
      <section className="relative h-[520px] md:h-[650px] lg:h-screen w-full overflow-hidden bg-[#0B0D13]">
        <Image
          src={image}
          alt="Relink Agency Hero"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute text-white bottom-30 md:bottom-20 lg:bottom-40 left-5 md:left-20 lg:left-20 md:max-w-4xl max-w-[800px]">
          <h1 className="font-light font-relink-headline text-6xl  lg:text-8xl md:leading-none leading-[63px]">
            {title}
          </h1>
        </div>
        <div className="absolute text-white bottom-5 md:bottom-5 lg:bottom-20 left-5 md:left-20 lg:left-auto lg:right-20 font-relink-headline lg:text-4xl max-w-4xl uppercase">
          {subtitle}
        </div>
      </section>
    </>
  );
}
