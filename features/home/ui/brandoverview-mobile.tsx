/** @format */
import React from "react";
import Image from "next/image";
import img from "../../../public/overview.jpg";

export default function MobileOverview() {
    return (
        <section className="relative z-10 w-full bg-[#1f2937] flex flex-col-reverse">
            <div className="relative w-full h-[450px] overflow-hidden">
                <Image
                    src={img}
                    alt="Relink Brand Overview"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            <div className="w-full bg-relink-purple-dark flex flex-col justify-center px-8 py-24 overflow-hidden">
                <div className="max-w-xl">
                    <h2 className="text-4xl font-light leading-tight text-white mb-6">
                        We&apos;re here to create work
                        <br />
                        that earns its place in
                        <br />
                        culture.
                    </h2>

                    <div className="max-w-[500px]">
                        <p className="text-lg text-white/90 leading-relaxed">
                            We&apos;re a strategic brand and creative agency built for the
                            brands that want to ratchet up culture.
                        </p>
                    </div>

                    <a
                        href="#"
                        className="mt-10 inline-flex items-center gap-2 text-lg font-semibold border-b-2 border-white/80 pb-1 hover:gap-4 transition-all text-white w-fit"
                    >
                        See what we do <span aria-hidden>↗</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
