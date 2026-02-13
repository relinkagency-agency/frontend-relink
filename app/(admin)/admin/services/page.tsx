/** @format */

import Link from "next/link";
import { Plus, Search, Edit, Trash2, Settings } from "lucide-react";
import { getServices } from "@/lib/actions/services";

export default async function AdminServicesPage() {
    const result = await getServices();
    const services = result.data || [];

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                        Services
                    </h1>
                    <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2">
                        Define and manage the services you offer.
                    </p>
                </div>

                <Link
                    href="/admin/services/new"
                    className="flex items-center gap-2 px-6 py-3 bg-amber-50 text-[#0B0D13] rounded-none text-xs font-bold hover:bg-white transition-all duration-300 font-[family-name:var(--font-relink-neue)] uppercase tracking-widest shadow-xl"
                >
                    <Plus className="w-4 h-4" />
                    Add New Service
                </Link>
            </div>

            <div className="rounded-none bg-white/[0.02] border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium font-[family-name:var(--font-relink-neue)]">
                            <th className="px-8 py-6">Service</th>
                            <th className="px-8 py-6">Order</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {services.map((service: any) => (
                            <tr key={service.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-none bg-white/5 border border-white/5 flex items-center justify-center text-amber-50 transition-colors group-hover:bg-white/10">
                                            <Settings className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white/90 font-[family-name:var(--font-relink-neue)] tracking-tight">
                                                {service.title}
                                            </div>
                                            <div className="text-[11px] text-white/40 mt-1 font-[family-name:var(--font-relink-neue)] line-clamp-1">
                                                {service.shortDescription || 'No description provided'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm text-white/60 font-[family-name:var(--font-relink-neue)]">
                                    {service.order || 0}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/services/${service.id}`}
                                            className="p-2.5 rounded-none bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all font-[family-name:var(--font-relink-neue)]"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button className="p-2.5 rounded-none bg-red-500/5 border border-red-500/10 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all font-[family-name:var(--font-relink-neue)]">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {services.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="p-4 rounded-none bg-white/5 w-fit mx-auto mb-4 border border-white/5">
                            <Settings className="w-6 h-6 text-white/20" />
                        </div>
                        <p className="text-white/40 text-sm font-[family-name:var(--font-relink-neue)]">
                            No services defined yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
