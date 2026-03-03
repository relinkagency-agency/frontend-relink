/** @format */

export type Media = {
    id: number;
    url: string;
    publicId: string;
    alt?: string | null;
};

export type Service = {
    id: number;
    title: string;
    slug: string;
    shortDescription?: string | null;
    order: number;
    icon?: Media | null;
    coverImage?: Media | null;
};

export type ServicesResponse = {
    success: boolean;
    data: Service[];
    error?: string;
};

export type Project = {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    challenge?: string | null;
    solution?: any;
    year?: number | null;
    clientName?: string | null;
    liveUrl?: string | null;
    isFeatured: boolean;
    thumbnail?: Media | null;
    gallery?: Media[] | null;
    services: Array<{ id: number; title: string; slug: string }>;
    deliverables: Array<{ label: string; details?: string | null }>;
    heroBanner?: Media | null;
};

export type ProjectsResponse = {
    success: boolean;
    data: Project[];
    error?: string;
};

export type Author = {
    id: number;
    name?: string | null;
    slug?: string | null;
    avatar?: Media | null;
};

export type Category = {
    id: number;
    name?: string | null;
    slug?: string | null;
};

export type Article = {
    id: number;
    title: string;
    excerpt?: string | null;
    slug: string;
    coverImage?: Media | null;
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
