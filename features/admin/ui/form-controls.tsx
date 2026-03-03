/** @format */

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function AdminInput({ label, error, className, ...props }: InputProps) {
    return (
        <div className="space-y-2 w-full">
            {label && (
                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 font-[family-name:var(--font-relink-neue)]">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    "w-full px-5 py-4 rounded-none bg-white/5 border border-white/5 focus:border-amber-50/40 focus:ring-1 focus:ring-amber-50/40 text-white placeholder:text-white/20 outline-none transition-all font-[family-name:var(--font-relink-neue)] text-sm",
                    error && "border-red-500/50 focus:border-red-500",
                    className
                )}
                {...props}
            />
            {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function AdminTextarea({ label, error, className, ...props }: TextareaProps) {
    return (
        <div className="space-y-2 w-full">
            {label && (
                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 font-[family-name:var(--font-relink-neue)]">
                    {label}
                </label>
            )}
            <textarea
                className={cn(
                    "w-full px-5 py-4 rounded-none bg-white/5 border border-white/5 focus:border-amber-50/40 focus:ring-1 focus:ring-amber-50/40 text-white placeholder:text-white/20 outline-none transition-all font-[family-name:var(--font-relink-neue)] text-sm min-h-[120px] resize-none",
                    error && "border-red-500/50 focus:border-red-500",
                    className
                )}
                {...props}
            />
            {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}
        </div>
    );
}
