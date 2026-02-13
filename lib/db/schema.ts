/** @format */

import {
    pgTable,
    serial,
    text,
    integer,
    boolean,
    timestamp,
    json,
    varchar,
    pgEnum
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const postStatusEnum = pgEnum('post_status', ['draft', 'published']);

// Medi Table
export const media = pgTable('media', {
    id: serial('id').primaryKey(),
    url: text('url').notNull(),
    publicId: text('public_id').notNull(),
    alternativeText: text('alternative_text'),
    width: integer('width'),
    height: integer('height'),
    format: varchar('format', { length: 10 }),
    resourceType: varchar('resource_type', { length: 20 }), // image, video, raw
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Services Table
export const services = pgTable('services', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    shortDescription: text('short_description'),
    longDescription: json('long_description'),
    order: integer('order').default(0),
    iconId: integer('icon_id').references(() => media.id),
    coverImageId: integer('cover_image_id').references(() => media.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Projects Table
export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    excerpt: text('excerpt'),
    challenge: text('challenge'),
    solution: json('solution'),
    year: integer('year'),
    clientName: text('client_name'),
    liveUrl: text('live_url'),
    isFeatured: boolean('is_featured').default(false),
    featuredOrder: integer('featured_order'),
    thumbnailId: integer('thumbnail_id').references(() => media.id),
    heroBannerId: integer('hero_banner_id').references(() => media.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    publishedAt: timestamp('published_at'),
});

export const projectGallery = pgTable('project_gallery', {
    id: serial('id').primaryKey(),
    projectId: integer('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
    mediaId: integer('media_id').references(() => media.id, { onDelete: 'cascade' }).notNull(),
    order: integer('order').default(0),
});

export const projectServices = pgTable('project_services', {
    id: serial('id').primaryKey(),
    projectId: integer('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
    serviceId: integer('service_id').references(() => services.id, { onDelete: 'cascade' }).notNull(),
});

export const projectDeliverables = pgTable('project_deliverables', {
    id: serial('id').primaryKey(),
    projectId: integer('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
    label: text('label').notNull(),
    details: text('details'),
    order: integer('order').default(0),
});

// Authors Table
export const authors = pgTable('authors', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    bio: text('bio'),
    avatarId: integer('avatar_id').references(() => media.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const articles = pgTable('articles', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    excerpt: text('excerpt'),
    blocks: json('blocks'),
    postStatus: postStatusEnum('post_status').default('draft').notNull(),
    coverId: integer('cover_id').references(() => media.id),
    authorId: integer('author_id').references(() => authors.id),
    categoryId: integer('category_id').references(() => categories.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    publishedAt: timestamp('published_at'),
});


export const servicesRelations = relations(services, ({ one }) => ({
    icon: one(media, {
        fields: [services.iconId],
        references: [media.id],
    }),
    coverImage: one(media, {
        fields: [services.coverImageId],
        references: [media.id],
    }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
    thumbnail: one(media, {
        fields: [projects.thumbnailId],
        references: [media.id],
    }),
    heroBanner: one(media, {
        fields: [projects.heroBannerId],
        references: [media.id],
    }),
    gallery: many(projectGallery),
    services: many(projectServices),
    deliverables: many(projectDeliverables),
}));

export const projectGalleryRelations = relations(projectGallery, ({ one }) => ({
    project: one(projects, {
        fields: [projectGallery.projectId],
        references: [projects.id],
    }),
    media: one(media, {
        fields: [projectGallery.mediaId],
        references: [media.id],
    }),
}));

export const projectServicesRelations = relations(projectServices, ({ one }) => ({
    project: one(projects, {
        fields: [projectServices.projectId],
        references: [projects.id],
    }),
    service: one(services, {
        fields: [projectServices.serviceId],
        references: [services.id],
    }),
}));

export const projectDeliverablesRelations = relations(projectDeliverables, ({ one }) => ({
    project: one(projects, {
        fields: [projectDeliverables.projectId],
        references: [projects.id],
    }),
}));

export const authorsRelations = relations(authors, ({ one }) => ({
    avatar: one(media, {
        fields: [authors.avatarId],
        references: [media.id],
    }),
}));

export const articlesRelations = relations(articles, ({ one }) => ({
    cover: one(media, {
        fields: [articles.coverId],
        references: [media.id],
    }),
    author: one(authors, {
        fields: [articles.authorId],
        references: [authors.id],
    }),
    category: one(categories, {
        fields: [articles.categoryId],
        references: [categories.id],
    }),
}));

// Types for TypeScript
export type Media = typeof media.$inferSelect;
export type InsertMedia = typeof media.$inferInsert;

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

export type Author = typeof authors.$inferSelect;
export type InsertAuthor = typeof authors.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;
