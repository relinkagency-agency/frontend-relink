/** @format */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Briefcase,
    Settings,
    FileText,
    Image as ImageIcon,
    ChevronRight,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
    },
    {
        title: 'Projects',
        href: '/admin/projects',
        icon: Briefcase,
    },
    {
        title: 'Services',
        href: '/admin/services',
        icon: Settings,
    },
    {
        title: 'News & Articles',
        href: '/admin/articles',
        icon: FileText,
    },
    {
        title: 'Media Library',
        href: '/admin/media',
        icon: ImageIcon,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-relink-dark border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
            <div className="p-8">
                <Link href="/" className="block">
                    <span className="text-2xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                        Relink<span className="text-relink-purple-base">.</span>
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1 font-[family-name:var(--font-relink-neue)]">
                        Agency Admin
                    </span>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300",
                                isActive
                                    ? "bg-relink-purple-base/10 text-relink-purple-base"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <div className="flex items-center gap-3 font-[family-name:var(--font-relink-neue)] text-sm font-medium">
                                <item.icon className={cn("w-4 h-4", isActive ? "text-relink-purple-base" : "text-white/40 group-hover:text-white/80")} />
                                {item.title}
                            </div>
                            {isActive && <div className="w-1 h-1 rounded-full bg-relink-purple-base" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-white/5">
                <button className="w-full flex items-center justify-between px-4 py-3 text-white/40 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                    <div className="flex items-center gap-3 font-[family-name:var(--font-relink-neue)] text-sm font-medium">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </div>
                </button>
            </div>
        </div>
    );
}
