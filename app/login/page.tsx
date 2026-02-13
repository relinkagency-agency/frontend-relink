'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        await authClient.signIn.email({
            email,
            password,
            callbackURL: '/admin'
        }, {
            onSuccess: () => {
                router.push('/admin');
            },
            onError: (ctx) => {
                setLoading(false);
                setError(ctx.error.message);
            }
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-relink-bg text-white">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="w-full max-w-md p-8 space-y-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 relative z-10">
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-wider uppercase font-[family-name:var(--font-relink-neue)]">Admin </h1>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-white/60">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 p-3 text-sm focus:outline-none focus:border-relink-amber/50 transition-colors"
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-white/60">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 p-3 text-sm focus:outline-none focus:border-relink-amber/50 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-relink-amber text-black font-bold uppercase tracking-widest text-xs py-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
