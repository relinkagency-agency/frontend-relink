/** @format */
import { getProjects, getServices } from "@/lib/strapi";
import Hero from "@/features/work/ui/hero";
import ProjectsFilterable from "@/features/work/ui/projects-filterable";
import { Suspense } from "react";

export default async function ProjectsPage() {
    const [projectsRes, servicesRes] = await Promise.all([
        getProjects({ limit: 100 }),
        getServices(),
    ]);

    return (
        <main className="bg-[#0B0D13] min-h-screen">
            <Hero />
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><p className="text-white/20">Loading Projects...</p></div>}>
                <ProjectsFilterable
                    projects={projectsRes.data || []}
                    services={servicesRes.data || []}
                />
            </Suspense>
        </main>
    );
}

export const metadata = {
    title: "Our Projects | Relink Agency",
    description: "Explore our recent work in branding, culture, and creative strategy.",
};
