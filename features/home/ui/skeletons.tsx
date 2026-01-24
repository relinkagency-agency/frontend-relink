/** @format */
import React from "react";

export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-white/10 rounded-sm ${className}`} />
    );
}

export function ServicesSkeleton() {
    return (
        <section className="w-full bg-[#0B0D13] py-24 px-10 min-h-[600px]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <Skeleton className="h-4 w-32 mb-4 bg-white/5" />
                    <Skeleton className="h-12 w-96 bg-white/5" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col gap-6">
                            <Skeleton className="aspect-square w-full bg-white/5" />
                            <Skeleton className="h-6 w-3/4 bg-white/5" />
                            <Skeleton className="h-20 w-full bg-white/5" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ProjectsSkeleton() {
    return (
        <div className="bg-[#0B0D13]">
            {/* Featured Project Skeleton */}
            <section className="relative w-full h-[72vh] min-h-[520px] bg-white/5 animate-pulse">
                <div className="absolute bottom-12 left-10 right-10">
                    <Skeleton className="h-4 w-24 mb-3 bg-white/5" />
                    <Skeleton className="h-16 w-3/4 mb-6 bg-white/5" />
                    <Skeleton className="h-4 w-32 bg-white/5" />
                </div>
            </section>

            {/* Project List Skeleton */}
            <section className="w-full py-10 px-10">
                <div className="flex items-start gap-8 overflow-hidden pb-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="min-w-[400px] flex flex-col gap-4">
                            <Skeleton className="aspect-[16/10] w-full bg-white/5" />
                            <Skeleton className="h-6 w-1/2 bg-white/5" />
                        </div>
                    ))}
                </div>
                <div className="mt-10 flex justify-end">
                    <Skeleton className="h-6 w-32 bg-white/5" />
                </div>
            </section>
        </div>
    );
}

export function BlogListSkeleton() {
    return (
        <section className="w-full bg-[#0B0D13] py-32 px-10 min-h-[900px]">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <Skeleton className="h-4 w-32 mb-5 bg-white/10" />
                        <Skeleton className="h-12 w-64 bg-white/10" />
                    </div>
                    <Skeleton className="h-6 w-32 hidden md:block bg-white/10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col">
                            <Skeleton className="aspect-[16/10] w-full mb-8 bg-white/10" />
                            <Skeleton className="h-4 w-24 mb-4 bg-white/10" />
                            <Skeleton className="h-8 w-full mb-4 bg-white/10" />
                            <Skeleton className="h-16 w-full bg-white/10" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
