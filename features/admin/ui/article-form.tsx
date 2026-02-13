/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminInput, AdminTextarea } from './form-controls';
import { ImageUploadField } from '@/shared/ui/custom/image-upload-field';
import { createArticle, updateArticle, getAuthors, getCategories } from '@/lib/actions/articles';
import { saveMediaToDatabase } from '@/lib/actions/media';
import { Loader2, Send, Save } from 'lucide-react';
import { QuickAdd } from './quick-add';

interface ArticleFormProps {
    initialData?: any;
}

export function ArticleForm({ initialData }: ArticleFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [cover, setCover] = useState<any>(initialData?.cover || null);
    const [authors, setAuthors] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

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
            };

            let result;
            if (initialData?.id) {
                result = await updateArticle(initialData.id, articleData);
            } else {
                result = await createArticle(articleData);
            }

            if (result.success) {
                router.push('/admin/articles');
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
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            required
                        />

                        <AdminTextarea
                            label="Excerpt"
                            placeholder="A compelling summary for the news feed..."
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        />

                        {/* Simplified Block Editor Placeholder */}
                        <div className="space-y-4">
                            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 font-[family-name:var(--font-relink-neue)]">
                                Content Blocks (JSON Editor)
                            </label>
                            <textarea
                                className="w-full px-5 py-4 rounded-none bg-white/5 border border-white/5 text-white/80 font-mono text-xs min-h-[300px] resize-none outline-none focus:border-amber-50/20 transition-all font-[family-name:var(--font-relink-neue)]"
                                value={JSON.stringify(formData.blocks, null, 2)}
                                onChange={(e) => {
                                    try {
                                        setFormData({ ...formData, blocks: JSON.parse(e.target.value) });
                                    } catch (err) { }
                                }}
                            />
                            <p className="text-[10px] text-white/20 italic">Note: Real article content is stored as an array of structured blocks.</p>
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
