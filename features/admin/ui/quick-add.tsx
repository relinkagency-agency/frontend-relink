/** @format */

'use client';

import { useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';
import { createAuthor, createCategory } from '@/lib/actions/articles';
import { saveMediaToDatabase } from '@/lib/actions/media';
import { ImageUploadField } from '@/shared/ui/custom/image-upload-field';

interface QuickAddProps {
    type: 'author' | 'category';
    onSuccess: (newItem: any) => void;
}

export function QuickAdd({ type, onSuccess }: QuickAddProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [authorName, setAuthorName] = useState('');
    const [authorBio, setAuthorBio] = useState('');
    const [authorAvatar, setAuthorAvatar] = useState<any>(null);

    const [categoryName, setCategoryName] = useState('');
    const [categoryDesc, setCategoryDesc] = useState('');

    const resetForm = () => {
        setAuthorName('');
        setAuthorBio('');
        setAuthorAvatar(null);
        setCategoryName('');
        setCategoryDesc('');
        setIsOpen(false);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (type === 'author') {
                let avatarId = null;
                if (authorAvatar) {
                    const mediaRes = await saveMediaToDatabase(authorAvatar);
                    if (mediaRes.success && mediaRes.data) {
                        avatarId = mediaRes.data.id;
                    }
                }

                const slug = authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                const res = await createAuthor({
                    name: authorName,
                    bio: authorBio,
                    slug,
                    avatarId
                });

                if (res.success) {
                    onSuccess(res.data);
                    resetForm();
                } else {
                    alert('Failed to create author');
                }
            } else {
                const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                const res = await createCategory({
                    name: categoryName,
                    description: categoryDesc,
                    slug
                });

                if (res.success) {
                    onSuccess(res.data);
                    resetForm();
                } else {
                    alert('Failed to create category');
                }
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-[10px] uppercase font-bold tracking-widest text-amber-50/60 hover:text-amber-50 flex items-center gap-1 mt-2 transition-colors"
            >
                <Plus className="w-3 h-3" />
                Add New {type === 'author' ? 'Author' : 'Category'}
            </button>
        );
    }

    return (
        <div className="mt-4 p-6 rounded-none bg-white/5 border border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white uppercase tracking-widest">
                    New {type === 'author' ? 'Author' : 'Category'}
                </span>
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-white/40 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {type === 'author' ? (
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Author Name"
                        className="w-full px-4 py-3 rounded-none bg-[#0B0D13] border border-white/10 text-white/80 text-xs focus:border-amber-50/40 outline-none transition-all font-[family-name:var(--font-relink-neue)]"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                    />
                    <textarea
                        placeholder="Short Bio"
                        className="w-full px-4 py-3 rounded-none bg-[#0B0D13] border border-white/10 text-white/80 text-xs focus:border-amber-50/40 outline-none transition-all min-h-[80px] font-[family-name:var(--font-relink-neue)] resize-none"
                        value={authorBio}
                        onChange={(e) => setAuthorBio(e.target.value)}
                    />
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Avatar</span>
                        <ImageUploadField
                            value={authorAvatar}
                            onChange={setAuthorAvatar}
                            folder="authors/avatars"
                            label=""
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Category Name"
                        className="w-full px-4 py-3 rounded-none bg-[#0B0D13] border border-white/10 text-white/80 text-xs focus:border-amber-50/40 outline-none transition-all font-[family-name:var(--font-relink-neue)]"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <textarea
                        placeholder="Description (Optional)"
                        className="w-full px-4 py-3 rounded-none bg-[#0B0D13] border border-white/10 text-white/80 text-xs focus:border-amber-50/40 outline-none transition-all min-h-[80px] font-[family-name:var(--font-relink-neue)] resize-none"
                        value={categoryDesc}
                        onChange={(e) => setCategoryDesc(e.target.value)}
                    />
                </div>
            )}

            <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || (type === 'author' ? !authorName : !categoryName)}
                className="w-full py-3 bg-amber-50 text-[#0B0D13] rounded-none font-bold hover:bg-white transition-all duration-300 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
            >
                {loading && <Loader2 className="w-3 h-3 animate-spin" />}
                Create {type === 'author' ? 'Author' : 'Category'}
            </button>
        </div>
    );
}
