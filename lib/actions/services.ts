/** @format */

'use server';

import { db } from '@/lib/db';
import { services, media } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function getServices() {
    try {
        const allServices = await db.query.services.findMany({
            orderBy: asc(services.order),
            with: {
                icon: true,
                coverImage: true,
            },
        });

        return {
            success: true,
            data: allServices,
        };
    } catch (error) {
        console.error('Error fetching services:', error);
        return {
            success: false,
            error: 'Failed to fetch services',
            data: [],
        };
    }
}

export async function getServiceBySlug(slug: string) {
    try {
        const service = await db.query.services.findFirst({
            where: eq(services.slug, slug),
            with: {
                icon: true,
                coverImage: true,
            },
        });

        if (!service) {
            return {
                success: false,
                error: 'Service not found',
                data: null,
            };
        }

        return {
            success: true,
            data: service,
        };
    } catch (error) {
        console.error('Error fetching service:', error);
        return {
            success: false,
            error: 'Failed to fetch service',
            data: null,
        };
    }
}

export async function getServiceById(id: number) {
    try {
        const service = await db.query.services.findFirst({
            where: eq(services.id, id),
            with: {
                icon: true,
                coverImage: true,
            },
        });

        if (!service) {
            return {
                success: false,
                error: 'Service not found',
                data: null,
            };
        }

        return {
            success: true,
            data: service,
        };
    } catch (error) {
        console.error('Error fetching service:', error);
        return {
            success: false,
            error: 'Failed to fetch service',
            data: null,
        };
    }
}


export async function createService(data: any) {
    try {
        const [newService] = await db
            .insert(services)
            .values({
                title: data.title,
                slug: data.slug,
                shortDescription: data.shortDescription,
                longDescription: data.longDescription,
                order: data.order,
                iconId: data.iconId,
                coverImageId: data.coverImageId,
            })
            .returning();

        revalidatePath('/services');
        revalidatePath(`/services/${data.slug}`);
        revalidatePath('/admin/services');
        revalidatePath('/admin');
        revalidatePath('/', 'layout');

        return {
            success: true,
            data: newService,
        };
    } catch (error) {
        console.error('Error creating service:', error);
        return {
            success: false,
            error: 'Failed to create service',
            data: null,
        };
    }
}

export async function updateService(id: number, data: any) {
    try {
        const [updatedService] = await db
            .update(services)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(eq(services.id, id))
            .returning();

        revalidatePath('/services');
        revalidatePath(`/services/${updatedService.slug}`);
        revalidatePath('/admin/services');
        revalidatePath('/admin');
        revalidatePath('/', 'layout');

        return {
            success: true,
            data: updatedService,
        };
    } catch (error) {
        console.error('Error updating service:', error);
        return {
            success: false,
            error: 'Failed to update service',
            data: null,
        };
    }
}

export async function deleteService(id: number) {
    try {
        // Get service with media to clean up Cloudinary
        const service = await db.query.services.findFirst({
            where: eq(services.id, id),
            with: {
                icon: true,
                coverImage: true,
            },
        });

        if (!service) {
            return {
                success: false,
                error: 'Service not found',
            };
        }

        if (service.icon?.publicId) {
            await deleteImage(service.icon.publicId);
        }
        if (service.coverImage?.publicId) {
            await deleteImage(service.coverImage.publicId);
        }

        await db.delete(services).where(eq(services.id, id));

        revalidatePath('/services');
        revalidatePath('/admin/services');
        revalidatePath('/admin');
        revalidatePath('/', 'layout');

        return {
            success: true,
        };
    } catch (error) {
        console.error('Error deleting service:', error);
        return {
            success: false,
            error: 'Failed to delete service',
        };
    }
}

export async function uploadServiceImage(formData: FormData, folder: string = 'services') {
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
