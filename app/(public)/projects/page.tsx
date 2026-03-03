import { getProjects } from "@/lib/actions/projects";
import { getServices } from "@/lib/actions/services";
import { mapDrizzleProject, mapDrizzleService } from "@/lib/db/mappers";
import Hero from "@/features/work/ui/hero";
import ProjectsFilterable from "@/features/work/ui/projects-filterable";
import { Suspense } from "react";
import Link from "next/link";

export default async function ProjectsPage() {
    const [projectsRes, servicesRes] = await Promise.all([
        getProjects(),
        getServices(),
    ]);

    const projects = (projectsRes.data || []).map(mapDrizzleProject);
    const services = (servicesRes.data || []).map(mapDrizzleService);

    return (
        <main className="bg-[#0B0D13] min-h-screen">
            <Hero />
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><p className="text-white/20">Loading Projects...</p></div>}>
                <ProjectsFilterable
                    projects={projects}
                    services={services}
                />
            </Suspense>

            <section className="py-40 px-8 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-[#0B0D13]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_400px_at_50%_100%,rgba(255,255,255,0.03),transparent_60%)]" />

                <div className="relative max-w-7xl mx-auto text-center">
                    <h2 className="text-white/30 uppercase tracking-[0.4em] font-bold text-[10px] mb-12">Ready to start?</h2>
                    <div className="mb-16">
                        <span className="block text-5xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight leading-[0.8] mb-4">
                            Have a vision?
                        </span>
                        <span className="block text-5xl md:text-8xl lg:text-9xl font-serif text-white/90 tracking-tight leading-[0.8]">
                            Let's build it.
                        </span>
                    </div>
                    <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-6 group transition-all"
                    >
                        <span className="text-white/80 text-sm md:text-base font-bold tracking-[0.3em] uppercase border-b border-white/10 pb-2 group-hover:border-white/40 group-hover:text-white transition-all">
                            Start a Conversation
                        </span>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white text-xl group-hover:bg-white group-hover:text-black transition-all transform group-hover:rotate-[-45deg]">
                            →
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export const metadata = {
    title: "Our Projects",
    description: "Explore our recent work in branding, culture, and creative strategy.",
};
