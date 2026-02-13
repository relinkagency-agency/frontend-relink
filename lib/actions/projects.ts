/** @format */

'use server';

import { db } from '@/lib/db';
import { projects, projectGallery, projectServices, projectDeliverables, media } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import cloudinary, { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function getProjects() {
    try {
        const allProjects = await db
            .select()
            .from(projects)
            .orderBy(desc(projects.createdAt));

        return {
            success: true,
            data: allProjects,
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return {
            success: false,
            error: 'Failed to fetch projects',
            data: [],
        };
    }
}

export async function getProjectBySlug(slug: string) {
    try {
        const project = await db.query.projects.findFirst({
            where: eq(projects.slug, slug),
            with: {
                thumbnail: true,
                heroBanner: true,
                gallery: {
                    with: {
                        media: true,
                    },
                },
                services: {
                    with: {
                        service: true,
                    },
                },
                deliverables: true,
            },
        });

        if (!project) {
            return {
                success: false,
                error: 'Project not found',
                data: null,
            };
        }

        return {
            success: true,
            data: project,
        };
    } catch (error) {
        console.error('Error fetching project:', error);
        return {
            success: false,
            error: 'Failed to fetch project',
            data: null,
        };
    }
}

export async function getProjectById(id: number) {
    try {
        const project = await db.query.projects.findFirst({
            where: eq(projects.id, id),
            with: {
                thumbnail: true,
                heroBanner: true,
                gallery: {
                    with: {
                        media: true,
                    },
                },
                services: {
                    with: {
                        service: true,
                    },
                },
                deliverables: true,
            },
        });

        if (!project) {
            return {
                success: false,
                error: 'Project not found',
                data: null,
            };
        }

        return {
            success: true,
            data: project,
        };
    } catch (error) {
        console.error('Error fetching project:', error);
        return {
            success: false,
            error: 'Failed to fetch project',
            data: null,
        };
    }
}

export async function getFeaturedProjects() {
    try {
        const featuredProjects = await db
            .select()
            .from(projects)
            .where(eq(projects.isFeatured, true))
            .orderBy(projects.featuredOrder);

        return {
            success: true,
            data: featuredProjects,
        };
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        return {
            success: false,
            error: 'Failed to fetch featured projects',
            data: [],
        };
    }
}

// Create project
export async function createProject(data: any) {
    try {
        const [newProject] = await db
            .insert(projects)
            .values({
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                challenge: data.challenge,
                solution: data.solution,
                year: data.year,
                clientName: data.clientName,
                liveUrl: data.liveUrl,
                isFeatured: data.isFeatured,
                featuredOrder: data.featuredOrder,
                thumbnailId: data.thumbnailId,
                heroBannerId: data.heroBannerId,
                publishedAt: data.publishedAt,
            })
            .returning();

        revalidatePath('/work');
        revalidatePath(`/work/${data.slug}`);

        return {
            success: true,
            data: newProject,
        };
    } catch (error) {
        console.error('Error creating project:', error);
        return {
            success: false,
            error: 'Failed to create project',
            data: null,
        };
    }
}

// Update project
export async function updateProject(id: number, data: any) {
    try {
        const [updatedProject] = await db
            .update(projects)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(eq(projects.id, id))
            .returning();

        revalidatePath('/work');
        revalidatePath(`/work/${updatedProject.slug}`);

        return {
            success: true,
            data: updatedProject,
        };
    } catch (error) {
        console.error('Error updating project:', error);
        return {
            success: false,
            error: 'Failed to update project',
            data: null,
        };
    }
}

// Delete project
export async function deleteProject(id: number) {
    try {
        // Get project with media to clean up Cloudinary
        const project = await db.query.projects.findFirst({
            where: eq(projects.id, id),
            with: {
                thumbnail: true,
                heroBanner: true,
                gallery: {
                    with: {
                        media: true,
                    },
                },
            },
        });

        if (!project) {
            return {
                success: false,
                error: 'Project not found',
            };
        }

        // Delete from Cloudinary
        if (project.thumbnail?.publicId) {
            await deleteImage(project.thumbnail.publicId);
        }
        if (project.heroBanner?.publicId) {
            await deleteImage(project.heroBanner.publicId);
        }
        for (const item of project.gallery || []) {
            if (item.media?.publicId) {
                await deleteImage(item.media.publicId);
            }
        }

        // Delete from database
        await db.delete(projects).where(eq(projects.id, id));

        revalidatePath('/work');

        return {
            success: true,
        };
    } catch (error) {
        console.error('Error deleting project:', error);
        return {
            success: false,
            error: 'Failed to delete project',
        };
    }
}

// Upload project image
export async function uploadProjectImage(formData: FormData, folder: string = 'projects') {
    try {
        const file = formData.get('file') as File;

        if (!file) {
            return {
                success: false,
                error: 'No file provided',
                data: null,
            };
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
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
