/** @format */

'use server';

import { db } from '@/lib/db';
import { feedbacks } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { resend } from '@/lib/resend';

export async function submitFeedback(data: any) {
    try {
        const [newFeedback] = await db
            .insert(feedbacks)
            .values({
                name: data.name,
                email: data.email,
                businessName: data.phone,
                services: data.services,
                photoUrl: data.location,
                content: data.help,
                status: 'pending',
            })
            .returning();

        try {
            await resend.emails.send({
                from: 'Relink Agency <notifications@relink.agency>',
                to: process.env.CONTACT_EMAIL || 'hello@relink.agency',
                subject: `New Testimonial: ${data.name}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
                        <h2 style="color: #0B0D13; border-bottom: 2px solid #F5F5F0; padding-bottom: 10px;">New Testimonial Received</h2>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Phone/Company:</strong> ${data.phone || 'N/A'}</p>
                        <p><strong>Service Used:</strong> ${data.services || 'N/A'}</p>
                        <p style="margin-top: 20px;"><strong>Testimonial Content:</strong></p>
                        <div style="background: #F9F9F9; padding: 15px; border-left: 4px solid #0B0D13; font-style: italic;">
                            "${data.help}"
                        </div>
                        <p style="margin-top: 30px; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">
                            Review pending approval in Admin Panel.
                        </p>
                    </div>
                `
            });
        } catch (emailError) {
            console.error('Failed to send feedback notification email:', emailError);
        }

        return {
            success: true,
            data: newFeedback,
        };
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return {
            success: false,
            error: 'Failed to submit feedback. Please try again later.',
        };
    }
}

export async function getFeedbacks() {
    try {
        const allFeedbacks = await db
            .select()
            .from(feedbacks)
            .orderBy(desc(feedbacks.createdAt));

        return {
            success: true,
            data: allFeedbacks,
        };
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        return {
            success: false,
            error: 'Failed to fetch feedbacks',
            data: [],
        };
    }
}

export async function updateFeedbackStatus(id: number, status: string) {
    try {
        const [updatedFeedback] = await db
            .update(feedbacks)
            .set({ status, updatedAt: new Date() })
            .where(eq(feedbacks.id, id))
            .returning();

        revalidatePath('/admin/feedbacks');
        revalidatePath('/testimonials'); 
        return {
            success: true,
            data: updatedFeedback,
        };
    } catch (error) {
        console.error('Error updating feedback status:', error);
        return {
            success: false,
            error: 'Failed to update status',
        };
    }
}
