/** @format */

import { getProjects } from "@/lib/actions/projects";
import { getServices } from "@/lib/actions/services";
import { getArticles } from "@/lib/actions/articles";
import {
  Briefcase,
  Settings,
  FileText,
  ArrowUpRight,
  Plus,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [projectsResult, servicesResult, articlesResult] = await Promise.all([
    getProjects(),
    getServices(),
    getArticles()
  ]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
Admin          </h1>
          <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2 italic">
            Welcome back. 
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-6 py-3 bg-amber-50 text-[#0B0D13] rounded-none text-xs font-bold hover:bg-white transition-all duration-300 font-[family-name:var(--font-relink-neue)] uppercase tracking-widest shadow-xl"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/projects"
          className="group p-8 rounded-none bg-white/[0.02] border border-white/5 hover:border-amber-50/20 transition-all duration-500 relative"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 rounded-none bg-white/5 border border-white/10 group-hover:border-amber-50/20 transition-colors">
                <Briefcase className="w-5 h-5 text-amber-50/60" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/10 group-hover:text-amber-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold text-white font-[family-name:var(--font-relink-fine)] tracking-tight">
                {projectsResult.data?.length || 0}
              </div>
              <div className="text-[10px] font-bold text-white/40 font-[family-name:var(--font-relink-neue)] uppercase tracking-[0.3em]">
                Projects
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/services"
          className="group p-8 rounded-none bg-white/[0.02] border border-white/5 hover:border-amber-50/20 transition-all duration-500 relative"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 rounded-none bg-white/5 border border-white/10 group-hover:border-amber-50/20 transition-colors">
                <Settings className="w-5 h-5 text-amber-50/60" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/10 group-hover:text-amber-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold text-white font-[family-name:var(--font-relink-fine)] tracking-tight">
                {servicesResult.data?.length || 0}
              </div>
              <div className="text-[10px] font-bold text-white/40 font-[family-name:var(--font-relink-neue)] uppercase tracking-[0.3em]">
                Services
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/articles"
          className="group p-8 rounded-none bg-white/[0.02] border border-white/5 hover:border-amber-50/20 transition-all duration-500 relative"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 rounded-none bg-white/5 border border-white/10 group-hover:border-amber-50/20 transition-colors">
                <FileText className="w-5 h-5 text-amber-50/60" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/10 group-hover:text-amber-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold text-white font-[family-name:var(--font-relink-fine)] tracking-tight">
                {articlesResult.data?.length || 0}
              </div>
              <div className="text-[10px] font-bold text-white/40 font-[family-name:var(--font-relink-neue)] uppercase tracking-[0.3em]">
                Articles
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="p-8 rounded-none bg-white/[0.01] border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white italic tracking-wide">
              Recent Works
            </h2>
            <Link href="/admin/projects" className="text-[10px] text-amber-50/60 hover:text-amber-50 font-bold uppercase tracking-widest font-[family-name:var(--font-relink-neue)] transition-colors">
              Explores All
            </Link>
          </div>

          <div className="space-y-3">
            {projectsResult.data?.slice(0, 4).map((project: any) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-5 rounded-none bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-none bg-white/5 overflow-hidden flex items-center justify-center text-white/20 group-hover:text-white/40 transition-colors capitalize font-bold">
                    {project.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/90 font-[family-name:var(--font-relink-neue)] uppercase tracking-wider">
                      {project.title}
                    </h3>
                    <p className="text-[10px] text-white/40 uppercase font-medium mt-1">
                      {project.year || "2024"} — {project.clientName || 'Agency'}
                    </p>
                  </div>
                </div>
                <Link href={`/admin/projects/${project.id}`} className="p-2 rounded-full hover:bg-white/10 text-white/20 hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
            {(!projectsResult.data || projectsResult.data.length === 0) && (
              <div className="py-12 text-center text-white/20 text-sm font-[family-name:var(--font-relink-neue)] italic">
                No projects yet. Start by creating one.
              </div>
            )}
          </div>
        </section>

        <section className="p-8 rounded-none bg-white/[0.01] border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white italic tracking-wide">
              Latest News
            </h2>
            <Link href="/admin/articles" className="text-[10px] text-amber-50/60 hover:text-amber-50 font-bold uppercase tracking-widest font-[family-name:var(--font-relink-neue)] transition-colors">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {articlesResult.data?.slice(0, 4).map((article: any) => (
              <div
                key={article.id}
                className="p-5 rounded-none bg-white/5 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-none border border-current font-bold uppercase tracking-widest ${article.postStatus === 'published' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {article.postStatus}
                  </span>
                  <span className="text-[10px] text-white/20 uppercase font-medium">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-white/90 font-[family-name:var(--font-relink-neue)] transition-colors line-clamp-1">
                  {article.title}
                </h3>
              </div>
            ))}
            {(!articlesResult.data || articlesResult.data.length === 0) && (
              <div className="py-12 text-center text-white/20 text-sm font-[family-name:var(--font-relink-neue)] italic">
                No articles yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
