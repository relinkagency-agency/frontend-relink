/** @format */

'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import { X } from 'lucide-react';

interface ImageUploadResult {
    url: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
    resourceType: string;
}

interface ImageUploadFieldProps {
    value?: ImageUploadResult | null;
    onChange: (result: ImageUploadResult | null) => void;
    folder?: string;
    label?: string;
    required?: boolean;
}

export function ImageUploadField({
    value,
    onChange,
    folder = 'relink',
    label = 'Upload Image',
    required = false,
}: ImageUploadFieldProps) {
    const [uploading, setUploading] = useState(false);

    const handleRemove = () => {
        onChange(null);
    };

    return (
        <div className="space-y-4">
            {label && (
                <label className="block text-sm font-medium text-foreground font-[family-name:var(--font-relink-neue)]">
                    {label} {required && <span className="text-destructive">*</span>}
                </label>
            )}

            {value && (
                <div className="relative inline-block">
                    <div className="relative rounded-none overflow-hidden border-2 border-border bg-card">
                        <CldImage
                            src={value.publicId}
                            width={400}
                            height={300}
                            alt="Uploaded image"
                            className="object-cover"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-2 -right-2 p-1.5 bg-destructive text-destructive-foreground 
                       rounded-none hover:bg-destructive/90 transition-colors shadow-lg"
                        aria-label="Remove image"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="mt-2 text-xs text-muted-foreground font-[family-name:var(--font-relink-neue)]">
                        {value.width} × {value.height}px • {value.format.toUpperCase()}
                    </div>
                </div>
            )}

            <div className={value ? "hidden" : "block"}>
                <CldUploadWidget
                    uploadPreset="relink-preset"
                    options={{
                        folder,
                        resourceType: 'image',
                        maxFiles: 1,
                        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'],
                        maxFileSize: 10000000, // 10MB
                    }}
                    onUpload={() => setUploading(true)}
                    onClose={() => {
                        setUploading(false);
                        // Fallback to ensure scroll is restored
                        document.body.style.overflow = 'auto';
                    }}
                    onSuccess={(result: any) => {
                        const info = result?.info;
                        if (info && typeof info !== 'string') {
                            onChange({
                                url: info.secure_url,
                                publicId: info.public_id,
                                width: info.width!,
                                height: info.height!,
                                format: info.format,
                                resourceType: info.resource_type,
                            });
                        }
                        setUploading(false);
                        document.body.style.overflow = 'auto';
                    }}
                    onError={(error: any) => {
                        console.error('Upload error:', error);
                        setUploading(false);
                        document.body.style.overflow = 'auto';
                    }}
                >
                    {({ open }) => (
                        <button
                            type="button"
                            onClick={() => open()}
                            disabled={uploading}
                            className="relative w-full min-h-[200px] border-2 border-dashed border-border 
                         rounded-none bg-card hover:bg-accent transition-colors
                         flex flex-col items-center justify-center gap-3
                         disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? (
                                <>
                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent 
                                  rounded-none animate-spin" />
                                    <span className="text-sm font-[family-name:var(--font-relink-neue)] text-muted-foreground">
                                        Uploading...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-12 h-12 text-muted-foreground"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                    <div className="text-center">
                                        <span className="block text-sm font-medium text-foreground font-[family-name:var(--font-relink-neue)]">
                                            Click to upload
                                        </span>
                                        <span className="block text-xs text-muted-foreground mt-1">
                                            PNG, JPG, WEBP up to 10MB
                                        </span>
                                    </div>
                                </>
                            )}
                        </button>
                    )}
                </CldUploadWidget>
            </div>
        </div>
    );
}
