/** @format */

import Link from "next/link";
import { Plus, Search, MoreHorizontal, Edit, Trash2, ExternalLink, Briefcase } from "lucide-react";
import { getProjects } from "@/lib/actions/projects";

export default async function AdminProjectsPage() {
    const result = await getProjects();
    const projects = result.data || [];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                    className="flex items-center gap-2 px-6 py-3 bg-relink-purple-base text-white rounded-full text-sm font-medium hover:bg-relink-purple-deep transition-all duration-300 font-[family-name:var(--font-relink-neue)]"
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
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-relink-purple-base/40 focus:ring-1 focus:ring-relink-purple-base/40 text-white placeholder:text-white/20 outline-none transition-all font-[family-name:var(--font-relink-neue)] text-sm"
                />
            </div>

            <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden">
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
                                        <div className="w-16 h-12 rounded-xl bg-white/5 overflow-hidden border border-white/5 flex items-center justify-center text-white/10 font-bold uppercase transition-colors group-hover:bg-white/10">
                                            {project.title.charAt(0)}
                                        </div>
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
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-relink-purple-base/10 text-relink-purple-base border border-relink-purple-base/20">
                                            Featured
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/40 border border-white/10">
                                            Standard
                                        </span>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-sm text-white/60 font-[family-name:var(--font-relink-neue)]">
                                    {project.year || "2024"}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/projects/${project.id}`}
                                            className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {projects.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="p-4 rounded-full bg-white/5 w-fit mx-auto mb-4 border border-white/5">
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
