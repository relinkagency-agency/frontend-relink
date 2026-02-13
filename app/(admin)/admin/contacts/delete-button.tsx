'use client';

import { Trash2 } from "lucide-react";
import { deleteContact } from "@/lib/actions/contacts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function DeleteContactButton({ id }: { id: number }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this enquiry?")) return;

        setIsDeleting(true);
        try {
            await deleteContact(id);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete contact");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-none bg-red-500/5 border border-red-500/10 text-red-500/40 hover:text-red-500 transition-all disabled:opacity-50"
        >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
    );
}
