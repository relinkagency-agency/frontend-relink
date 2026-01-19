/** @format */

import Hero from "@/features/home/ui/hero";
import Overview from "@/features/home/ui/brandoverview";
import Services from "@/features/home/ui/services";
import { ProjectList } from "@/features/home/ui/project/projectlist";
import FeaturedProject from "@/features/home/ui/project/featuredprojetc";
import { Project } from "@/features/home/types.home";
import featured from "../public/featured.png";

import web02 from "../public/web02.jpg";
import web03 from "../public/web03.jpg";
import web04 from "../public/web04.jpg";
import web05 from "../public/web08.jpg";
import web06 from "../public/web07.jpg";

export const mockFeatured: Project = {
  id: "featured-1",
  category: "BRAND",
  client: "SKYNE",
  slug: "skyline",
  title:
    "An FMCG brand identity forged in the discipline and style of the ride",
  cover: {
    src: featured,
    alt: "Skyline featured project",
  },
};

export const mockProjects: Project[] = [
  {
    id: "p1",
    category: "BRAND",
    client: "Amazon Music",
    slug: "amazon-music-brand",
    title: "Amazon Music",
    cover: { src: web02, alt: "Amazon Music" },
    badge: { label: "Webby Awards Nominee", count: 1 },
  },
  {
    id: "p2",
    category: "BRAND, GRAPHIC DESIGN",
    client: "ByAsia Food",
    slug: "byasia-food",
    title: "ByAsia Food",
    cover: { src: web03, alt: "ByAsia Food" },
    badge: { label: "Pentawards 2023 Shortlist", count: 1 },
  },
  {
    id: "p3",
    category: "VIDEO, PHOTOGRAPHY",
    client: "Amazon Music",
    slug: "amazon-music-video",
    title: "Amazon Music",
    cover: { src: web04, alt: "Amazon Music video" },
  },
  {
    id: "p4",
    category: "WEBSITE",
    client: "Australian Strategic Policy Institute",
    slug: "aspi-website",
    title: "Australian Strategic Policy Institute",
    cover: { src: web05, alt: "ASPI website" },
  },
  {
    id: "p5",
    category: "BRAND",
    client: "Mavin Records",
    slug: "mavin-records",
    title: "Mavin Records",
    cover: { src: web06, alt: "Mavin Records" },
  },
];

export default function page() {
  return (
    <>
      <Hero />

      <Overview />
      <Services />

      <FeaturedProject project={mockFeatured} />
      <ProjectList projects={mockProjects} />
    </>
  );
}
 