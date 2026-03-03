/** @format */
import React from "react";
import { Skeleton } from "@/features/home/ui/skeletons";

export default function Loading() {
    return (
        <main className="min-h-screen bg-amber-50">
            {/* Hero Skeleton */}
            <section className="relative w-full h-[70vh] md:h-[85vh] min-h-[600px] bg-relink-dark/20 animate-pulse overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 pb-20 px-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex gap-4 mb-8">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                        <Skeleton className="h-20 md:h-32 w-full mb-8" />
                        <Skeleton className="h-6 w-48" />
                    </div>
                </div>
            </section>

            {/* Content Skeleton */}
            <article className="py-24 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />

                    <Skeleton className="aspect-video w-full rounded-sm" />

                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                </div>
            </article>

            {/* Footer link skeleton */}
            <div className="max-w-4xl mx-auto px-6 py-20 border-t border-black/5 text-center">
                <Skeleton className="h-6 w-40 mx-auto" />
            </div>
        </main>
    );
}
