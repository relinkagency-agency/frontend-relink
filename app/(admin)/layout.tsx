/** @format */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase,
    Settings,
    FileText,
    Image as ImageIcon,
    LayoutDashboard,
    ExternalLink,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: Briefcase },
    { name: 'Services', href: '/admin/services', icon: Settings },
    { name: 'Articles', href: '/admin/articles', icon: FileText },
    { name: 'Media', href: '/admin/media', icon: ImageIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[#0B0D13] text-white selection:bg-amber-500/30 selection:text-amber-200">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
                <nav className="flex items-center gap-1 p-1 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-none shadow-2xl">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 rounded-none text-sm font-medium transition-all duration-300 flex items-center gap-2 group",
                                    isActive ? "text-[#0B0D13]" : "text-white/40 hover:text-white/70"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-amber-50 rounded-none"
                                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                    />
                                )}
                                <item.icon className={cn("w-4 h-4 transition-colors relative z-10", isActive ? "text-[#0B0D13]" : "text-white/20 group-hover:text-white/40")} />
                                <span className="hidden sm:inline font-[family-name:var(--font-relink-neue)] relative z-10">{item.name}</span>
                            </Link>
                        );
                    })}

                    <div className="w-[1px] h-4 bg-white/10 mx-2 hidden sm:block" />

                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/40 hover:text-white transition-all duration-300 font-[family-name:var(--font-relink-neue)] group"
                    >
                        <span className="hidden sm:inline">Site</span>
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </nav>
            </header>

            <main className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
                {/* Breadcrumb - Square style */}
                <div className="flex items-center gap-2 mb-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/20 font-[family-name:var(--font-relink-neue)]">
                    <Link href="/admin" className="hover:text-amber-500 transition-colors">Relink</Link>
                    {pathname !== '/admin' && (
                        <>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white/40">{pathname.split('/').pop()}</span>
                        </>
                    )}
                </div>

                {children}
            </main>

            <footer className="fixed bottom-6 right-8 z-40">
               
            </footer>
        </div>
    );
}
