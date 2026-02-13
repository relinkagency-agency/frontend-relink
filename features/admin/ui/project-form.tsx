/** @format */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminInput, AdminTextarea } from './form-controls';
import { ImageUploadField } from '@/shared/ui/custom/image-upload-field';
import { createProject, updateProject } from '@/lib/actions/projects';
import { saveMediaToDatabase } from '@/lib/actions/media';
import { Loader2, Plus, X } from 'lucide-react';

interface ProjectFormProps {
    initialData?: any;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState<any>(initialData?.thumbnail || null);
    const [heroBanner, setHeroBanner] = useState<any>(initialData?.heroBanner || null);

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        clientName: initialData?.clientName || '',
        year: initialData?.year || new Date().getFullYear(),
        liveUrl: initialData?.liveUrl || '',
        isFeatured: initialData?.isFeatured || false,
        challenge: initialData?.challenge || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let thumbnailId = initialData?.thumbnailId || null;
            let heroBannerId = initialData?.heroBannerId || null;

            if (thumbnail && !thumbnail.id) {
                const thumbResult = await saveMediaToDatabase(thumbnail);
                if (thumbResult.success && thumbResult.data) thumbnailId = thumbResult.data.id;
            } else if (!thumbnail) {
                thumbnailId = null;
            }

            if (heroBanner && !heroBanner.id) {
                const heroResult = await saveMediaToDatabase(heroBanner);
                if (heroResult.success && heroResult.data) heroBannerId = heroResult.data.id;
            } else if (!heroBanner) {
                heroBannerId = null;
            }

            const projectData = {
                ...formData,
                thumbnailId,
                heroBannerId,
            };

            let result;
            if (initialData?.id) {
                result = await updateProject(initialData.id, projectData);
            } else {
                result = await createProject(projectData);
            }

            if (result.success) {
                router.push('/admin/projects');
                router.refresh();
            } else {
                alert(result.error || 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            <section className="p-10 rounded-none bg-white/[0.02] border border-white/5 space-y-8">
                <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">General Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AdminInput
                        label="Project Title"
                        placeholder="e.g. Relink Agency Website"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <AdminInput
                        label="Slug"
                        placeholder="e.g. relink-agency"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AdminInput
                        label="Client Name"
                        placeholder="e.g. Relink"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    />
                    <AdminInput
                        label="Year"
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    />
                    <AdminInput
                        label="Live URL"
                        placeholder="https://..."
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    />
                </div>

                <AdminTextarea
                    label="Excerpt"
                    placeholder="A short description for the project cards..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
                        className={cn(
                            "w-12 h-6 rounded-none transition-all relative border",
                            formData.isFeatured ? "bg-amber-50 border-amber-50" : "bg-white/5 border-white/10"
                        )}
                    >
                        <div className={cn(
                            "absolute top-1 w-4 h-4 rounded-none transition-all",
                            formData.isFeatured ? "right-1 bg-[#0B0D13]" : "left-1 bg-white/40"
                        )} />
                    </button>
                    <span className="text-sm font-medium text-white/60 font-[family-name:var(--font-relink-neue)]">
                        Featured Project
                    </span>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-10 rounded-none bg-white/[0.02] border border-white/5 space-y-6">
                    <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">Thumbnail</h2>
                    <ImageUploadField
                        value={thumbnail}
                        onChange={setThumbnail}
                        folder="projects/thumbnails"
                        label=""
                    />
                </div>
                <div className="p-10 rounded-none bg-white/[0.02] border border-white/5 space-y-6">
                    <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">Hero Banner</h2>
                    <ImageUploadField
                        value={heroBanner}
                        onChange={setHeroBanner}
                        folder="projects/banners"
                        label=""
                    />
                </div>
            </section>

            <div className="flex items-center justify-end gap-4 pb-20">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-4 rounded-none text-white/40 hover:text-white transition-all font-medium font-[family-name:var(--font-relink-neue)] uppercase tracking-widest text-xs"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-12 py-4 bg-amber-50 text-[#0B0D13] rounded-none font-bold hover:bg-white transition-all duration-500 font-[family-name:var(--font-relink-neue)] flex items-center gap-2 disabled:opacity-50 uppercase tracking-widest text-xs shadow-xl"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {initialData?.id ? 'Update Project' : 'Publish Project'}
                </button>
            </div>
        </form>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
