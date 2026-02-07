import React from "react";

const services = [
    {
        category: "Engineering & Development",
        items: [
            {
                title: "Web Applications",
                description:
                    "Scalable, fast, and SEO-optimized web apps using Next.js and React.",
            },
            {
                title: "Mobile Development",
                description:
                    "Native and cross-platform mobile apps for iOS and Android.",
            },
            {
                title: "Custom Software",
                description:
                    "Bespoke solutions tailored to your specific operational needs.",
            },
        ],
    },
    {
        category: "AI & Automation",
        items: [
            {
                title: "Workflow Automation",
                description:
                    "Streamline repetitive tasks and reduce operational costs.",
            },
            {
                title: "AI Integration",
                description:
                    "Implement LLMs and intelligent agents into your existing products.",
            },
            {
                title: "Data Analysis",
                description:
                    "Turn raw data into actionable insights for better decision-making.",
            },
        ],
    },
    {
        category: "Strategic Growth",
        items: [
            {
                title: "Product Strategy",
                description: "Defining the roadmap from MVP to market leader.",
            },
            {
                title: "Growth Marketing",
                description: "Data-driven campaigns to acquire and retain users.",
            },
            {
                title: "UX/UI Design",
                description: "Creating intuitive interfaces that convert.",
            },
        ],
    },
];

export default function Services() {
    return (
        <section className="w-full  py-24 px-6 md:px-12 text-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-20">
                    {services.map((section, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row gap-10 md:gap-20 border-t border-black/10 pt-16 first:border-0 first:pt-0"
                        >
                            <div className="md:w-1/3">
                                <h2 className="font-relink-headline text-3xl md:text-4xl">
                                    {section.category}
                                </h2>
                            </div>
                            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                                {section.items.map((item, i) => (
                                    <div key={i} className="flex flex-col gap-3">
                                        <h3 className="font-relink-neue font-bold text-xl">
                                            {item.title}
                                        </h3>
                                        <p className="font-relink-neue text-black/70 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-32 border-t border-black pt-16 flex flex-col items-center text-center gap-8">
                    <h2 className="font-relink-headline text-4xl md:text-6xl">
                        Ready to upgrade your tech stack?
                    </h2>
                    <a
                        href="/contact-us"
                        className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-relink-neue font-medium hover:bg-black/80 transition-colors"
                    >
                        Talk to an expert
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
