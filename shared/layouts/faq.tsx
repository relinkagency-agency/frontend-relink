"use client";
import { useState } from "react";

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

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="w-full px-4 md:px-22 md:pb-14 pb-18">
      <div className="flex flex-col md:gap-4 gap-2">
        <h2 className="uppercase font-relink-neue">Frequently Asked Questions</h2>
        <h2 className="font-relink-headline mb-2 md:mb-8 md:text-6xl text-5xl leading-tight tracking-tight md:text-7xl md:leading-17">
          Get to know more about us.
        </h2>
      </div>

      <div className="space-y-8 mt-4">
        {faq.map((item, i) => (
          <div key={i}>
            <div
              onClick={() => setOpen(open === i ? null : i)}
              className="flex max-w-[800px] cursor-pointer items-center justify-between gap-12 group"
            >
              <h3 className="font-relink-neue text-lg font-light md:text-2xl transition-transform duration-400 group-hover:translate-x-2">
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
                open === i ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr] mt-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`transform transition-transform duration-500 ease-in-out ${
                    open === i ? "translate-y-0" : "-translate-y-2"
                  }`}
                >
                  <p className="max-w-xl text-lg leading-7 text-black/80 ">
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
