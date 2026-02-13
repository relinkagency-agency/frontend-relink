/** @format */

'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

interface CloudinaryUploadProps {
    onUploadSuccess: (result: {
        url: string;
        publicId: string;
        width: number;
        height: number;
        format: string;
        resourceType: string;
    }) => void;
    folder?: string;
    buttonText?: string;
    resourceType?: 'image' | 'video' | 'auto';
}

export function CloudinaryUpload({
    onUploadSuccess,
    folder = 'relink',
    buttonText = 'Upload Image',
    resourceType = 'image',
}: CloudinaryUploadProps) {
    const [uploading, setUploading] = useState(false);

    return (
        <CldUploadWidget
            uploadPreset="relink-preset" // You'll need to create this in Cloudinary dashboard
            options={{
                folder,
                resourceType,
                maxFiles: 1,
                clientAllowedFormats: resourceType === 'image' ? ['jpg', 'jpeg', 'png', 'webp', 'gif'] : undefined,
            }}
            onUpload={(result) => {
                setUploading(true);
            }}
            onSuccess={(result: any) => {
                setUploading(false);

                const info = result.info;
                onUploadSuccess({
                    url: info.secure_url,
                    publicId: info.public_id,
                    width: info.width,
                    height: info.height,
                    format: info.format,
                    resourceType: info.resource_type,
                });
            }}
            onError={(error) => {
                setUploading(false);
                console.error('Upload error:', error);
            }}
        >
            {({ open }) => (
                <button
                    type="button"
                    onClick={() => open()}
                    disabled={uploading}
                    className="px-6 py-3 bg-relink-purple-base text-white rounded-[var(--radius)] 
                     font-[family-name:var(--font-relink-neue)] 
                     hover:bg-relink-purple-deep transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? 'Uploading...' : buttonText}
                </button>
            )}
        </CldUploadWidget>
    );
}
