/** @format */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminInput, AdminTextarea } from './form-controls';
import { ImageUploadField } from '@/shared/ui/custom/image-upload-field';
import { createService, updateService } from '@/lib/actions/services';
import { saveMediaToDatabase } from '@/lib/actions/media';
import { Loader2 } from 'lucide-react';

interface ServiceFormProps {
    initialData?: any;
}

export function ServiceForm({ initialData }: ServiceFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [icon, setIcon] = useState<any>(initialData?.icon || null);
    const [coverImage, setCoverImage] = useState<any>(initialData?.coverImage || null);

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        shortDescription: initialData?.shortDescription || '',
        order: initialData?.order || 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let iconId = initialData?.iconId || null;
            let coverImageId = initialData?.coverImageId || null;

            if (icon && !icon.id) {
                const iconResult = await saveMediaToDatabase(icon);
                if (iconResult.success && iconResult.data) iconId = iconResult.data.id;
            } else if (!icon) {
                iconId = null;
            }

            if (coverImage && !coverImage.id) {
                const coverResult = await saveMediaToDatabase(coverImage);
                if (coverResult.success && coverResult.data) coverImageId = coverResult.data.id;
            } else if (!coverImage) {
                coverImageId = null;
            }

            const serviceData = {
                ...formData,
                iconId,
                coverImageId,
            };

            let result;
            if (initialData?.id) {
                result = await updateService(initialData.id, serviceData);
            } else {
                result = await createService(serviceData);
            }

            if (result.success) {
                router.push('/admin/services');
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
                <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">Service Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AdminInput
                        label="Service Title"
                        placeholder="e.g. Brand Strategy"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <AdminInput
                        label="Slug"
                        placeholder="e.g. brand-strategy"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-3">
                        <AdminInput
                            label="Short Description"
                            placeholder="A brief overview of the service..."
                            value={formData.shortDescription}
                            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                        />
                    </div>
                    <AdminInput
                        label="Display Order"
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    />
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-10 rounded-none bg-white/[0.02] border border-white/5 space-y-6">
                    <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">Icon</h2>
                    <ImageUploadField
                        value={icon}
                        onChange={setIcon}
                        folder="services/icons"
                    />
                </div>
                <div className="p-10 rounded-none bg-white/[0.02] border border-white/5 space-y-6">
                    <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">Cover Image</h2>
                    <ImageUploadField
                        value={coverImage}
                        onChange={setCoverImage}
                        folder="services/covers"
                    />
                </div>
            </div>

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
                    {initialData?.id ? 'Update Service' : 'Create Service'}
                </button>
            </div>
        </form>
    );
}
