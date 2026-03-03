import React from "react";
import Services from "./services";
import { ProjectList } from "./project/projectlist";
import FeaturedProject from "./project/featured-project";
import BlogList from "./blog-list";
import { getServices } from "@/lib/actions/services";
import { getProjects } from "@/lib/actions/projects";
import { getArticles } from "@/lib/actions/articles";
import { mapDrizzleService, mapDrizzleProject, mapDrizzleArticle } from "@/lib/db/mappers";

export async function ServicesContainer({ serviceSlug }: { serviceSlug?: string }) {
    const res = await getServices();
    const data = res.data || [];

    const filteredData = serviceSlug
        ? data.filter((s) => s.slug === serviceSlug)
        : data;

    const services = filteredData.map(mapDrizzleService);

    return <Services services={services} />;
}

export async function ProjectsContainer({ serviceSlug }: { serviceSlug?: string }) {
    const res = await getProjects();
    const allProjectsRaw = res.data || [];

    const allProjects = allProjectsRaw.map(mapDrizzleProject);

    if (allProjects.length === 0) return null;

    const featuredProject = allProjects.find(p => p.isFeatured) || allProjects[0];

    const listProjects = allProjects
        .filter(p => p.id !== featuredProject?.id)
        .slice(0, 8);

    return (
        <>
            {featuredProject && <FeaturedProject project={featuredProject} />}
            {listProjects.length > 0 && <ProjectList projects={listProjects} />}

            
        </>
    );
}

export async function BlogListContainer() {
    const res = await getArticles('published');
    const articles = (res.data || []).slice(0, 3).map(mapDrizzleArticle);
    return <BlogList articles={articles} />;
}
