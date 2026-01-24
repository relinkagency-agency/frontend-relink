/** @format */

import Hero from "@/features/home/ui/hero";
import Overview from "@/features/home/ui/brandoverview";
import Services from "@/features/home/ui/services";
import { ProjectList } from "@/features/home/ui/project/projectlist";
import FeaturedProject from "@/features/home/ui/project/featured-project";
import BlogList from "@/features/home/ui/blog-list";
import { getServices, getProjects, getUpdates } from "@/lib/strapi";

export default async function Page() {
  const [servicesRes, projectsRes, updatesRes] = await Promise.all([
    getServices(),
    getProjects({ featuredOnly: true, limit: 6 }),
    getUpdates({ limit: 3, onlyPublished: true }),
  ]);

  console.log("Services Data:", JSON.stringify(servicesRes, null, 2));
  console.log("Projects Data:", JSON.stringify(projectsRes, null, 2));
  console.log("Articles Data:", JSON.stringify(updatesRes, null, 2));


  if (!servicesRes.success) {
    console.error("Failed to fetch services:", servicesRes.error);
  }

  const featuredProject = projectsRes.data?.[0];
  const listProjects = projectsRes.data?.slice(1) || [];

  return (
    <>
      <Hero />
      <Overview />
      <Services services={servicesRes.data} />

      {featuredProject && <FeaturedProject project={featuredProject} />}

      {listProjects.length > 0 && <ProjectList projects={listProjects} />}

      <BlogList articles={updatesRes.data} />
    </>
  );
}
