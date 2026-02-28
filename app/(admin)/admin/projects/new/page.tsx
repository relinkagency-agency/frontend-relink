/** @format */

import { ProjectForm } from "@/features/admin/ui/project-form";
import { getServices } from "@/lib/actions/services";

export default async function NewProjectPage() {
    const servicesRes = await getServices();
    const services = servicesRes.data || [];

    return (
        <div className="space-y-12 ">
            <div>
                <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                    New Project
                </h1>
                <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2">
                    Add a new masterpiece to your portfolio.
                </p>
            </div>

            <ProjectForm availableServices={services} />
        </div>
    );
}
