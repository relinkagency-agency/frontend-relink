import { Suspense } from "react";
import Hero from "@/features/home/ui/hero";
import Overview from "@/features/home/ui/brandoverview";
import Faq from "@/shared/layouts/faq";
import Image from "next/image";
import growth from "../../public/growth.jpg";
import heroImage from "../../public/idea.jpg";
import {
    ProjectsContainer
} from "@/features/home/ui/containers";
import StaticServices from "@/features/home/ui/static-services";
import {
    ServicesSkeleton,
    ProjectsSkeleton
} from "@/features/home/ui/skeletons";

export default function MarketingPage() {
    return (
        <>
            <Hero
                title={
                    <>
                        Data-driven strategies
                        <br />
                        for real growth
                    </>
                }
                image={heroImage}
                subtitle={
                    <div className="flex flex-col gap-2 font-relink-neue ">
                        <p className="text-xs tracking-wide leading-4 font-medium">
                            SEO • PPC • Content Strategy
                        </p>
                    </div>
                }
            />
            <Overview
                title={
                    <>
                        Connecting brands
                        <br />
                        with their ideal
                        <br />
                        audience.
                    </>
                }
                description="We craft marketing campaigns that resonate with your audience and drive measurable results, combining creativity with data analytics."
            />

            <Suspense fallback={<ServicesSkeleton />}>
                <StaticServices category="marketing" />
            </Suspense>

            <div className="py-20 md:py-40 flex flex-col md:flex-row justify-center items-start gap-12 max-w-7xl mx-auto px-8">
                <div className="w-full md:w-1/2">
                    <Faq
                        className="p-0 md:p-0"
                        title="Marketing FAQ"
                        subtitle="Questions about our marketing services."
                        bodyClassName="text-black"
                        items={[
                            {
                                title: "01 - What channels do you focus on?",
                                body: "We tailor our approach to your business, utilizing a mix of SEO, PPC, social media, and email marketing."
                            },
                            {
                                title: "02 - How do you measure success?",
                                body: "We focus on key performance indicators (KPIs) that matter to your bottom line, such as conversion rates and ROI."
                            },
                            {
                                title: "03 - Do you offer branding services?",
                                body: "Yes, we help define your brand voice, visual identity, and positioning to ensure consistency across all channels."
                            },
                            {
                                title: "04 - Do you offer branding services?",
                                body: "Yes, we help define your brand voice, visual identity, and positioning to ensure consistency across all channels."
                            },
                            {
                                title: "05 - Do you offer branding services?",
                                body: "Yes, we help define your brand voice, visual identity, and positioning to ensure consistency across all channels."
                            }
                        ]}
                    />
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                    <Image
                        src={growth}
                        alt="Marketing Growth"
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
