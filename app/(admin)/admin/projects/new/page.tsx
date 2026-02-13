/** @format */

import { ProjectForm } from "@/features/admin/ui/project-form";

export default function NewProjectPage() {
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

            <ProjectForm />
        </div>
    );
}
