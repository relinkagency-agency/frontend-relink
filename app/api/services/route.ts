/** @format */

import { NextResponse } from 'next/server';
import { getServices, getServiceBySlug } from '@/lib/actions/services';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (slug) {
            const result = await getServiceBySlug(slug);
            return NextResponse.json(result);
        }

        const result = await getServices();
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error in services API:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
