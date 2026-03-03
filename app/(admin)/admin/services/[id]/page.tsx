/** @format */

import { ServiceForm } from "@/features/admin/ui/service-form";
import { getServiceById } from "@/lib/actions/services";
import { notFound } from "next/navigation";

export default async function EditServicePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const result = await getServiceById(parseInt(id));

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-12 ">
            <div>
                <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                    Edit Service
                </h1>
                <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2">
                    Update the details of {result.data.title}.
                </p>
            </div>

            <ServiceForm initialData={result.data} />
        </div>
    );
}
