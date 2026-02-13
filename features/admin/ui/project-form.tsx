'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminInput, AdminTextarea } from './form-controls';
import { ImageUploadField } from '@/shared/ui/custom/image-upload-field';
import { createProject, updateProject } from '@/lib/actions/projects';
import { saveMediaToDatabase } from '@/lib/actions/media';
import { Loader2, Plus, X, Trash2, GripVertical } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

interface ProjectFormProps {
    initialData?: any;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState<any>(initialData?.thumbnail || null);
    const [heroBanner, setHeroBanner] = useState<any>(initialData?.heroBanner || null);

    const [deliverables, setDeliverables] = useState<any[]>(initialData?.deliverables || []);

    const [gallery, setGallery] = useState<any[]>(initialData?.gallery?.map((g: any) => g.media) || []);

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        clientName: initialData?.clientName || '',
        year: initialData?.year || new Date().getFullYear(),
        liveUrl: initialData?.liveUrl || '',
        isFeatured: initialData?.isFeatured || false,
        featuredOrder: initialData?.featuredOrder || 0,
        challenge: initialData?.challenge || '',
        solution: initialData?.solution ? (typeof initialData.solution === 'string' ? initialData.solution : JSON.stringify(initialData.solution, null, 2)) : '',
    });

    const handleAddDeliverable = () => {
        setDeliverables([...deliverables, { label: '', details: '' }]);
    };

    const handleRemoveDeliverable = (index: number) => {
        setDeliverables(deliverables.filter((_, i) => i !== index));
    };

    const handleDeliverableChange = (index: number, field: string, value: string) => {
        const newDeliverables = [...deliverables];
        newDeliverables[index] = { ...newDeliverables[index], [field]: value };
        setDeliverables(newDeliverables);
    };

    const handleAddGalleryImage = (media: any) => {
        if (media) {
            setGallery([...gallery, media]);
        }
    };

    const handleRemoveGalleryImage = (index: number) => {
        setGallery(gallery.filter((_, i) => i !== index));
    };

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
            } else {
                thumbnailId = thumbnail.id;
            }

            if (heroBanner && !heroBanner.id) {
                const heroResult = await saveMediaToDatabase(heroBanner);
                if (heroResult.success && heroResult.data) heroBannerId = heroResult.data.id;
            } else if (!heroBanner) {
                heroBannerId = null;
            } else {
                heroBannerId = heroBanner.id;
            }

            const processedGallery = await Promise.all(gallery.map(async (item) => {
                if (!item.id) {
                    const result = await saveMediaToDatabase(item);
                    return result.success ? result.data : null;
                }
                return item;
            }));

            const finalGallery = processedGallery.filter(Boolean);

            let solutionPayload = formData.solution;
            try {
                if (formData.solution.trim().startsWith('{') || formData.solution.trim().startsWith('[')) {
                    solutionPayload = JSON.parse(formData.solution);
                }
            } catch (e) {
            }

            const projectData = {
                ...formData,
                thumbnailId,
                heroBannerId,
                deliverables,
                gallery: finalGallery,
                solution: solutionPayload
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

                <AdminTextarea
                    label="Challenge"
                    placeholder="Describe the challenge..."
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    rows={4}
                />

                <AdminTextarea
                    label="Solution"
                    placeholder="Describe the solution..."
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    rows={4}
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

            <section className="p-10 rounded-none bg-white/[0.02] border border-white/5 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">Deliverables</h2>
                    <button
                        type="button"
                        onClick={handleAddDeliverable}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-bold font-[family-name:var(--font-relink-neue)] flex items-center gap-2 transition-all"
                    >
                        <Plus className="w-3 h-3" />
                        Add Item
                    </button>
                </div>

                <div className="space-y-4">
                    {deliverables.map((item, index) => (
                        <div key={index} className="flex gap-4 items-start group">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AdminInput
                                    label="Label"
                                    placeholder="e.g. Brand Identity"
                                    value={item.label}
                                    onChange={(e) => handleDeliverableChange(index, 'label', e.target.value)}
                                />
                                <AdminInput
                                    label="Details"
                                    placeholder="e.g. Logo, Color Palette..."
                                    value={item.details}
                                    onChange={(e) => handleDeliverableChange(index, 'details', e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveDeliverable(index)}
                                className="mt-8 p-2 text-white/20 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {deliverables.length === 0 && (
                        <p className="text-white/20 text-sm font-[family-name:var(--font-relink-neue)] italic">No deliverables added yet.</p>
                    )}
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

            <section className="p-10 rounded-none bg-white/[0.02] border border-white/5 space-y-8">
                <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">Project Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gallery.map((item, index) => (
                        <div key={index} className="relative aspect-square group bg-white/5 border border-white/5">
                            {item.url ? (
                                <img src={item.url} alt="Gallery" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                    <CldUploadWidget
                        uploadPreset="relink-preset"
                        options={{ folder: 'projects/gallery' }}
                        onSuccess={(result: any) => {
                            const info = result?.info;
                            if (info && typeof info !== 'string') {
                                handleAddGalleryImage({
                                    url: info.secure_url,
                                    publicId: info.public_id,
                                    width: info.width,
                                    height: info.height,
                                    format: info.format,
                                    resourceType: info.resource_type,
                                });
                            }
                        }}
                    >
                        {({ open }) => (
                            <div
                                onClick={() => open()}
                                className="relative aspect-square bg-white/5 border border-white/5 border-dashed hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
                            >
                                <div className="flex flex-col items-center gap-2 text-white/40">
                                    <Plus className="w-6 h-6" />
                                    <span className="text-xs uppercase tracking-widest font-bold">Add Image</span>
                                </div>
                            </div>
                        )}
                    </CldUploadWidget>
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
