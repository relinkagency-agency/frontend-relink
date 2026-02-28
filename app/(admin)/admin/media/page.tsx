/** @format */

import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { ImageIcon } from "lucide-react";
import { MediaGrid } from "@/features/admin/ui/media-grid";

export default async function MediaLibraryPage() {
    const allMedia = await db.query.media.findMany({
        orderBy: desc(media.id)
    });

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                    Media Library
                </h1>
                <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2">
                    Manage all uploaded assets across the agency.
                </p>
            </div>

            {allMedia.length > 0 ? (
                <MediaGrid items={allMedia} />
            ) : (
                <div className="py-32 text-center rounded-none border border-dashed border-white/5">
                    <div className="p-6 rounded-none bg-white/5 w-fit mx-auto mb-6">
                        <ImageIcon className="w-8 h-8 text-white/20" />
                    </div>
                    <p className="text-white/40 font-[family-name:var(--font-relink-neue)]">
                        Your media library is empty.
                    </p>
                </div>
            )}
        </div>
    );
}
