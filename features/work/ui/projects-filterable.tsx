/** @format */
"use client";

import React, { useState } from "react";
import { Project, Service } from "@/lib/strapi.types";
import { ProjectCard } from "@/features/work/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsFilterableProps {
    projects: Project[];
    services: Service[];
}

export default function ProjectsFilterable({
    projects,
    services,
}: ProjectsFilterableProps) {
    const [activeFilter, setActiveFilter] = useState<string>("all");

    const filteredProjects =
        activeFilter === "all"
            ? projects
            : projects.filter((project) =>
                project.services.some((s) => s.slug === activeFilter)
            );

    return (
        <section id="projects" className="w-full bg-[#0B0D13] pb-32">
            <div className="relative">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_380px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

                <div className="relative mx-auto max-w-7xl px-8 md:px-12 pt-20">
                    <div className="flex flex-wrap gap-x-12 gap-y-6 mb-20 border-b border-white/10 pb-10">
                        <button
                            onClick={() => setActiveFilter("all")}
                            className={`px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all rounded-full border ${activeFilter === "all"
                                ? "bg-amber-50 text-black border-amber-50"
                                : "text-white/40 border-white/10 hover:border-white/20 hover:text-white"
                                }`}
                        >
                            All Work
                        </button>
                        {services.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => setActiveFilter(service.slug)}
                                className={`px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all rounded-full border ${activeFilter === service.slug
                                    ? "bg-amber-50 text-black border-amber-50"
                                    : "text-white/40 border-white/10 hover:border-white/20 hover:text-white"
                                    }`}
                            >
                                {service.title}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredProjects.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-white/30 uppercase tracking-widest text-xs">No projects found in this category</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
