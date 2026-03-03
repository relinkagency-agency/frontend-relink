/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminInput, AdminTextarea } from './form-controls';
import { ImageUploadField } from '@/shared/ui/custom/image-upload-field';
import { createArticle, updateArticle, getAuthors, getCategories } from '@/lib/actions/articles';
import { saveMediaToDatabase } from '@/lib/actions/media';
import { Loader2, Send, Save, Image as ImageIcon, Type as TypeIcon, Trash2, GripVertical, Plus } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { toast } from 'sonner';
import { QuickAdd } from './quick-add';
import { slugify } from '@/lib/utils';

interface ArticleFormProps {
    initialData?: any;
}

export function ArticleForm({ initialData }: ArticleFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [cover, setCover] = useState<any>(initialData?.cover || null);
    const [authors, setAuthors] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isSlugManual, setIsSlugManual] = useState(!!initialData?.slug);
    const [isJsonInvalid, setIsJsonInvalid] = useState(false);

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        blocks: initialData?.blocks || [],
        postStatus: initialData?.postStatus || 'draft',
        authorId: initialData?.authorId || '',
        categoryId: initialData?.categoryId || '',
    });

    useEffect(() => {
        if (!isSlugManual && formData.title) {
            setFormData(prev => ({ ...prev, slug: slugify(prev.title) }));
        }
    }, [formData.title, isSlugManual]);

    useEffect(() => {
        async function loadData() {
            const [authorsRes, categoriesRes] = await Promise.all([
                getAuthors(),
                getCategories()
            ]);
            if (authorsRes.success) setAuthors(authorsRes.data);
            if (categoriesRes.success) setCategories(categoriesRes.data);
        }
        loadData();
    }, []);

    const handleAddBlock = (type: string, data: any = {}) => {
        const newBlock = {
            "__component": type,
            ...data
        };
        setFormData({ ...formData, blocks: [...(formData.blocks || []), newBlock] });
    };

    const handleRemoveBlock = (index: number) => {
        const newBlocks = [...formData.blocks];
        newBlocks.splice(index, 1);
        setFormData({ ...formData, blocks: newBlocks });
    };

    const handleBlockChange = (index: number, field: string, value: any) => {
        const newBlocks = [...formData.blocks];
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            newBlocks[index] = {
                ...newBlocks[index],
                [parent]: { ...newBlocks[index][parent], [child]: value }
            };
        } else {
            newBlocks[index] = { ...newBlocks[index], [field]: value };
        }
        setFormData({ ...formData, blocks: newBlocks });
    };

    const handleSubmit = async (e: React.FormEvent, statusOverride?: string) => {
        e.preventDefault();
        setLoading(true);

        const targetStatus = statusOverride || formData.postStatus;

        try {
            let coverId = initialData?.coverId || null;

            if (cover && !cover.id) {
                const coverResult = await saveMediaToDatabase(cover);
                if (coverResult.success && coverResult.data) coverId = coverResult.data.id;
            } else if (!cover) {
                coverId = null;
            }

            const articleData = {
                ...formData,
                postStatus: targetStatus,
                coverId,
                blocks: formData.blocks,
            };

            let result;
            if (initialData?.id) {
                result = await updateArticle(initialData.id, articleData);
            } else {
                result = await createArticle(articleData);
            }

            if (result.success) {
                toast.success(initialData ? 'Article updated successfully' : 'Article created successfully');
                router.push('/admin/articles');
                router.refresh();
            } else {
                toast.error(result.error || 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-12 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <section className="p-10 rounded-none bg-white/[0.02] border border-white/5 space-y-8">
                        <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">Content</h2>

                        <AdminInput
                            label="Article Title"
                            placeholder="The Future of Digital Agencies..."
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />

                        <AdminInput
                            label="Slug"
                            placeholder="future-of-digital-agencies"
                            value={formData.slug}
                            onChange={(e) => {
                                setIsSlugManual(true);
                                setFormData({ ...formData, slug: e.target.value });
                            }}
                            required
                        />

                        <AdminTextarea
                            label="Excerpt"
                            placeholder="A compelling summary for the news feed..."
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        />

                        {/* Visual Block Editor */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white italic">Article Builder</h2>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleAddBlock('shared.rich-text', { body: '' })}
                                        className="px-4 py-2 bg-white/5 border border-white/5 text-white/40 text-[10px] uppercase tracking-widest font-bold font-[family-name:var(--font-relink-neue)] flex items-center gap-2 hover:bg-white/10 transition-all hover:text-white"
                                    >
                                        <TypeIcon className="w-3.5 h-3.5" />
                                        Add Text
                                    </button>

                                    <CldUploadWidget
                                        uploadPreset="relink-preset"
                                        options={{ folder: 'articles/content' }}
                                        onSuccess={(result: any) => {
                                            const info = result?.info;
                                            if (info && typeof info !== 'string') {
                                                handleAddBlock('shared.media', {
                                                    file: {
                                                        url: info.secure_url,
                                                        alternativeText: info.original_filename || "Image",
                                                        caption: ""
                                                    }
                                                });
                                            }
                                        }}
                                    >
                                        {({ open }) => (
                                            <button
                                                type="button"
                                                onClick={() => open()}
                                                className="px-4 py-2 bg-white/5 border border-white/5 text-white/40 text-[10px] uppercase tracking-widest font-bold font-[family-name:var(--font-relink-neue)] flex items-center gap-2 hover:bg-white/10 transition-all hover:text-white"
                                            >
                                                <ImageIcon className="w-3.5 h-3.5" />
                                                Add Image
                                            </button>
                                        )}
                                    </CldUploadWidget>

                                    <button
                                        type="button"
                                        onClick={() => handleAddBlock('shared.quote', { body: '', title: '' })}
                                        className="px-4 py-2 bg-white/5 border border-white/5 text-white/40 text-[10px] uppercase tracking-widest font-bold font-[family-name:var(--font-relink-neue)] flex items-center gap-2 hover:bg-white/10 transition-all hover:text-white"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        Add Quote
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {(formData.blocks || []).map((block: any, index: number) => (
                                    <div key={index} className="group relative bg-white/[0.01] border border-white/5 p-8 transition-all hover:border-white/10">
                                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                                            <GripVertical className="w-4 h-4 text-white/20" />
                                        </div>

                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-50/40 font-[family-name:var(--font-relink-neue)]">
                                                {block.__component.split('.')[1]} Block
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveBlock(index)}
                                                className="p-2 text-white/10 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {block.__component === 'shared.rich-text' && (
                                            <AdminTextarea
                                                placeholder="Write your article content here..."
                                                value={block.body}
                                                onChange={(e) => handleBlockChange(index, 'body', e.target.value)}
                                                className="min-h-[200px]"
                                            />
                                        )}

                                        {block.__component === 'shared.quote' && (
                                            <div className="space-y-4">
                                                <AdminTextarea
                                                    placeholder="Enter quote here..."
                                                    value={block.body}
                                                    onChange={(e) => handleBlockChange(index, 'body', e.target.value)}
                                                    className="min-h-[100px] italic font-serif text-lg"
                                                />
                                                <AdminInput
                                                    placeholder="Author Name"
                                                    value={block.title}
                                                    onChange={(e) => handleBlockChange(index, 'title', e.target.value)}
                                                />
                                            </div>
                                        )}

                                        {block.__component === 'shared.media' && (
                                            <div className="space-y-4">
                                                <div className="aspect-[16/9] relative overflow-hidden bg-white/5 border border-white/5">
                                                    <img src={block.file.url} className="w-full h-full object-cover" alt="Content" />
                                                </div>
                                                <AdminInput
                                                    label="Caption"
                                                    placeholder="Describe this image..."
                                                    value={block.file.caption}
                                                    onChange={(e) => handleBlockChange(index, 'file.caption', e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {(!formData.blocks || formData.blocks.length === 0) && (
                                    <div className="py-20 text-center border-2 border-dashed border-white/5 bg-white/[0.01]">
                                        <p className="text-white/20 text-sm font-[family-name:var(--font-relink-neue)] italic">
                                            Your article is empty. Click one of the buttons above to start building.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="p-10 rounded-none bg-white/[0.02] border border-white/5 space-y-8">
                        <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">Settings</h2>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 font-[family-name:var(--font-relink-neue)]">
                                Category
                            </label>
                            <select
                                className="w-full px-5 py-4 rounded-none bg-[#0B0D13] border border-white/5 text-white/80 text-sm outline-none focus:border-amber-50/40 transition-all appearance-none font-[family-name:var(--font-relink-neue)]"
                                value={formData.categoryId}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <QuickAdd
                                type="category"
                                onSuccess={(newCat) => {
                                    setCategories([...categories, newCat]);
                                    setFormData({ ...formData, categoryId: newCat.id });
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 font-[family-name:var(--font-relink-neue)]">
                                Author
                            </label>
                            <select
                                className="w-full px-5 py-4 rounded-none bg-[#0B0D13] border border-white/5 text-white/80 text-sm outline-none focus:border-amber-50/40 transition-all appearance-none font-[family-name:var(--font-relink-neue)]"
                                value={formData.authorId}
                                onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                            >
                                <option value="">Select Author</option>
                                {authors.map(author => (
                                    <option key={author.id} value={author.id}>{author.name}</option>
                                ))}
                            </select>
                            <QuickAdd
                                type="author"
                                onSuccess={(newAuthor) => {
                                    setAuthors([...authors, newAuthor]);
                                    setFormData({ ...formData, authorId: newAuthor.id });
                                }}
                            />
                        </div>

                        <div className="pt-4 space-y-6">
                            <h2 className="text-xl font-[family-name:var(--font-relink-fine)] text-white">Cover Image</h2>
                            <ImageUploadField
                                value={cover}
                                onChange={setCover}
                                folder="news/covers"
                                label=""
                            />
                        </div>
                    </section>

                    <div className="flex flex-col gap-4 sticky top-28">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={(e) => handleSubmit(e, 'published')}
                            className="w-full px-8 py-5 bg-amber-50 text-[#0B0D13] rounded-none font-bold hover:bg-white transition-all duration-500 font-[family-name:var(--font-relink-neue)] flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-widest text-xs shadow-xl"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            Publish Now
                        </button>

                        <button
                            type="button"
                            disabled={loading}
                            onClick={(e) => handleSubmit(e, 'draft')}
                            className="w-full px-8 py-5 bg-white/5 border border-white/5 text-white rounded-none font-bold hover:bg-white/10 transition-all duration-500 font-[family-name:var(--font-relink-neue)] flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-widest text-xs"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 text-white/40" />}
                            Save as Draft
                        </button>

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full py-4 text-center text-white/20 hover:text-white transition-all text-xs font-semibold uppercase tracking-widest font-[family-name:var(--font-relink-neue)]"
                        >
                            Discard Changes
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
