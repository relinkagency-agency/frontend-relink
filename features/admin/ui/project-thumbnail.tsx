/** @format */
'use client';

import { CldImage } from "next-cloudinary";

interface ProjectThumbnailProps {
    publicId?: string | null;
    title: string;
}

export function ProjectThumbnail({ publicId, title }: ProjectThumbnailProps) {
    if (!publicId) {
        return (
            <div className="w-16 h-12 rounded-none bg-white/5 overflow-hidden border border-white/5 flex items-center justify-center text-white/10 font-bold uppercase transition-colors group-hover:bg-white/10">
                {title.charAt(0)}
            </div>
        );
    }

    return (
        <div className="w-16 h-12 rounded-none bg-white/5 overflow-hidden border border-white/5 flex items-center justify-center transition-colors">
            <CldImage
                src={publicId}
                width={64}
                height={48}
                alt={title}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
