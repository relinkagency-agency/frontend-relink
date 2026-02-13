/** @format */

import { ServiceForm } from "@/features/admin/ui/service-form";

export default function NewServicePage() {
    return (
        <div className="space-y-12 ">
            <div>
                <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                    New Service
                </h1>
                <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2">
                    Add a new specialized service to your offering.
                </p>
            </div>

            <ServiceForm />
        </div>
    );
}
