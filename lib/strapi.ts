/** @format */

import type {
  StrapiResponse,
  StrapiService,
  Service,
  ServicesResponse,
  StrapiProject,
  Project,
  ProjectsResponse,
  StrapiArticle,
  Article,
  UpdatesResponse,
} from "./strapi.types";

const STRAPI_URL = (process.env.STRAPI_URL || "").replace(/\/$/, "");
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const getStrapiMediaUrl = (url: string | undefined | null): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const fetchStrapi = async (endpoint: string, options?: RequestInit) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  return fetch(`${STRAPI_URL}${endpoint}`, {
    ...options,
    headers,
  });
};

export async function getServices(): Promise<ServicesResponse> {
  try {
    const res = await fetchStrapi("/api/services?populate=*&sort=order:asc", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        success: false,
        data: [],
        error: `Failed to fetch services: ${res.status} ${res.statusText}`,
      };
    }

    const json: StrapiResponse<StrapiService> = await res.json();

    return {
      success: true,
      data: json.data.map((s) => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        shortDescription: s.shortDescription ?? null,
        order: s.order ?? 0,
        coverImage: s.coverImage
          ? {
              url: getStrapiMediaUrl(s.coverImage.url),
              alt: s.coverImage.alternativeText,
            }
          : null,
      })),
    };
  } catch (e) {
    console.error("Error fetching services:", e);
    return {
      success: false,
      data: [],
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
}

const mapProject = (p: StrapiProject): Project => ({
  id: p.id,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt ?? null,
  description: p.description,
  year: p.year ?? null,
  clientName: p.clientName ?? null,
  liveUrl: p.liveUrl ?? null,
  isFeatured: Boolean(p.isFeatured),
  featuredOrder: p.featuredOrder ?? 0,
  thumbnail: p.thumbnail
    ? {
        url: getStrapiMediaUrl(p.thumbnail.url),
        alt: p.thumbnail.alternativeText,
      }
    : null,
  gallery: p.gallery?.length
    ? p.gallery.map((m) => ({
        url: getStrapiMediaUrl(m.url),
        alt: m.alternativeText,
      }))
    : null,
  services: p.services?.length
    ? p.services.map((s) => ({ id: s.id, title: s.title, slug: s.slug }))
    : [],
  deliverables: p.deliverables?.length
    ? p.deliverables.map((d) => ({
        label: d.label,
        details: d.details ?? null,
      }))
    : [],
  results: p.results?.length
    ? p.results.map((r) => ({ metric: r.metric, description: r.description }))
    : [],
});

export async function getProjects(params?: {
  featuredOnly?: boolean;
  limit?: number;
}): Promise<ProjectsResponse> {
  try {
    const featuredFilter = params?.featuredOnly
      ? `&filters[isFeatured][$eq]=true`
      : "";
    const limitParam =
      typeof params?.limit === "number"
        ? `&pagination[limit]=${params.limit}`
        : "";

    const res = await fetchStrapi(
      `/api/projects?populate=thumbnail,gallery,services,deliverables,results&sort=featuredOrder:asc,year:desc${featuredFilter}${limitParam}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return {
        success: false,
        data: [],
        error: `Failed to fetch projects: ${res.status} ${res.statusText}`,
      };
    }

    const json: StrapiResponse<StrapiProject> = await res.json();

    return {
      success: true,
      data: json.data.map(mapProject),
    };
  } catch (e) {
    console.error("Error fetching projects:", e);
    return {
      success: false,
      data: [],
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
}

export async function getProjectBySlug(slug: string): Promise<{
  success: boolean;
  data: Project | null;
  error?: string;
}> {
  try {
    const res = await fetchStrapi(
      `/api/projects?filters[slug][$eq]=${encodeURIComponent(
        slug
      )}&populate=thumbnail,gallery,services,deliverables,results`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return {
        success: false,
        data: null,
        error: `Failed to fetch project: ${res.status} ${res.statusText}`,
      };
    }

    const json: StrapiResponse<StrapiProject> = await res.json();
    const project = json.data?.[0] ?? null;

    return {
      success: true,
      data: project ? mapProject(project) : null,
    };
  } catch (e) {
    console.error("Error fetching project by slug:", e);
    return {
      success: false,
      data: null,
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
}

const mapArticle = (a: StrapiArticle): Article => ({
  id: a.id,
  title: a.title,
  slug: a.slug,
  excerpt: a.excerpt ?? null,
  blocks: a.blocks,
  coverImage: a.cover
    ? { url: getStrapiMediaUrl(a.cover.url), alt: a.cover.alternativeText }
    : null,
  author: a.author
    ? {
        id: a.author.id,
        name: a.author.name ?? null,
        slug: a.author.slug ?? null,
      }
    : null,
  category: a.category
    ? {
        id: a.category.id,
        name: a.category.name ?? null,
        slug: a.category.slug ?? null,
      }
    : null,
  postStatus: a.postStatus ?? "draft",
  publishedAt: a.publishedAt ? new Date(a.publishedAt) : null,
});

export async function getUpdates(params?: {
  limit?: number;
  onlyPublished?: boolean;
}): Promise<UpdatesResponse> {
  try {
    const limitParam =
      typeof params?.limit === "number"
        ? `&pagination[limit]=${params.limit}`
        : "";
    const publishedFilter = params?.onlyPublished
      ? `&filters[postStatus][$eq]=published`
      : "";

    const res = await fetchStrapi(
      `/api/articles?populate=cover,author,category&sort=publishedAt:desc${limitParam}${publishedFilter}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return {
        success: false,
        data: [],
        error: `Failed to fetch articles: ${res.status} ${res.statusText}`,
      };
    }

    const json: StrapiResponse<StrapiArticle> = await res.json();

    return {
      success: true,
      data: json.data.map(mapArticle),
    };
  } catch (e) {
    console.error("Error fetching updates:", e);
    return {
      success: false,
      data: [],
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
}

export async function getPublishedPosts(limit = 50): Promise<Article[]> {
  try {
    const res = await fetchStrapi(
      `/api/articles?populate=cover,author,category&sort=publishedAt:desc&pagination[limit]=${limit}&filters[postStatus][$eq]=published`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const json: StrapiResponse<StrapiArticle> = await res.json();
    return json.data.map(mapArticle);
  } catch (e) {
    console.error("Error fetching published posts:", e);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<{
  success: boolean;
  data: Article | null;
  error?: string;
}> {
  try {
    const res = await fetchStrapi(
      `/api/articles?filters[slug][$eq]=${encodeURIComponent(
        slug
      )}&populate=cover,author,category,blocks`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return {
        success: false,
        data: null,
        error: `Failed to fetch article: ${res.status} ${res.statusText}`,
      };
    }

    const json: StrapiResponse<StrapiArticle> = await res.json();
    const article = json.data?.[0] ?? null;

    return {
      success: true,
      data: article ? mapArticle(article) : null,
    };
  } catch (e) {
    console.error("Error fetching post by slug:", e);
    return {
      success: false,
      data: null,
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
}

export async function getAllPostSlugs(limit = 200): Promise<string[]> {
  try {
    const res = await fetchStrapi(
      `/api/articles?fields[0]=slug&pagination[limit]=${limit}&filters[postStatus][$eq]=published`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const json: StrapiResponse<Pick<StrapiArticle, "id" | "slug">> =
      await res.json();
    return json.data.map((a) => a.slug).filter(Boolean);
  } catch (e) {
    console.error("Error fetching post slugs:", e);
    return [];
  }
}
