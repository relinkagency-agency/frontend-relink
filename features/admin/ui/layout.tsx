/** @format */

import { AdminHeader } from './header';

export function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0B0D13]">
            <AdminHeader />
            <main className="max-w-7xl mx-auto px-6 py-12 min-h-[calc(100vh-80px)]">
                {children}
            </main>
        </div>
    );
}
