/** @format */

'use server';

import { db } from '@/lib/db';
import { media } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { deleteImage } from '@/lib/cloudinary';

interface SaveMediaInput {
    url: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
    resourceType: string;
    alternativeText?: string;
}


export async function saveMediaToDatabase(input: SaveMediaInput) {
    try {
        const [mediaRecord] = await db
            .insert(media)
            .values({
                url: input.url,
                publicId: input.publicId,
                width: input.width,
                height: input.height,
                format: input.format,
                resourceType: input.resourceType,
                alternativeText: input.alternativeText,
            })
            .returning();

        revalidatePath('/admin/media');
        revalidatePath('/admin');
        revalidatePath('/', 'layout');

        return {
            success: true,
            data: mediaRecord,
        };
    } catch (error) {
        console.error('Error saving media to database:', error);
        return {
            success: false,
            error: 'Failed to save media',
            data: null,
        };
    }
}



export async function deleteMediaFromDatabase(id: number) {
    try {
        const record = await db.query.media.findFirst({
            where: eq(media.id, id)
        });

        if (record?.publicId) {
            await deleteImage(record.publicId);
        }

        await db.delete(media).where(eq(media.id, id));

        revalidatePath('/admin/media');
        revalidatePath('/admin');
        revalidatePath('/', 'layout');

        return {
            success: true,
        };
    } catch (error) {
        console.error('Error deleting media:', error);
        return {
            success: false,
            error: 'Failed to delete media',
        };
    }
}
