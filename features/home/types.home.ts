import { StaticImageData } from "next/image";

export type ProjectCategory =
  | "BRAND"
  | "BRAND, GRAPHIC DESIGN"
  | "VIDEO, PHOTOGRAPHY"
  | "WEBSITE"
  | "WEB & APP";

export type Project = {
  id: string;
  category: ProjectCategory;
  client: string; // e.g. "Amazon Music"
  title: string; // used for featured headline / optional
  slug: string;
  cover: {
    src: string | StaticImageData;
    alt: string;
  };
  // optional badge at bottom-left (like "Webby Awards Nominee x 1")
  badge?: {
    label: string;
    count?: number;
  };
};