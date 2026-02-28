/** @format */
'use client';

import { Trash2, Edit, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/lib/actions/projects";
import { ConfirmDialog } from "@/shared/ui/custom/confirm-dialog";

interface ProjectActionsProps {
    id: number;
    liveUrl?: string | null;
}

export function ProjectActions({ id, liveUrl }: ProjectActionsProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteProject(id);
            if (result.success) {
                router.refresh();
                setShowConfirm(false);
            } else {
                alert(result.error || "Failed to delete project");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center justify-end gap-2 text-right">
            <ConfirmDialog
                isOpen={showConfirm}
                onOpenChange={setShowConfirm}
                title="Delete Project"
                description="Are you sure? This will permanently remove the project and its media from Cloudinary."
                onConfirm={handleDelete}
                isLoading={isDeleting}
                confirmText="Delete Project"
            />
            <Link
                href={`/admin/projects/${id}`}
                className="p-2.5 rounded-none bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
            >
                <Edit className="w-4 h-4" />
            </Link>
            <button
                onClick={() => setShowConfirm(true)}
                disabled={isDeleting}
                className="p-2.5 rounded-none bg-red-500/5 border border-red-500/10 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all disabled:opacity-50"
            >
                {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Trash2 className="w-4 h-4" />
                )}
            </button>
            {liveUrl && (
                <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-none bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
            )}
        </div>
    );
}
