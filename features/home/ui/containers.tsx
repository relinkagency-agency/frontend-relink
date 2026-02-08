/** @format */
import React from "react";
import Services from "./services";
import { ProjectList } from "./project/projectlist";
import FeaturedProject from "./project/featured-project";
import BlogList from "./blog-list";
import { getServices, getProjects, getUpdates } from "@/lib/strapi";

export async function ServicesContainer() {
    const res = await getServices();
    return <Services services={res.data} />;
}

export async function ProjectsContainer() {
    const res = await getProjects({ limit: 10 }); // Fetch more to ensure we have enough
    const allProjects = res.data || [];

    // Find the first project marked as featured
    const featuredProjectIndex = allProjects.findIndex(p => p.isFeatured);

    // If we have a featured project, use it. Otherwise fall back to the first one.
    const featuredProject = featuredProjectIndex >= 0
        ? allProjects[featuredProjectIndex]
        : allProjects[0];

    // Filter out the featured project from the list to avoid duplication
    const listProjects = allProjects.filter(p => p.id !== featuredProject?.id).slice(0, 5);

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
