/** @format */

import bg from "../../../public/hero-bg-4.jpg";
export default function Hero() {
  return (
    <>
      <div className="relative h-[520px] md:h-[650px] lg:h-[750px] w-full overflow-hidden">
        <img
          src={bg.src}
          alt="background"
          className="absolute inset-0 w-full md:h-full h-[520px] object-cover"
        />

        <div className="absolute text-white lg:top-98 lg:bottom-60 md:bottom-40 bottom-10 top-50 md:top-0 md:left-20 left-5  md:max-w-4xl max-w-2xl">
          <h1 className="font-light font-relink-headline text-5xl lg:text-8xl">
            Building the brands people prefer{" "}
          </h1>
        </div>
        <div className="absolute text-white bottom-20 md:bottom-30 left-5 md:left-0 lg:left-auto lg:right-20 font-relink-headline lg:text-4xl max-w-4xl uppercase">
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
        </div>
      </div>
    </>
  );
}
