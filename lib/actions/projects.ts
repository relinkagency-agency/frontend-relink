/** @format */

'use server';

import { db } from '@/lib/db';
import { projects, projectGallery, projectServices, projectDeliverables, media } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import cloudinary, { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function getProjects() {
    try {
        const allProjects = await db.query.projects.findMany({
            orderBy: desc(projects.createdAt),
            with: {
                thumbnail: true,
                heroBanner: true,
                services: {
                    with: {
                        service: true,
                    },
                },
            },
        });

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
        const featuredProjects = await db.query.projects.findMany({
            where: eq(projects.isFeatured, true),
            orderBy: projects.featuredOrder,
            with: {
                thumbnail: true,
                heroBanner: true,
                services: {
                    with: {
                        service: true,
                    },
                },
            },
        });

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

        // Handle Deliverables
        if (data.deliverables && Array.isArray(data.deliverables) && data.deliverables.length > 0) {
            await db.insert(projectDeliverables).values(
                data.deliverables.map((d: any, index: number) => ({
                    projectId: newProject.id,
                    label: d.label,
                    details: d.details,
                    order: index,
                }))
            );
        }

        if (data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0) {
            await db.insert(projectGallery).values(
                data.gallery.map((g: any, index: number) => ({
                    projectId: newProject.id,
                    mediaId: g.mediaId || g.id,
                    order: index,
                }))
            );
        }

        // Handle Services
        if (data.serviceIds && Array.isArray(data.serviceIds) && data.serviceIds.length > 0) {
            await db.insert(projectServices).values(
                data.serviceIds.map((serviceId: number) => ({
                    projectId: newProject.id,
                    serviceId: serviceId,
                }))
            );
        }

        revalidatePath('/projects');
        revalidatePath('/admin/projects');
        revalidatePath(`/projects/${data.slug}`);
        revalidatePath('/', 'layout');

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

export async function updateProject(id: number, data: any) {
    try {
        const projectFields: any = {};
        const validFields = [
            'title', 'slug', 'excerpt', 'challenge', 'solution', 'year',
            'clientName', 'liveUrl', 'isFeatured', 'featuredOrder',
            'thumbnailId', 'heroBannerId', 'publishedAt'
        ];

        validFields.forEach(field => {
            if (data[field] !== undefined) {
                projectFields[field] = data[field];
            }
        });

        const [updatedProject] = await db
            .update(projects)
            .set({
                ...projectFields,
                updatedAt: new Date(),
            })
            .where(eq(projects.id, id))
            .returning();

        // Handle Deliverables
        if (data.deliverables !== undefined) {
            // Delete existing
            await db.delete(projectDeliverables).where(eq(projectDeliverables.projectId, id));

            // Insert new if any
            if (Array.isArray(data.deliverables) && data.deliverables.length > 0) {
                await db.insert(projectDeliverables).values(
                    data.deliverables.map((d: any, index: number) => ({
                        projectId: id,
                        label: d.label,
                        details: typeof d.details === 'object' ? JSON.stringify(d.details) : d.details,
                        order: index,
                    }))
                );
            }
        }

        // Handle Gallery
        if (data.gallery !== undefined) {
            // Delete existing
            await db.delete(projectGallery).where(eq(projectGallery.projectId, id));

            // Insert new if any
            if (Array.isArray(data.gallery) && data.gallery.length > 0) {
                await db.insert(projectGallery).values(
                    data.gallery.map((g: any, index: number) => ({
                        projectId: id,
                        mediaId: g.mediaId || g.id,
                        order: index,
                    }))
                );
            }
        }

        // Handle Services
        if (data.serviceIds !== undefined) {
            // Delete existing
            await db.delete(projectServices).where(eq(projectServices.projectId, id));

            // Insert new if any
            if (Array.isArray(data.serviceIds) && data.serviceIds.length > 0) {
                await db.insert(projectServices).values(
                    data.serviceIds.map((serviceId: number) => ({
                        projectId: id,
                        serviceId: serviceId,
                    }))
                );
            }
        }

        revalidatePath('/projects');
        revalidatePath('/admin/projects');
        if (updatedProject) {
            revalidatePath(`/projects/${updatedProject.slug}`);
        }
        revalidatePath('/', 'layout');

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

        revalidatePath('/projects');
        revalidatePath('/admin/projects');
        revalidatePath('/', 'layout');

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
