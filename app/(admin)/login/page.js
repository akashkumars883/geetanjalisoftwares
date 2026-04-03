'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, error
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fcfcfc] px-4">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-orange-400/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-orange-600/5 blur-[120px]" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block text-2xl font-bold tracking-tight text-black">
            Geetanjali <span className="font-normal text-black/50">Admin</span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-black">Welcome Back</h1>
          <p className="mt-2 text-sm text-black/40">Enter your secure password to access the panel.</p>
        </div>

        <div className="rounded-[32px] border border-black/5 bg-white p-1 shadow-2xl shadow-black/5">
          <div className="rounded-[28px] border border-black/[0.03] bg-[#fcfcfc] p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black/40 mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-black/30">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-14 w-full rounded-2xl border border-black/10 bg-white px-12 text-sm text-black outline-none transition focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-black text-sm font-bold text-white transition hover:bg-black/90 active:scale-[0.98] disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'loading' ? 'Verifying...' : 'Access Dashboard'}
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-orange-600/0 via-orange-600/20 to-orange-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>

              {status === 'error' && (
                <div className="flex items-center gap-3 rounded-xl bg-red-500/10 p-4 text-sm font-medium text-red-600 border border-red-500/20">
                  <ShieldCheck size={18} />
                  Security: Invalid password detected.
                </div>
              )}
            </form>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-black/30">
          Geetanjali Softwares &copy; 2026. All rights reserved.
        </p>
      </div>
    </div>
  );
}
