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
if (!STRAPI_URL) {
  throw new Error(
    "STRAPI_URL is not set. Add STRAPI_URL to your environment (.env.local / Vercel env) as an absolute URL, e.g. https://your-strapi.com"
  );
}

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const getStrapiMediaUrl = (url: string | undefined | null): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const fetchStrapi = async (endpoint: string, options?: RequestInit) => {
const headers = new Headers({
  "Content-Type": "application/json",
});

if (STRAPI_API_TOKEN) {
  headers.set("Authorization", `Bearer ${STRAPI_API_TOKEN}`);
}


  return fetch(`${STRAPI_URL}${endpoint}`, {
    ...options,
    headers,
  });
};

export async function getServices(): Promise<ServicesResponse> {
  try {
    const res = await fetchStrapi("/api/services?populate=*&sort=order:asc", {
      next: { revalidate: 60, tags: ["services"] },
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
  deliverables: p.deliverable?.length
    ? p.deliverable.map((d) => ({
        label: d.label,
        details: d.details ?? null,
      }))
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
      `/api/projects?populate[0]=thumbnail&populate[1]=gallery&populate[2]=services&populate[3]=deliverable&sort=year:desc${featuredFilter}${limitParam}`,
      { next: { revalidate: 60, tags: ["projects"] } }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: false,
        data: [],
        error: `Failed to fetch projects: ${res.status} ${res.statusText}. ${JSON.stringify(errorData)}`,
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
      )}&populate[0]=thumbnail&populate[1]=gallery&populate[2]=services&populate[3]=deliverable`,
      { next: { revalidate: 60, tags: ["projects", `project-${slug}`] } }
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
  blocks: a.blocks?.map((block: any) => {
    if (block.__component === "shared.media" && block.file) {
      return {
        ...block,
        file: {
          ...block.file,
          url: getStrapiMediaUrl(block.file.url),
        },
      };
    }
    if (block.__component === "shared.slider" && block.files) {
      return {
        ...block,
        files: block.files.map((f: any) => ({
          ...f,
          url: getStrapiMediaUrl(f.url),
        })),
      };
    }
    return block;
  }),
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
      `/api/articles?populate[0]=cover&populate[1]=author&populate[2]=category&sort=publishedAt:desc${limitParam}${publishedFilter}`,
      { next: { revalidate: 60, tags: ["articles"] } }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: false,
        data: [],
        error: `Failed to fetch articles: ${res.status} ${res.statusText}. ${JSON.stringify(errorData)}`,
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
      `/api/articles?populate[0]=cover&populate[1]=author&populate[2]=category&sort=publishedAt:desc&pagination[limit]=${limit}&filters[postStatus][$eq]=published`,
      { next: { revalidate: 60, tags: ["articles"] } }
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
      )}&populate[0]=cover&populate[1]=author&populate[2]=category&populate[3]=blocks&populate[4]=blocks.file&populate[5]=blocks.files`,
      { next: { revalidate: 60, tags: ["articles", `article-${slug}`] } }
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
