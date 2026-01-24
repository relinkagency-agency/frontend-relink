/** @format */
import { getProjectBySlug } from "@/lib/strapi";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;

    const { success, data: project, error } = await getProjectBySlug(slug);

    if (!success || !project) {
        if (error) console.error(`Error loading project: ${error}`);
        notFound();
    }

    return (
        <main className="min-h-screen bg-relink-dark selection:bg-white selection:text-black">
            <section className="relative w-full h-[60vh] md:h-[80vh] min-h-[500px] flex items-end pb-20 px-10">
                {project.thumbnail?.url && (
                    <Image
                        src={project.thumbnail.url}
                        alt={project.thumbnail.alt || project.title}
                        fill
                        priority
                        className="object-cover opacity-60"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-relink-dark via-transparent to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <div className="mb-6 flex flex-wrap gap-3">
                        {project.services.map(s => (
                            <span key={s.id} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-white/90 border border-white/10">
                                {s.title}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight leading-[0.9]">
                        {project.title}
                    </h1>
                </div>
            </section>

            <section className="py-32 px-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                    <div className="lg:col-span-7">
                        <h2 className="text-white/30 uppercase tracking-[0.3em] font-bold text-xs mb-10">Challenge & Vision</h2>
                        <div className="text-white/90 text-2xl md:text-4xl font-light leading-snug">
                            {project.excerpt}
                        </div>

                        {project.description && (
                            <div className="mt-16 prose prose-invert prose-xl max-w-none text-white/60 font-light leading-relaxed">
                                <p>{typeof project.description === 'string' ? project.description : ''}</p>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5 space-y-16">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-white/30 uppercase tracking-[0.2em] font-bold text-[10px] mb-4">Client</h3>
                                <p className="text-white text-xl font-medium">{project.clientName || 'Confidential'}</p>
                            </div>
                            <div>
                                <h3 className="text-white/30 uppercase tracking-[0.2em] font-bold text-[10px] mb-4">Year</h3>
                                <p className="text-white text-xl font-medium">{project.year || '2024'}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white/30 uppercase tracking-[0.2em] font-bold text-[10px] mb-6">Deliverables</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.deliverables?.map((d, i) => (
                                    <div key={i} className="group relative">
                                        <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-sm text-white/80 font-light block transition-colors hover:bg-white/10">
                                            {d.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {project.liveUrl && (
                            <div>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-4 text-white font-bold tracking-widest text-sm uppercase group"
                                >
                                    Visit Live Project
                                    <span className="text-xl transition-transform group-hover:translate-x-2">↗</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>

           
            {project.gallery && project.gallery.length > 0 && (
                <section className="pb-32 px-4 md:px-10">
                    <div className="max-w-[1800px] mx-auto">
                        <div className="columns-1 md:columns-2 gap-8 space-y-8">
                            {project.gallery.map((image, i) => (
                                <div key={i} className="relative break-inside-avoid overflow-hidden bg-neutral-900 rounded-sm group">
                                    <Image
                                        src={image.url}
                                        alt={image.alt || project.title}
                                        width={1200}
                                        height={1600}
                                        className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-20 border-t border-white/10 text-center">
                <Link
                    href="/work-services"
                    className="text-white/50 hover:text-white transition-colors font-medium tracking-[0.2em] uppercase text-xs inline-flex items-center gap-4"
                >
                    <span className="text-xl">←</span> Back to all work
                </Link>
            </section>
        </main>
    );
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const { data: project } = await getProjectBySlug(slug);

    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Relink Agency`,
        description: project.excerpt || `Experience ${project.title} by Relink Agency.`,
    };
}
