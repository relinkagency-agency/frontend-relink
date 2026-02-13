/** @format */

import { NextResponse } from 'next/server';
import { getProjects, getProjectBySlug, getFeaturedProjects } from '@/lib/actions/projects';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        const featured = searchParams.get('featured');

        if (slug) {
            const result = await getProjectBySlug(slug);
            return NextResponse.json(result);
        }

        if (featured === 'true') {
            const result = await getFeaturedProjects();
            return NextResponse.json(result);
        }

        const result = await getProjects();
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error in projects API:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
