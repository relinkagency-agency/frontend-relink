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

  const stats = [
    {
      title: "Total Projects",
      value: projectsResult.data?.length || 0,
      icon: Briefcase,
      href: "/admin/projects",
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Active Services",
      value: servicesResult.data?.length || 0,
      icon: Settings,
      href: "/admin/services",
      color: "from-relink-purple-base/20 to-relink-purple-base/5",
      borderColor: "border-relink-purple-base/20"
    },
    {
      title: "News Articles",
      value: articlesResult.data?.length || 0,
      icon: FileText,
      href: "/admin/articles",
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-500/20"
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2">
            Welcome back to the Relink control center.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-6 py-3 bg-relink-purple-base text-white rounded-full text-sm font-medium hover:bg-relink-purple-deep transition-all duration-300 font-[family-name:var(--font-relink-neue)]"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className={`group p-8 rounded-[2rem] bg-gradient-to-br ${stat.color} border ${stat.borderColor} hover:scale-[1.02] transition-all duration-500 relative overflow-hidden`}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  <stat.icon className="w-5 h-5 text-white/80" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/80 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-white font-[family-name:var(--font-relink-fine)] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-white/60 font-[family-name:var(--font-relink-neue)]">
                  {stat.title}
                </div>
              </div>
            </div>
            {/* Subtle background flair */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-3xl" />
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">
              Recent Projects
            </h2>
            <Link href="/admin/projects" className="text-xs text-relink-purple-base hover:underline font-medium font-[family-name:var(--font-relink-neue)]">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {projectsResult.data?.slice(0, 4).map((project: any) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex items-center justify-center text-white/20 group-hover:text-white/40 transition-colors capitalize font-bold">
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

        <section className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">
              Latest News
            </h2>
            <Link href="/admin/articles" className="text-xs text-relink-purple-base hover:underline font-medium font-[family-name:var(--font-relink-neue)]">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {articlesResult.data?.slice(0, 4).map((article: any) => (
              <div
                key={article.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border border-current font-medium ${article.postStatus === 'published' ? 'text-emerald-500' : 'text-amber-500'}`}>
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
