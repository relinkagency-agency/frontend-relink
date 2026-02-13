import { Suspense } from "react";
import Hero from "@/features/home/ui/hero";
import Overview from "@/features/home/ui/brandoverview";
import Faq from "@/shared/layouts/faq";
import heroBg from "../../public/sales.jpg";
import Image from "next/image";
import web07 from "../../public/web07.jpg";
import {
    ProjectsContainer
} from "@/features/home/ui/containers";
import StaticServices from "@/features/home/ui/static-services";
import {
    ServicesSkeleton,
    ProjectsSkeleton
} from "@/features/home/ui/skeletons";

export default function DevelopmentPage() {
    return (
        <>
            <Hero
                image={heroBg}
                title={
                    <>
                        Scalable, high-performance
                        <br />
                        web development
                    </>
                }
                subtitle={
                    <div className="flex flex-col gap-2 font-relink-neue ">
                        <p className="text-xs tracking-wide leading-4 font-medium">
                            Next.js • React • Node.js
                        </p>
                    </div>
                }
            />
            <Overview
                title={
                    <>
                        We build robust
                        <br />
                        digital infrastructure
                        <br />
                        for modern brands.
                    </>
                }
                description="From complex web applications to seamless e-commerce experiences, our development team engineers solutions that are fast, secure, and scalable."
            />

            <StaticServices category="development" />

            <div className="py-20 md:py-40 flex flex-col md:flex-row justify-center items-start gap-12 max-w-7xl mx-auto px-8">
                <div className="w-full md:w-1/2">
                    <Faq
                        className="p-0 md:p-0"
                        title=""
                        subtitle="Questions about our process."
                        bodyClassName="text-black"
                        items={[
                            {
                                title: "01 - What tech stack do you use?",
                                body: "We primarily work with Next.js, React, Node.js, and modern headless CMS solutions like Strapi."
                            },
                            {
                                title: "02 - Do you build mobile apps?",
                                body: "Yes, we build cross-platform mobile applications using React Native and other modern frameworks."
                            },
                            {
                                title: "03 - How do you ensure performance?",
                                body: "Performance is baked into our process from the start, utilizing server-side rendering, image optimization, and efficient code practices."
                            },
                            {
                                title: "04 - How do you ensure performance?",
                                body: "Performance is baked into our process from the start, utilizing server-side rendering, image optimization, and efficient code practices."
                            },
                            {
                                title: "05 - How do you ensure performance?",
                                body: "Performance is baked into our process from the start, utilizing server-side rendering, image optimization, and efficient code practices."
                            }
                        ]}
                    />
                </div>

                <div className="w-full md:w-1/2 flex justify-center">
                    <Image
                        src={web07}
                        alt="Development Process"
                        className="object-cover w-full h-auto max-w-[500px]"
                    />
                </div>
            </div>

            <Suspense fallback={<ProjectsSkeleton />}>
                <ProjectsContainer serviceSlug="development" />
            </Suspense>


        </>
    );
}
