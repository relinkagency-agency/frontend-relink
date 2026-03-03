'use client';

import { Trash2 } from "lucide-react";
import { deleteFeedback } from "@/lib/actions/feedbacks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteFeedbackButton({ id }: { id: number }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure? This will permanently delete the testimonial.")) return;

        setIsDeleting(true);
        try {
            const result = await deleteFeedback(id);
            if (result.success) {
                toast.success("Testimonial deleted successfully");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to delete testimonial");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
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
