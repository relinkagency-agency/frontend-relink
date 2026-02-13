/** @format */

import { getContacts } from "@/lib/actions/contacts";
import { Mail, Calendar, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";
import { DeleteContactButton } from "./delete-button";

export default async function AdminContactsPage() {
    const result = await getContacts();
    const contacts = result.data || [];

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                    Enquiries
                </h1>
                <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2 italic">
                    All incoming project requests and contacts.
                </p>
            </div>

            <div className="rounded-none bg-white/[0.02] border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium font-[family-name:var(--font-relink-neue)]">
                            <th className="px-8 py-6">User</th>
                            <th className="px-8 py-6">Message</th>
                            <th className="px-8 py-6">Details</th>
                            <th className="px-8 py-6">Date</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {contacts.map((contact: any) => (
                            <tr key={contact.id} className="group hover:bg-white/[0.02] transition-colors leading-relaxed">
                                <td className="px-8 py-6">
                                    <div>
                                        <div className="text-sm font-semibold text-white/90 font-[family-name:var(--font-relink-neue)] tracking-tight">
                                            {contact.name}
                                        </div>
                                        <div className="text-[11px] text-white/40 mt-1 font-[family-name:var(--font-relink-neue)]">
                                            {contact.email}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="max-w-md">
                                        <div className="text-xs text-white/70 font-medium font-[family-name:var(--font-relink-neue)] line-clamp-2">
                                            {contact.message}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col gap-1 text-[10px] uppercase tracking-wider font-bold">
                                        {contact.services && (
                                            <span className="text-amber-50/60">Service: {contact.services}</span>
                                        )}
                                        {contact.location && (
                                            <span className="text-white/20 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {contact.location}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="text-[11px] text-white/30 font-medium font-[family-name:var(--font-relink-neue)]">
                                        {new Date(contact.createdAt).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 rounded-none bg-white/5 border border-white/5 text-white/40 hover:text-emerald-500 hover:border-emerald-500/20 transition-all">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </button>
                                        <DeleteContactButton id={contact.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {contacts.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="p-4 rounded-none bg-white/5 w-fit mx-auto mb-4 border border-white/5">
                            <Mail className="w-6 h-6 text-white/20" />
                        </div>
                        <p className="text-white/40 text-sm font-[family-name:var(--font-relink-neue)]">
                            No messages in the inbox.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
