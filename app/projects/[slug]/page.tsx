/** @format */
import { getProjectBySlug } from "@/lib/strapi";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const BlocksRenderer = ({ content }: { content: any }) => {
    if (!content) return null;
    if (typeof content === 'string') return <p>{content}</p>;
    if (Array.isArray(content)) {
        return content.map((block: any, i: number) => {
            if (block.type === 'paragraph') {
                return (
                    <p key={i} className="mb-6 last:mb-0">
                        {block.children?.map((c: any, ci: number) => (
                            <span key={ci} className={c.bold ? 'font-bold' : ''}>
                                {c.text}
                            </span>
                        ))}
                    </p>
                );
            }
            if (block.type === 'list') {
                const Tag = block.format === 'ordered' ? 'ol' : 'ul';
                return (
                    <Tag key={i} className={`${block.format === 'ordered' ? 'list-decimal' : 'list-disc'} list-inside mb-8 space-y-3`}>
                        {block.children?.map((li: any, lii: number) => (
                            <li key={lii} className="pl-2">
                                {li.children?.map((c: any, ci: number) => (
                                    <span key={ci} className={c.bold ? 'font-bold' : ''}>
                                        {c.text}
                                    </span>
                                ))}
                            </li>
                        ))}
                    </Tag>
                );
            }
            return null;
        });
    }
    return null;
};

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;

    const { success, data: project, error } = await getProjectBySlug(slug);

    if (!success || !project) {
        if (error) console.error(`Error loading project: ${error}`);
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0B0D13] selection:bg-white selection:text-black">
            <section className="relative w-full h-[60vh] md:h-[80vh] min-h-[500px] flex items-end pb-20 px-10">
                {(project.heroBanner?.url || project.thumbnail?.url) && (
                    <Image
                        src={project.heroBanner?.url || project.thumbnail?.url || ''}
                        alt={project.heroBanner?.alt || project.thumbnail?.alt || project.title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover opacity-60"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-transparent to-transparent" />

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

            <section className="py-32 px-10 relative">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_380px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

                <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                    <div className="lg:col-span-7">
                        {project.challenge && (
                            <div className="mb-24">
                                <h2 className="text-white/40 uppercase tracking-[0.2em] font-bold text-[11px] mb-10">Challenge & Vision</h2>
                                <div className="text-white/90 text-xl md:text-2xl font-light leading-relaxed">
                                    {project.challenge}
                                </div>
                            </div>
                        )}

                        {project.solution && (
                            <div className="mt-20">
                                <h2 className="text-white/40 uppercase tracking-[0.2em] font-bold text-[11px] mb-10">Solution</h2>
                                <div className="prose prose-invert prose-xl max-w-none text-white/60 font-light leading-relaxed">
                                    <BlocksRenderer content={project.solution} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5 space-y-16 pt-2">
                        <div className="grid grid-cols-2 gap-8 border-b border-white/5 pb-10">
                            <div>
                                <h3 className="text-white/40 uppercase tracking-[0.15em] font-bold text-[11px] mb-4">Client</h3>
                                <p className="text-white text-xl font-medium">{project.clientName || 'Confidential'}</p>
                            </div>
                            <div>
                                <h3 className="text-white/40 uppercase tracking-[0.15em] font-bold text-[11px] mb-4">Date</h3>
                                <p className="text-white text-xl font-medium">{project.year || '2024'}</p>
                            </div>
                        </div>

                        {project.deliverables && project.deliverables.length > 0 && (
                            <div>
                                <h3 className="text-white/40 uppercase tracking-[0.15em] font-bold text-[11px] mb-10">Deliverables</h3>
                                <div className="space-y-10">
                                    {project.deliverables?.map((d, i) => (
                                        <div key={i} className="group">
                                            <div className="flex items-start gap-4">
                                                <div className="h-px w-6 bg-white/20 mt-3 group-hover:w-10 group-hover:bg-amber-50 transition-all duration-500" />
                                                <div>
                                                    <h4 className="text-white text-lg font-medium mb-2">{d.label}</h4>
                                                    {d.details && (
                                                        <p className="text-white/40 text-sm font-light max-w-md leading-relaxed">
                                                            {d.details}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.liveUrl && (
                            <div>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-4 bg-amber-50 px-8 py-4 text-black font-bold tracking-widest text-xs uppercase transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Visit Live Project
                                    <span className="text-xl">↗</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>


            {project.gallery && project.gallery.length > 0 && (
                <section className="pb-32 px-4 md:px-10">
                    <div className="max-w-[1800px] mx-auto">
                        <div className="px-6 mb-16">
                            <h2 className="text-white/40 uppercase tracking-[0.2em] font-bold text-[11px]">Project Imagery</h2>
                        </div>
                        <div className="columns-1 md:columns-2 gap-8 space-y-8">
                            {project.gallery.map((image, i) => (
                                <div key={i} className="relative break-inside-avoid overflow-hidden bg-neutral-900 rounded-sm group">
                                    <Image
                                        src={image.url}
                                        alt={image.alt || project.title}
                                        width={1200}
                                        height={1600}
                                        sizes="(max-width: 768px) 100vw, 50vw"
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
                    href="/projects"
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
