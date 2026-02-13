/** @format */

'use server';

import { db } from '@/lib/db';
import { articles, authors, categories, media } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function getArticles(status?: 'draft' | 'published') {
    try {
        const query = db.query.articles.findMany({
            orderBy: desc(articles.publishedAt),
            with: {
                cover: true,
                author: {
                    with: {
                        avatar: true,
                    },
                },
                category: true,
            },
        });

        const allArticles = status
            ? await db.query.articles.findMany({
                where: eq(articles.postStatus, status),
                orderBy: desc(articles.publishedAt),
                with: {
                    cover: true,
                    author: {
                        with: {
                            avatar: true,
                        },
                    },
                    category: true,
                },
            })
            : await query;

        return {
            success: true,
            data: allArticles,
        };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return {
            success: false,
            error: 'Failed to fetch articles',
            data: [],
        };
    }
}

export async function getArticleBySlug(slug: string) {
    try {
        const article = await db.query.articles.findFirst({
            where: eq(articles.slug, slug),
            with: {
                cover: true,
                author: {
                    with: {
                        avatar: true,
                    },
                },
                category: true,
            },
        });

        if (!article) {
            return {
                success: false,
                error: 'Article not found',
                data: null,
            };
        }

        return {
            success: true,
            data: article,
        };
    } catch (error) {
        console.error('Error fetching article:', error);
        return {
            success: false,
            error: 'Failed to fetch article',
            data: null,
        };
    }
}

export async function getArticleById(id: number) {
    try {
        const article = await db.query.articles.findFirst({
            where: eq(articles.id, id),
            with: {
                cover: true,
                author: {
                    with: {
                        avatar: true,
                    },
                },
                category: true,
            },
        });

        if (!article) {
            return {
                success: false,
                error: 'Article not found',
                data: null,
            };
        }

        return {
            success: true,
            data: article,
        };
    } catch (error) {
        console.error('Error fetching article:', error);
        return {
            success: false,
            error: 'Failed to fetch article',
            data: null,
        };
    }
}

export async function createArticle(data: any) {
    try {
        const [newArticle] = await db
            .insert(articles)
            .values({
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                blocks: data.blocks,
                postStatus: data.postStatus,
                coverId: data.coverId,
                authorId: data.authorId,
                categoryId: data.categoryId,
                publishedAt: data.postStatus === 'published' ? new Date() : null,
            })
            .returning();

        revalidatePath('/news');
        revalidatePath(`/news/${data.slug}`);

        return {
            success: true,
            data: newArticle,
        };
    } catch (error) {
        console.error('Error creating article:', error);
        return {
            success: false,
            error: 'Failed to create article',
            data: null,
        };
    }
}

export async function updateArticle(id: number, data: any) {
    try {
        const updateData: any = {
            ...data,
            updatedAt: new Date(),
        };

        if (data.postStatus === 'published' && !data.publishedAt) {
            updateData.publishedAt = new Date();
        }

        const [updatedArticle] = await db
            .update(articles)
            .set(updateData)
            .where(eq(articles.id, id))
            .returning();

        revalidatePath('/news');
        revalidatePath(`/news/${updatedArticle.slug}`);

        return {
            success: true,
            data: updatedArticle,
        };
    } catch (error) {
        console.error('Error updating article:', error);
        return {
            success: false,
            error: 'Failed to update article',
            data: null,
        };
    }
}

export async function deleteArticle(id: number) {
    try {
        const article = await db.query.articles.findFirst({
            where: eq(articles.id, id),
            with: {
                cover: true,
            },
        });

        if (!article) {
            return {
                success: false,
                error: 'Article not found',
            };
        }

        // Delete from Cloudinary
        if (article.cover?.publicId) {
            await deleteImage(article.cover.publicId);
        }

        await db.delete(articles).where(eq(articles.id, id));

        revalidatePath('/news');

        return {
            success: true,
        };
    } catch (error) {
        console.error('Error deleting article:', error);
        return {
            success: false,
            error: 'Failed to delete article',
        };
    }
}

export async function uploadArticleImage(formData: FormData, folder: string = 'articles') {
    try {
        const file = formData.get('file') as File;

        if (!file) {
            return {
                success: false,
                error: 'No file provided',
                data: null,
            };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

        const uploadResult = await uploadImage(base64, folder);

        // Save to database
        const [mediaRecord] = await db
            .insert(media)
            .values({
                url: uploadResult.url,
                publicId: uploadResult.publicId,
                width: uploadResult.width,
                height: uploadResult.height,
                format: uploadResult.format,
                resourceType: uploadResult.resourceType,
            })
            .returning();

        return {
            success: true,
            data: mediaRecord,
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            success: false,
            error: 'Failed to upload image',
            data: null,
        };
    }
}

export async function getAuthors() {
    try {
        const allAuthors = await db.query.authors.findMany({
            with: {
                avatar: true,
            },
        });

        return {
            success: true,
            data: allAuthors,
        };
    } catch (error) {
        console.error('Error fetching authors:', error);
        return {
            success: false,
            error: 'Failed to fetch authors',
            data: [],
        };
    }
}

export async function getCategories() {
    try {
        const allCategories = await db.select().from(categories);

        return {
            success: true,
            data: allCategories,
        };
    } catch (error) {
        console.error('Error fetching categories:', error);
        return {
            success: false,
            error: 'Failed to fetch categories',
            data: [],
        };
    }
}

export async function createAuthor(data: any) {
    try {
        const [newAuthor] = await db
            .insert(authors)
            .values({
                name: data.name,
                slug: data.slug,
                bio: data.bio,
                avatarId: data.avatarId,
            })
            .returning();

        return {
            success: true,
            data: newAuthor,
        };
    } catch (error) {
        console.error('Error creating author:', error);
        return {
            success: false,
            error: 'Failed to create author',
            data: null,
        };
    }
}

export async function createCategory(data: any) {
    try {
        const [newCategory] = await db
            .insert(categories)
            .values({
                name: data.name,
                slug: data.slug,
                description: data.description,
            })
            .returning();

        return {
            success: true,
            data: newCategory,
        };
    } catch (error) {
        console.error('Error creating category:', error);
        return {
            success: false,
            error: 'Failed to create category',
            data: null,
        };
    }
}
