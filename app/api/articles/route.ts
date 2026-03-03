/** @format */

import { NextResponse } from 'next/server';
import { getArticles, getArticleBySlug, getAuthors, getCategories } from '@/lib/actions/articles';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        const status = searchParams.get('status') as 'draft' | 'published' | undefined;
        const type = searchParams.get('type'); 

        if (type === 'authors') {
            const result = await getAuthors();
            return NextResponse.json(result);
        }

        if (type === 'categories') {
            const result = await getCategories();
            return NextResponse.json(result);
        }

        if (slug) {
            const result = await getArticleBySlug(slug);
            return NextResponse.json(result);
        }

        const result = await getArticles(status);
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error in articles API:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
