/** @format */

import Link from "next/link";
import { Plus, Search, Briefcase } from "lucide-react";
import { getProjects } from "@/lib/actions/projects";
import { ProjectThumbnail } from "@/features/admin/ui/project-thumbnail";
import { ProjectActions } from "@/features/admin/ui/project-actions";

export default async function AdminProjectsPage() {
    const result = await getProjects();
    const projects = result.data || [];

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                        Projects
                    </h1>
                    <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2">
                        Manage your works, case studies and portfolio.
                    </p>
                </div>

                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 px-6 py-3 bg-amber-50 text-[#0B0D13] rounded-none text-xs font-bold hover:bg-white transition-all duration-300 font-[family-name:var(--font-relink-neue)] uppercase tracking-widest shadow-xl"
                >
                    <Plus className="w-4 h-4" />
                    Add New Project
                </Link>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-white/20" />
                </div>
                <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-12 pr-4 py-4 rounded-none bg-white/5 border border-white/5 focus:border-amber-50/40 focus:ring-1 focus:ring-amber-50/40 text-white placeholder:text-white/20 outline-none transition-all font-[family-name:var(--font-relink-neue)] text-sm"
                />
            </div>

            <div className="rounded-none bg-white/[0.02] border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium font-[family-name:var(--font-relink-neue)]">
                            <th className="px-8 py-6">Project</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6">Year</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {projects.map((project: any) => (
                            <tr key={project.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <ProjectThumbnail
                                            publicId={project.thumbnail?.publicId}
                                            title={project.title}
                                        />
                                        <div>
                                            <div className="text-sm font-semibold text-white/90 font-[family-name:var(--font-relink-neue)] tracking-tight">
                                                {project.title}
                                            </div>
                                            <div className="text-[11px] text-white/40 mt-1 font-[family-name:var(--font-relink-neue)]">
                                                {project.clientName || 'Agency Partner'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    {project.isFeatured ? (
                                        <span className="inline-flex items-center px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider bg-amber-50/10 text-amber-50 border border-amber-50/20">
                                            Featured
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/40 border border-white/10">
                                            Standard
                                        </span>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-sm text-white/60 font-[family-name:var(--font-relink-neue)]">
                                    {project.year || "2024"}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <ProjectActions id={project.id} liveUrl={project.liveUrl} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {projects.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="p-4 rounded-none bg-white/5 w-fit mx-auto mb-4 border border-white/5">
                            <Briefcase className="w-6 h-6 text-white/20" />
                        </div>
                        <p className="text-white/40 text-sm font-[family-name:var(--font-relink-neue)]">
                            No projects found. Add your first masterpiece.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
