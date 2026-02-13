/** @format */

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadImage = async (file: File | string, folder: string = 'relink') => {
    try {
        const result = await cloudinary.uploader.upload(file as string, {
            folder,
            resource_type: 'auto',
        });

        return {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            resourceType: result.resource_type,
        };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image');
    }
};

export const deleteImage = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw new Error('Failed to delete image');
    }
};

export const getOptimizedImageUrl = (publicId: string, options?: {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    format?: string;
}) => {
    const { width, height, quality = 'auto', format = 'auto' } = options || {};

    return cloudinary.url(publicId, {
        transformation: [
            { width, height, crop: 'fill' },
            { quality, fetch_format: format },
        ],
    });
};
