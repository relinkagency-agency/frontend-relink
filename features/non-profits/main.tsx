"use client";

import { useState } from "react";
import Image from "next/image";
import aboutImg from "../../public/relink-MK-5.jpg";
import aboutTeamImg from "../../public/about-team.jpg";
import FlipSection from "@/shared/ui/gsap/flipSection";

const whatWeBuild = [
    "Custom web applications",
    "Mobile applications",
    "Internal tools & dashboards",
    "Automation systems",
    "AI-powered workflows",
    "Website platforms",
];

const whoThisIsFor = [
    {
        title: "Officially registered as a nonprofit or NGO",
        body: "We work with legally recognized nonprofits and non-governmental organizations operating in any sector or region.",
    },
    {
        title: "Have a clear mission and active operations",
        body: "Your organization should have defined goals and be actively running programs — not just in planning stages.",
    },
    {
        title: "Can demonstrate real-world impact or ongoing programs",
        body: "We prioritize organizations where technology can meaningfully improve reach, efficiency, or service delivery.",
    },
    {
        title: "Have a defined project scope or operational need",
        body: "You should be able to articulate what you need built — even at a high level. We'll help you refine it during discovery.",
    },
];

const eligibilityRequirements = [
    "Proof of nonprofit registration",
    "Organizational overview (mission, activities, impact)",
    "Primary point of contact",
    "Project brief or problem statement",
];

const steps = [
    { num: "01", title: "Apply", body: "Submit your organization details and project request." },
    { num: "02", title: "Review", body: "We evaluate eligibility and alignment." },
    { num: "03", title: "Discovery", body: "We run a structured session to understand your needs." },
    { num: "04", title: "Proposal", body: "You receive a clear scope, timeline, and reduced pricing." },
    { num: "05", title: "Build & Launch", body: "We design, build, and deploy your solution." },
];

// const importantNotes = [
//     "Discounts are applied based on project scope and alignment",
//     "Not all applications are accepted",
//     "Ongoing support is billed separately",
//     "We reserve the right to define project timelines and scope",
// ];

export default function Main() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <>
            {/* Intro */}
            <section className="bg-amber-50 py-16 md:pt-24 pt-8">
                <div className="mx-auto flex flex-col gap-10 px-6 py-4 md:max-w-7xl md:flex-row md:items-center md:gap-18">
                    <div className="w-full md:w-1/2">
                        <h2 className="font-relink-headline text-3xl leading-tight md:text-6xl md:leading-17">
                            Create Real Impact.
                            <br />
                            Support &amp; Growth
                        </h2>
                    </div>
                    <div className="flex w-full flex-col gap-4 font-relink-neue text-[16px] leading-8 md:w-1/2 md:max-w-xl">

                        <p>
                            We partner with nonprofits and mission-driven organizations to design and build digital products that create real impact.
                        </p>
                        <p>From internal tools to full-scale platforms, we support organizations doing meaningful work by making technology more accessible.</p>
                    </div>
                </div>

                <div className="mx-auto mt-10 w-full px-6 md:mt-16 md:w-[1250px] md:px-0">
                    <div className="relative h-[300px] w-full overflow-hidden md:h-[700px]">
                        <Image
                            src={aboutImg}
                            alt="Relink for nonprofits"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 1250px"
                        />
                    </div>
                </div>
            </section>

            {/* Our Commitment */}
            <section className="bg-amber-50">
                <div className="mx-auto flex flex-col gap-12 px-6 py-0 md:flex-row md:items-start md:justify-center md:gap-32 md:px-0 md:py-8">
                    <div className="w-full md:w-[40%]">
                        <h2 className="font-relink-headline mb-6 text-4xl leading-tight tracking-tight md:text-6xl md:leading-17">
                            Our Commitment
                        </h2>
                        <p className="font-relink-neue text-[16px] leading-8 mb-4">
                            We offer <span className="font-semibold">up to 20% reduced project pricing</span> for qualified nonprofit organizations.
                        </p>
                        <p className="font-relink-neue text-[16px] leading-8 text-black/70">
                            A structured partnership designed to support organizations that need strong technical execution but operate with constrained budgets.
                            We provide post-launch support and IT maintenance through structured plans.
                            Every solution is tailored to your operations, not forced into templates.
                        </p>
                        <p className="font-relink-neue text-[16px] leading-8 mt-6 text-black/70">If your organization is building something meaningful and needs a strong technical partner, we&apos;d like to work with you.</p>


                    </div>

                    <div className="w-full md:w-[30%]">
                        <div className="relative h-[360px] w-full overflow-hidden md:h-[550px]">
                            <Image
                                src={aboutTeamImg}
                                alt="Our team"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 420px"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Build + Who This Is For */}
            {/* <section className="bg-amber-50 border-t border-black/10">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 px-6 md:px-0 md:max-w-6xl py-16 md:py-28 gap-16">
          <div>
            <h2 className="font-relink-headline text-4xl leading-tight md:text-5xl mb-8">
              What We Build
            </h2>
            <p className="font-relink-neue text-[16px] leading-8 text-black/70 mb-8">
              We support nonprofits across a range of digital needs. Every solution is tailored to your operations, not forced into templates.
            </p>
            <ul className="space-y-4">
              {whatWeBuild.map((item) => (
                <li key={item} className="flex items-center gap-3 font-relink-neue text-[16px] leading-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-relink-headline text-4xl leading-tight md:text-5xl mb-8">
              Who This Is For
            </h2>
            <p className="font-relink-neue text-[16px] leading-8 text-black/70 mb-8">
              We prioritize organizations where technology can significantly improve reach, efficiency, or delivery. We work with organizations that:
            </p>
            <ul className="space-y-4">
              {whoThisIsFor.map((item) => (
                <li key={item} className="flex items-start gap-3 font-relink-neue text-[16px] leading-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section> */}

            {/* Eligibility */}
            <section className="bg-amber-50">
                <div className="mx-auto px-6 md:px-0 md:max-w-6xl py-16 md:py-20">
                    <div className="flex flex-col gap-10 md:flex-row md:gap-24">
                        <div className="md:w-1/2">
                            <h2 className="font-relink-headline text-4xl leading-tight md:text-5xl mb-6">
                                What We Build
                            </h2>

                            <div>
                                <div className="">
                                    <h4 className=" text-lg md:text-lg mb-4"><span className="text-black/40">01 /</span> Custom web applications</h4>
                                    <h4 className=" text-lg md:text-lg mb-4"><span className="text-black/40">02 /</span> Mobile applications</h4>
                                    <h4 className=" text-lg md:text-lg mb-4"><span className="text-black/40">03 /</span> Automation systems</h4>
                                    <h4 className=" text-lg md:text-lg mb-4"><span className="text-black/40">04 /</span> AI-powered workflows</h4>
                                    <h4 className=" text-lg md:text-lg mb-4"><span className="text-black/40">05 /</span> Website platforms</h4>

                                </div>
                            </div>

                        </div>

                        <div className="space-y-0 md:w-1/2">
                            <h2 className="font-relink-headline text-4xl leading-tight md:text-5xl md:mb-6 mb-0">
                                Who This Is For
                            </h2>
                            {whoThisIsFor.map((item, i) => (
                                <div key={i}>
                                    <div
                                        onClick={() => setOpen(open === i ? null : i)}
                                        className="flex cursor-pointer items-center justify-between gap-4 py-4 group"
                                    >
                                        <h3 className="font-relink-neue text-[16px] font-medium leading-7 transition-transform duration-300 group-hover:translate-x-1">
                                            {item.title}
                                        </h3>
                                        <span className={`transition-transform duration-500 ease-in-out flex-shrink-0 ${open === i ? "rotate-180" : "rotate-0"}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className={`grid transition-all duration-500 ease-in-out ${open === i ? "grid-rows-[1fr] mb-4" : "grid-rows-[0fr] mb-0"}`}>
                                        <div className="overflow-hidden">
                                            <div className={`transform transition-transform duration-500 ease-in-out ${open === i ? "translate-y-0" : "-translate-y-2"}`}>
                                                <p className="font-relink-neue text-[14px] leading-7 text-black/60 max-w-sm">{item.body}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* <div className="md:w-1/2 space-y-10">
                <h2 className="font-relink-headline text-4xl leading-tight md:text-5xl mb-6">
                What We Offer
              </h2>
              <p className="font-relink-neue text-[16px] leading-8 text-black/70 mb-8">
                We support nonprofits across a range of digital needs. Every solution is tailored to your operations, not forced into templates.
              </p>
              <div className="space-y-4">
                <div>
                <p className="font-relink-neue text-[16px] leading-8 mb-3">Reduced Project Pricing</p>
                <p className="font-relink-neue text-[16px] leading-8 mb-3">Strategic Product Guidance</p>
                <p className="font-relink-neue text-[16px] leading-8 mb-3">Ongoing Support </p>
                
              </div>
              </div>
            </div> */}
                    </div>
                </div>
            </section>

            {/* What We Ask */}
            {/* <section className="bg-amber-50 border-t border-black/10">
        <div className="mx-auto px-6 md:px-0 md:max-w-6xl py-16 md:py-28">
          <h2 className="font-relink-headline text-4xl leading-tight md:text-5xl mb-6">
            What We Ask In Return
          </h2>
          <p className="font-relink-neue text-[16px] leading-8 text-black/70 max-w-2xl mb-8">
            We see this as a partnership, not a one-sided offer. Depending on the project, we may request:
          </p>
          <ul className="space-y-4 max-w-2xl">
            <li className="flex items-start gap-3 font-relink-neue text-[16px] leading-8">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-3" />
              Permission to feature the project as a case study
            </li>
            <li className="flex items-start gap-3 font-relink-neue text-[16px] leading-8">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-3" />
              Acknowledgment as a technology partner or supporter
            </li>
            <li className="flex items-start gap-3 font-relink-neue text-[16px] leading-8">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-3" />
              Use of the project in our portfolio or marketing
            </li>
          </ul>
          <p className="font-relink-neue text-[15px] leading-8 text-black/60 mt-8 max-w-xl">
            This helps us continue supporting other organizations over time.
          </p>
        </div>
      </section> */}

            {/* How It Works */}
            <section className="bg-amber-50">
                <div className="mx-auto px-6 md:px-0 md:max-w-6xl py-4 md:py-8">
                    <h2 className="font-relink-headline text-4xl leading-tight md:text-5xl mb-14">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
                        {steps.map((step) => (
                            <div key={step.num} className="flex flex-col gap-3">
                                <span className="font-relink-headline text-5xl text-black/15">{step.num}</span>
                                <h3 className="font-relink-headline text-xl md:text-2xl">{step.title}</h3>
                                <p className="font-relink-neue text-[15px] leading-7 text-black/70">{step.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Apply CTA */}
            <section id="apply" className="bg-amber-50">
                <div className="mx-auto px-6 md:px-0 md:max-w-6xl py-12 md:py-8 flex items-center justify-center">
                    {/* <div className="max-w-2xl">
            <h2 className="font-relink-headline text-4xl leading-tight md:text-6xl md:leading-17 mb-6">
              Apply to Work With Us
            </h2>
            <p className="font-relink-neue text-[16px] leading-8 text-black/70">
              If your organization is building something meaningful and needs a strong technical partner, we&apos;d like to hear from you. Submit your request and we&apos;ll take it from there.
            </p>
          </div> */}
                    <div className="mb-4 md:mb-0">
                        <a
                            href="/contact"
                            className="inline-block font-relink-neue font-medium text-[15px] bg-black text-amber-50 px-8 py-4 hover:bg-black/80 transition-colors duration-300"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </section>

            <FlipSection />
        </>
    );
}