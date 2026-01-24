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
    const res = await getProjects({ featuredOnly: true, limit: 6 });
    const featuredProject = res.data?.[0];
    const listProjects = res.data?.slice(1) || [];

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
