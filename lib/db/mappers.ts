/** @format */

import { Project, Service, Article } from "@/lib/types";

/**
 * Maps Drizzle Project (with relations) to UI Project type
 */
export function mapDrizzleProject(p: any): Project {
    return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        challenge: p.challenge,
        solution: p.solution,
        year: p.year,
        clientName: p.clientName,
        liveUrl: p.liveUrl,
        isFeatured: p.isFeatured,
        thumbnail: p.thumbnail ? {
            id: p.thumbnail.id,
            url: p.thumbnail.url,
            publicId: p.thumbnail.publicId,
            alt: p.thumbnail.alternativeText
        } : null,
        heroBanner: p.heroBanner ? {
            id: p.heroBanner.id,
            url: p.heroBanner.url,
            publicId: p.heroBanner.publicId,
            alt: p.heroBanner.alternativeText
        } : null,
        gallery: p.gallery?.map((g: any) => ({
            id: g.media.id,
            url: g.media.url,
            publicId: g.media.publicId,
            alt: g.media.alternativeText
        })) || [],
        services: p.services?.map((s: any) => ({
            id: s.service.id,
            title: s.service.title,
            slug: s.service.slug
        })) || [],
        deliverables: p.deliverables?.map((d: any) => ({
            label: d.label,
            details: d.details
        })) || []
    };
}

/**
 * Maps Drizzle Service (with relations) to UI Service type
 */
export function mapDrizzleService(s: any): Service {
    return {
        id: s.id,
        title: s.title,
        slug: s.slug,
        shortDescription: s.shortDescription,
        order: s.order,
        coverImage: s.coverImage ? {
            id: s.coverImage.id,
            url: s.coverImage.url,
            publicId: s.coverImage.publicId,
            alt: s.coverImage.alternativeText
        } : null
    };
}

/**
 * Maps Drizzle Article (with relations) to UI Article type
 */
export function mapDrizzleArticle(a: any): Article {
    return {
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        blocks: a.blocks || [],
        coverImage: a.cover ? {
            id: a.cover.id,
            url: a.cover.url,
            publicId: a.cover.publicId,
            alt: a.cover.alternativeText
        } : null,
        author: a.author ? {
            id: a.author.id,
            name: a.author.name,
            slug: a.author.slug
        } : null,
        category: a.category ? {
            id: a.category.id,
            name: a.category.name,
            slug: a.category.slug
        } : null,
        postStatus: a.postStatus,
        publishedAt: a.publishedAt ? new Date(a.publishedAt) : null
    };
}
