/** @format */

'use server';

import { db } from '@/lib/db';
import { contacts } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { resend } from '@/lib/resend';

export async function submitContactForm(data: any) {
    try {
        const [newContact] = await db
            .insert(contacts)
            .values({
                name: data.name,
                email: data.email,
                phone: data.phone,
                services: data.services,
                location: data.location,
                message: data.help, 
                source: data.source,
                status: 'new',
            })
            .returning();

        try {
            await resend.emails.send({
                from: 'Relink Agency <notifications@relink.agency>',
                to: process.env.CONTACT_EMAIL || 'hello@relink.agency',
                subject: `New Enquires: ${data.name} — ${data.services}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
                        <h2 style="color: #0B0D13; border-bottom: 2px solid #F5F5F0; padding-bottom: 10px;">New Project Enquiry</h2>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                        <p><strong>Service:</strong> ${data.services || 'N/A'}</p>
                        <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
                        <p style="margin-top: 20px;"><strong>Message:</strong></p>
                        <div style="background: #F9F9F9; padding: 15px; border-left: 4px solid #0B0D13;">
                            ${data.help}
                        </div>
                        <p style="margin-top: 30px; font-size: 12px; color: #666;">
                            This enquiry was submitted via the Relink Agency contact form.
                        </p>
                    </div>
                `
            });
        } catch (emailError) {
            console.error('Failed to send contact notification email:', emailError);
        }
        return {
            success: true,
            data: newContact,
        };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return {
            success: false,
            error: 'Failed to submit form. Please try again later.',
        };
    }
}

export async function getContacts() {
    try {
        const allContacts = await db
            .select()
            .from(contacts)
            .orderBy(desc(contacts.createdAt));

        return {
            success: true,
            data: allContacts,
        };
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return {
            success: false,
            error: 'Failed to fetch contacts',
            data: [],
        };
    }
}

export async function updateContactStatus(id: number, status: string) {
    try {
        const [updatedContact] = await db
            .update(contacts)
            .set({ status, updatedAt: new Date() })
            .where(eq(contacts.id, id))
            .returning();

        revalidatePath('/admin/contacts');

        return {
            success: true,
            data: updatedContact,
        };
    } catch (error) {
        console.error('Error updating contact status:', error);
        return {
            success: false,
            error: 'Failed to update status',
        };
    }
}
