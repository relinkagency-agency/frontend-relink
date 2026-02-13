'use client';

import { Trash2 } from "lucide-react";
import { deleteArticle } from "@/lib/actions/articles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function DeleteArticleButton({ id }: { id: number }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this article?")) return;

        setIsDeleting(true);
        try {
            await deleteArticle(id);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete article");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2.5 rounded-none bg-red-500/5 border border-red-500/10 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all font-[family-name:var(--font-relink-neue)] disabled:opacity-50"
        >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
    );
}
