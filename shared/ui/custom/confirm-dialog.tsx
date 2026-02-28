/** @format */
"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";

interface ConfirmDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: "destructive" | "default";
    isLoading?: boolean;
}

export function ConfirmDialog({
    isOpen,
    onOpenChange,
    title,
    description,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "destructive",
    isLoading = false,
}: ConfirmDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0B0D13] border-white/10 text-white rounded-none max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-[family-name:var(--font-relink-fine)] text-xl tracking-tight">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-white/40 font-[family-name:var(--font-relink-neue)] text-sm pt-2">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 flex flex-row gap-3 sm:justify-end">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="rounded-none border-white/5 text-white/40 hover:text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-12 px-6"
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant}
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        disabled={isLoading}
                        className="rounded-none bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest text-[10px] font-bold h-12 px-6"
                    >
                        {isLoading ? "Processing..." : confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
