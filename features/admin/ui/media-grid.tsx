/** @format */
'use client';

import { CldImage } from "next-cloudinary";
import { Trash2, ExternalLink, Loader2 } from "lucide-react";
import { deleteMediaFromDatabase } from "@/lib/actions/media";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/shared/ui/custom/confirm-dialog";

interface MediaItem {
    id: number;
    publicId: string;
    url: string;
    format: string | null;
    width: number | null;
    height: number | null;
    alternativeText: string | null;
}

interface MediaGridProps {
    items: MediaItem[];
}

export function MediaGrid({ items }: MediaGridProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    const handleDelete = async () => {
        if (!itemToDelete) return;

        setDeletingId(itemToDelete);
        try {
            const result = await deleteMediaFromDatabase(itemToDelete);
            if (result.success) {
                router.refresh();
                setItemToDelete(null);
            } else {
                alert(result.error || "Failed to delete media");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <ConfirmDialog
                isOpen={!!itemToDelete}
                onOpenChange={(open) => !open && setItemToDelete(null)}
                title="Delete Media Asset"
                description="Are you sure you want to delete this asset? This will permanently remove it from Cloudinary and the database."
                onConfirm={handleDelete}
                isLoading={!!deletingId}
                confirmText="Delete Asset"
            />
            {items.map((item) => (
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
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-none bg-white/10 hover:bg-white/20 text-white transition-all"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <button
                                    onClick={() => setItemToDelete(item.id)}
                                    disabled={deletingId === item.id}
                                    className="p-2 rounded-none bg-red-500/20 hover:bg-red-500/40 text-red-500 transition-all disabled:opacity-50"
                                >
                                    {deletingId === item.id ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-3.5 h-3.5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
