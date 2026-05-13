import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Layout, Zap, Search } from 'lucide-react';
import Image from 'next/image';

export default function WebsiteBuilderCTA() {
  return (
    <section className="relative overflow-hidden bg-transparent pt-10 pb-8 sm:pt-16 sm:pb-12">
      {/* Abstract Background Elements */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[40px] border border-black/5 bg-slate-50/50 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/5">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 items-center">

            <div className="max-w-2xl text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-600">
                <Sparkles size={14} className="animate-pulse" />
                New Product Launch
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-[1.2]">
                Build Your Website For <span className="text-orange-600 italic font-serif">Free</span> in 60 Seconds.
              </h2>
              <p className="mt-6 text-base text-slate-600 sm:text-lg leading-relaxed max-w-xl">
                Experience our AI-driven No-Code SaaS Builder. Whether you&apos;re a clinic, agency, or local business, launch a highly converting SEO-optimized website directly on our premium subdomains. No credit card required.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 bg-white/60 p-3.5 rounded-2xl border border-black/5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
                    <Zap size={18} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Instant Preview</span>
                </div>
                <div className="flex items-center gap-3 bg-white/60 p-3.5 rounded-2xl border border-black/5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
                    <Layout size={18} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Premium Themes</span>
                </div>
                <div className="flex items-center gap-3 bg-white/60 p-3.5 rounded-2xl border border-black/5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
                    <Search size={18} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">SEO Optimized</span>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/free-website"
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 px-8 py-5 text-sm font-semibold text-white shadow-xl shadow-orange-600/20 transition-all duration-300 hover:bg-orange-700 hover:-translate-y-0.5 active:scale-95 sm:w-auto"
                >
                  Launch Free Builder
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Visual Showcase */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative w-full rounded-[32px] border border-black/5 bg-white/80 p-3 backdrop-blur-xl shadow-2xl shadow-black/5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-black/5 bg-white shadow-inner">
                  {/* Decorative elements representing the builder interface */}
                  <div className="absolute inset-0 flex flex-col">
                    <div className="h-12 border-b border-black/5 bg-white flex items-center px-5 gap-3">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-rose-400" />
                        <div className="h-3 w-3 rounded-full bg-amber-400" />
                        <div className="h-3 w-3 rounded-full bg-emerald-400" />
                      </div>
                      <div className="ml-4 h-6 w-56 rounded-md bg-slate-100" />
                    </div>
                    <div className="flex flex-1">
                      <div className="w-1/3 border-r border-black/5 bg-white p-5 flex flex-col gap-4">
                        <div className="h-4 w-24 bg-slate-200 rounded" />
                        <div className="h-10 w-full bg-white rounded-lg border border-slate-100 shadow-sm" />
                        <div className="h-4 w-32 bg-slate-200 rounded mt-2" />
                        <div className="h-10 w-full bg-white rounded-lg border border-slate-100 shadow-sm" />
                        <div className="mt-auto h-12 w-full bg-orange-600 rounded-xl shadow-md shadow-orange-600/20" />
                      </div>
                      <div className="w-2/3 p-6 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-orange-50/50 to-white">
                        <div className="h-10 w-3/4 bg-slate-200 rounded-lg mb-5 shadow-sm" />
                        <div className="h-4 w-1/2 bg-slate-100 rounded-md mb-10" />
                        <div className="flex gap-4 w-full px-6">
                          <div className="h-28 flex-1 bg-white rounded-2xl shadow-md border border-slate-100" />
                          <div className="h-28 flex-1 bg-white rounded-2xl shadow-md border border-slate-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
