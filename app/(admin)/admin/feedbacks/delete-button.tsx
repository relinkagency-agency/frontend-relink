'use client';

import { Trash2 } from "lucide-react";
import { deleteFeedback } from "@/lib/actions/feedbacks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function DeleteFeedbackButton({ id }: { id: number }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        setIsDeleting(true);
        try {
            await deleteFeedback(id);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete testimonial");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-none bg-red-500/5 border border-red-500/10 text-red-500/20 hover:text-red-500 transition-all disabled:opacity-50"
            title="Delete"
        >
            {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
        </button>
    );
}
