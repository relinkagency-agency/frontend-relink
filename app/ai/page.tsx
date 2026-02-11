import { Suspense } from "react";
import Hero from "@/features/home/ui/hero";
import Overview from "@/features/home/ui/brandoverview";
import Faq from "@/shared/layouts/faq";
import Image from "next/image";
import web07 from "../../public/web07.jpg";
import heroImage from "../../public/bg-new-2.jpg";
import {
    ProjectsContainer
} from "@/features/home/ui/containers";
import StaticServices from "@/features/home/ui/static-services";
import {
    ServicesSkeleton,
    ProjectsSkeleton
} from "@/features/home/ui/skeletons";

export default function AiPage() {
    return (
        <>
            <Hero
                title={
                    <>
                        Intelligent automation
                        <br />
                        for the future
                    </>
                }
                image={heroImage}
                subtitle={
                    <div className="flex flex-col gap-2 font-relink-neue ">
                        <p className="text-xs tracking-wide leading-4 font-medium">
                            LLMs • Automation • AI Integration
                        </p>
                    </div>
                }
            />
            <Overview
                title={
                    <>
                        Harnessing the power
                        <br />
                        of artificial
                        <br />
                        intelligence.
                    </>
                }
                description="We integrate cutting-edge AI solutions to streamline operations, enhance user experiences, and unlock new opportunities for innovation."
            />

            <Suspense fallback={<ServicesSkeleton />}>
                <StaticServices category="ai" />
            </Suspense>

            <div className="py-20 md:py-40 flex flex-col md:flex-row justify-center items-start gap-12 max-w-7xl mx-auto px-8">
                <div className="w-full md:w-1/2">
                    <Faq
                        className="p-0 md:p-0"
                        bodyClassName="text-black"
                        title="AI FAQ"
                        subtitle="Understanding our AI capabilities."
                        items={[
                            {
                                title: "How can AI help my business?",
                                body: "AI can automate repetitive tasks, analyze large datasets for insights, and create personalized experiences for your customers."
                            },
                            {
                                title: "Is it secure?",
                                body: "We prioritize security and data privacy in all our AI integrations, ensuring compliance with industry standards."
                            },
                            {
                                title: "What AI models do you use?",
                                body: "We work with leading models like GPT-4, Claude, and open-source alternatives, selecting the best fit for your specific use case."
                            }
                        ]}
                    />
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                    {/* Placeholder image - user should replace */}
                    <Image
                        src={web07}
                        alt="AI Solutions"
                        className="object-cover w-full h-auto max-w-[500px]"
                    />
                </div>
            </div>

            <Suspense fallback={<ProjectsSkeleton />}>
                <ProjectsContainer serviceSlug="brand" />
            </Suspense>


        </>
    );
}
