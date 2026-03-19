import bg from "../../../public/un-2.jpg";
export default function Hero() {
  return (
    <>
      <div className="relative h-[520px] md:h-[650px] lg:h-screen w-full overflow-hidden">
        <img
          src={bg.src}
          alt="background"
          className="absolute inset-0 w-full md:h-full h-full object-cover"
        />

        <div className="absolute text-white bottom-32 md:bottom-30 lg:bottom-40 left-5 md:left-20 lg:left-30 font-relink-headline text-5xl lg:text-7xl md:max-w-4xl max-w-2xl">
          <h1>Research, trends, and technology.</h1>
        </div>
        <div className="absolute text-white bottom-5 md:bottom-16 left-5 md:left-20 lg:left-auto lg:right-20 font-relink-headline lg:text-4xl max-w-4xl uppercase">
          <div className="flex gap-2 font-relink-neue group">

            <a
              href="#"
              className="text-sm flex gap-1 items-center cursor-pointer ransition-transform duration-300 group-hover:translate-y-2"
            >
              <span className="tracking-wide leading-4 font-medium">
                Explore
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 transition-transform duration-300 group-hover:translate-y-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
