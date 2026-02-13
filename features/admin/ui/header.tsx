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
    LogOut,
    User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    {
        title: 'Overview',
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
        title: 'Articles',
        href: '/admin/articles',
        icon: FileText,
    },
    {
        title: 'Media',
        href: '/admin/media',
        icon: ImageIcon,
    }
];

export function AdminHeader() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0D13]/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link href="/" className="group">
                        <span className="text-2xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                            Relink<span className="text-relink-purple-base">.</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 font-[family-name:var(--font-relink-neue)]",
                                        isActive
                                            ? "bg-relink-purple-base/10 text-relink-purple-base"
                                            : "text-white/40 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                        <div className="w-6 h-6 rounded-full bg-relink-purple-base/20 flex items-center justify-center text-[10px] text-relink-purple-base font-bold">
                            RA
                        </div>
                        <span className="text-[11px] text-white/60 font-medium font-[family-name:var(--font-relink-neue)]">
                            Admin
                        </span>
                    </div>

                    <button className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
