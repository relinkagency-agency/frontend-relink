import Image from "next/image";
import bg from "../../../public/idea.jpg";

export default function Hero() {
  return (
    <section className="relative h-[520px] md:h-[650px] lg:h-screen w-full overflow-hidden bg-[#0B0D13]">
      <Image
        src={bg}
        alt="Relink Strategy Culture Creative"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13]/20 via-transparent to-transparent" />

      <div className="absolute text-white bottom-32 md:bottom-20 lg:bottom-20 left-5 md:left-20 lg:left-20 md:max-w-4xl max-w-2xl z-10">
        <h1 className="font-light font-relink-headline text-5xl lg:text-8xl">
          High-impact digital solutions.
        </h1>
      </div>

      <div className="absolute text-white bottom-5 md:bottom-20 left-5 md:left-0 lg:left-auto lg:right-20 font-relink-headline lg:text-4xl max-w-4xl uppercase z-10">
        <div className="flex flex-col gap-2 font-relink-neue">
          <a
            href="#projects"
            className="text-sm flex gap-2 items-center cursor-pointer group"
          >
            <span className="tracking-wide leading-4 font-medium">
              Explore Our Work
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 transition-transform duration-300 group-hover:translate-y-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
