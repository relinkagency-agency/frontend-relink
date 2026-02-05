"use client";

import { useState } from "react";
import Image from "next/image";
import aboutImg from "../../../public/un-3.jpg";
import aboutTeamImg from "../../../public/about-team.jpg";
import carousel1 from "../../../public/un-2.jpg";
import carousel2 from "../../../public/un-3.jpg";
import carousel3 from "../../../public/teamwork.jpg";
import carousel4 from "../../../public/un-2.jpg";
import AnimatedContinuousSection from "@/shared/ui/gsap/animatedContinuousSection";
import BlogList from "@/features/home/ui/blog-list";
import { Article } from "@/lib/strapi.types";
import FlipSection from "@/shared/ui/gsap/flipSection";

const faq = [
  {
    title: "Ratcheting up the cultural baseline.",
    body: "Our responsibility is to bring culture into the work, to lift the standard for the brands we work with, and in doing so, raise the cultural baseline for everyone...",
  },
  {
    title: "Don't method out the ambition",
    body: "Ambition should never be diluted by process. We protect the idea first.",
  },
  {
    title: "Creativity and growth.",
    body: "We believe creativity is a growth engine, not just an output.",
  },
  {
    title: "Seriously, unserious.",
    body: "We take the work seriously, not ourselves.",
  },
];

interface MainProps {
  articles: Article[];
}

export default function Main({ articles }: MainProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <section className="bg-amber-50 py-16 md:pt-24 ">
        <div className="mx-auto flex flex-col gap-10 px-6 py-4 md:max-w-7xl md:flex-row md:items-center md:gap-18">
          <div className="w-full md:w-1/2">
            <h1 className="font-relink-headline text-3xl leading-tight md:text-6xl md:leading-17">
              We're for the brands that want to ratchet up culture, and the
              creatives who live to shape it.
            </h1>
          </div>

          <div className="flex w-full flex-col gap-4 font-relink-neue text-[16px] leading-8 md:w-1/2 md:max-w-xl">
            <p>
              We're all about building charismatic, culturally relevant brands,
              and taking them from branded to brand-led.
            </p>
            <p>
              From producing head-turning campaigns that motivate behavioural
              change, to executing large-scale brand creative refreshes, to
              developing digital touchpoints for the best possible consumer UX;
              we combine creative and strategy to craft brands that are more
              culturally relevant.
            </p>
            <p>We exist to create work that earns its place in culture.</p>
          </div>
        </div>

        <div className="mx-auto mt-10 w-full px-6 md:mt-10 md:w-[1250px] md:px-0">
          <div className="relative h-[320px] w-full overflow-hidden md:h-[800px]">
            <Image
              src={aboutImg}
              alt="About us"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1250px"
            />
          </div>
        </div>
      </section>

      <section className="bg-amber-50 pb-16">
        <div className="mx-auto flex flex-col gap-12 px-6 py-8 md:flex-row md:items-start md:justify-center md:gap-32 md:px-0 md:py-28">
          <div className="w-full md:w-[40%]">
            <h3 className="font-relink-headline mb-8 text-4xl leading-tight tracking-tight md:text-6xl md:leading-17">
              We're shaped around a few simple ideas
            </h3>

            <div className="space-y-6">
              {faq.map((item, i) => (
                <div key={i}>
                  <div
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex max-w-md cursor-pointer items-center justify-between gap-8 group"
                  >
                    <h3 className="font-relink-neue text-lg font-light md:text-xl transition-transform duration-400 group-hover:translate-x-2">
                      {item.title}
                    </h3>

                    <span
                      className={`transition-transform duration-500 ease-in-out ${
                        open === i ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                        />
                      </svg>
                    </span>
                  </div>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      open === i
                        ? "grid-rows-[1fr] mt-4"
                        : "grid-rows-[0fr] mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`transform transition-transform duration-500 ease-in-out ${
                          open === i ? "translate-y-0" : "-translate-y-2"
                        }`}
                      >
                        <p className="max-w-xs text-sm leading-7 text-black/80">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[30%]">
            <div className="relative h-[360px] w-full overflow-hidden md:h-[550px]">
              <Image
                src={aboutTeamImg}
                alt="Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto flex flex-col gap-10 px-6 py-8 md:flex-row md:items-start md:justify-center md:gap-12 md:px-12 md:py-6">
          <div className="max-w-2xl">
            <h3 className="font-relink-headline text-4xl leading-tight md:text-6xl md:leading-17">
              We service across industries, and borders.
            </h3>
          </div>

          <div className="max-w-md">
            <p className="font-relink-neue text-[16px] leading-8">
              With agency homes in Canberra and Sydney we feel we've been pretty
              fortunate to not only work nationally, but also internationally as
              part of our ongoing partnerships with clients that have provided
              us the trust and opportunity. We've been given the space to flex
              our creativity and expertise across worlds through government,
              corporate, finance, and the music and entertainment industries.
            </p>
          </div>
        </div>


      </section>
      
        {/* <AnimatedContinuousSection
        panels={[
          {
            image: carousel1,
            heading: "Bussiness Growth",
            label: "Growth, always. ",
          },
          {
            image: carousel2,
            heading: "Strategy meets creativity",
            label: "We plan & execute..",
          },
          {
            image: carousel3,
            heading: "Culture-led, always.",
            label: "Our identity + growth",
          },
          {
            image: carousel4,
            heading: "Reaching right audience.",
            label: "We deliver 100%",
          },
        ]}
      /> */}
      <FlipSection/>

              {/* Blog List Section */}
        <BlogList articles={articles} />
    </>
  );
}