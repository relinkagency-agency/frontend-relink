/** @format */

export type StrapiResponse<T> = {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data: T | null;
  meta: Record<string, any>;
};

export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText?: string | null;
};

export type StrapiService = {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string | null;
  longDescription?: any;
  order?: number | null;
  icon?: StrapiMedia | null;
  coverImage?: StrapiMedia | null;
};

export type Service = {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string | null;
  order: number;
  icon?: { url: string; alt?: string | null } | null;
  coverImage?: { url: string; alt?: string | null } | null;
};

export type ServicesResponse = {
  success: boolean;
  data: Service[];
  error?: string;
};

export type StrapiDeliverable = {
  id?: number;
  label: string;
  details?: string | null;
};

export type StrapiProject = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  description?: any;
  year?: number | null;
  clientName?: string | null;
  liveUrl?: string | null;
  isFeatured?: boolean | null;
  featuredOrder?: number | null;
  thumbnail?: StrapiMedia | null;
  gallery?: StrapiMedia[] | null;
  services?: Array<Pick<StrapiService, "id" | "title" | "slug">> | null;
  deliverables?: StrapiDeliverable[] | null;
  results?: Array<{ id?: number; metric: string; description: string }> | null;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  description?: any;
  year?: number | null;
  clientName?: string | null;
  liveUrl?: string | null;
  isFeatured: boolean;
  featuredOrder: number;
  thumbnail?: { url: string; alt?: string | null } | null;
  gallery?: Array<{ url: string; alt?: string | null }> | null;
  services: Array<{ id: number; title: string; slug: string }>;
  deliverables: Array<{ label: string; details?: string | null }>;
  results: Array<{ metric: string; description: string }>;
};

export type ProjectsResponse = {
  success: boolean;
  data: Project[];
  error?: string;
};

export type StrapiAuthor = {
  id: number;
  name?: string | null;
  slug?: string | null;
  avatar?: StrapiMedia | null;
};

export type StrapiCategory = {
  id: number;
  name?: string | null;
  slug?: string | null;
};

export type StrapiArticle = {
  id: number;
  documentId?: string;
  title: string;
  excerpt?: string | null;
  slug: string;
  cover?: StrapiMedia | null;
  author?: Pick<StrapiAuthor, "id" | "name" | "slug"> | null;
  category?: Pick<StrapiCategory, "id" | "name" | "slug"> | null;
  blocks?: any;
  postStatus?: "draft" | "published";
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Article = {
  id: number;
  title: string;
  excerpt?: string | null;
  slug: string;
  coverImage?: { url: string; alt?: string | null } | null;
  author?: { id: number; name?: string | null; slug?: string | null } | null;
  category?: { id: number; name?: string | null; slug?: string | null } | null;
  blocks?: any;
  postStatus: "draft" | "published";
  publishedAt: Date | null;
};

export type UpdatesResponse = {
  success: boolean;
  data: Article[];
  error?: string;
};
