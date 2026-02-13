/** @format */

import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { ImageIcon, Trash2, ExternalLink } from "lucide-react";
import { CldImage } from "next-cloudinary";

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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {allMedia.map((item: any) => (
                    <div key={item.id} className="group relative aspect-square rounded-none bg-white/5 border border-white/5 overflow-hidden hover:border-amber-50/40 transition-all duration-500">
                        <CldImage
                            src={item.publicId}
                            width={400}
                            height={400}
                            alt={item.alternativeText || "Media asset"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                            <div className="flex items-center justify-between gap-2">
                                <div className="truncate flex-1">
                                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest truncate">
                                        {item.format} • {item.width}x{item.height}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="p-2 rounded-none bg-white/10 hover:bg-white/20 text-white transition-all">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-2 rounded-none bg-red-500/20 hover:bg-red-500/40 text-red-500 transition-all">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {allMedia.length === 0 && (
                    <div className="col-span-full py-32 text-center rounded-none border border-dashed border-white/5">
                        <div className="p-6 rounded-none bg-white/5 w-fit mx-auto mb-6">
                            <ImageIcon className="w-8 h-8 text-white/20" />
                        </div>
                        <p className="text-white/40 font-[family-name:var(--font-relink-neue)]">
                            Your media library is empty.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
