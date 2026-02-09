/** @format */
import React from "react";
import Services from "./services";
import { ProjectList } from "./project/projectlist";
import FeaturedProject from "./project/featured-project";
import BlogList from "./blog-list";
import { getServices, getProjects, getUpdates } from "@/lib/strapi";

export async function ServicesContainer({ serviceSlug }: { serviceSlug?: string }) {
    const res = await getServices();
    const services = serviceSlug
        ? res.data.filter((s) => s.slug === serviceSlug)
        : res.data;

    return <Services services={services} />;
}

export async function ProjectsContainer({ serviceSlug }: { serviceSlug?: string }) {
    const res = await getProjects({ limit: 40, serviceSlug });
    const allProjects = res.data || [];

    // If no projects at all, return nothing
    if (allProjects.length === 0) return null;

    // First one (or featured one) goes to FeaturedProject
    const featuredProject = allProjects.find(p => p.isFeatured) || allProjects[0];

    // Everything else (excluding the one used for Featured) goes to ProjectList
    const listProjects = allProjects
        .filter(p => p.id !== featuredProject?.id)
        .slice(0, 4);

    return (
        <>
            {featuredProject && <FeaturedProject project={featuredProject} />}
            {listProjects.length > 0 && <ProjectList projects={listProjects} />}
        </>
    );
}

export async function BlogListContainer() {
    const res = await getUpdates({ limit: 3, onlyPublished: true });
    return <BlogList articles={res.data} />;
}
