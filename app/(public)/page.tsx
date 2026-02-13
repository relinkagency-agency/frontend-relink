import { Suspense } from "react";
import Hero from "@/features/home/ui/hero";
import Overview from "@/features/home/ui/brandoverview";
import {
  ServicesContainer,
  ProjectsContainer,
  BlogListContainer
} from "@/features/home/ui/containers";
import {
  ServicesSkeleton,
  ProjectsSkeleton,
  BlogListSkeleton
} from "@/features/home/ui/skeletons";

export default function Page() {
  return (
    <>
      <Hero />
      <Overview />

      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesContainer />
      </Suspense>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContainer />
      </Suspense>

      <Suspense fallback={<BlogListSkeleton />}>
        <BlogListContainer />
      </Suspense>
    </>
  );
}
