/** @format */

import { ProjectForm } from "@/features/admin/ui/project-form";
import { getProjectById } from "@/lib/actions/projects";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const result = await getProjectById(parseInt(id));

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-12 ">
            <div>
                <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                    Edit Project
                </h1>
                <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2">
                    Modify the details of {result.data.title}.
                </p>
            </div>

            <ProjectForm initialData={result.data} />
        </div>
    );
}
