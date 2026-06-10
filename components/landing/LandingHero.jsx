'use client';

import React, { useEffect, useRef } from 'react';

const stats = [
  { label: 'Websites Delivered', value: '50+' },
  { label: 'Google Rating', value: '⭐ 4.9' },
  { label: 'Client Satisfaction', value: '100%' },
  { label: 'Avg. Delivery', value: '7 Days' },
];

export default function LandingHero() {
  const phoneNumber = '917508657479';
  const whatsappMsg = encodeURIComponent('Hi Geetanjali Softwares! I need a professional website for my business.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMsg}`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#0F1A2E] to-[#1A1040]">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] animate-pulse rounded-full bg-[#6366f1] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] animate-pulse rounded-full bg-[#22c55e] blur-[100px] delay-1000" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6366f1]/30 bg-[#6366f1]/10 px-4 py-1.5 text-sm font-medium text-[#818cf8]">
              <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
              Faridabad's Trusted Web Agency
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get a Premium{' '}
              <span className="bg-gradient-to-r from-[#818cf8] to-[#22c55e] bg-clip-text text-transparent">
                Website in 7 Days
              </span>
              <br />
              Starting at{' '}
              <span className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent">
                ₹5,999
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg leading-relaxed text-slate-300 lg:text-xl">
              Custom-designed, SEO-optimized, mobile-friendly websites for Faridabad businesses.{' '}
              <span className="font-semibold text-white">No hidden charges.</span>{' '}
              <span className="font-semibold text-[#22c55e]">100% satisfaction guaranteed.</span>
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#lead-form"
                className="group relative inline-flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#6366f1] to-[#22c55e] px-8 text-base font-bold text-white shadow-2xl transition-all hover:scale-105 active:scale-95 sm:w-auto"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">🚀 Get Free Quote</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-slate-600 px-8 text-base font-semibold text-white transition-all hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366] sm:w-auto"
              >
                💬 Chat on WhatsApp
              </a>
            </div>

            {/* Stats Counter */}
            <div className="mt-12 grid grid-cols-2 gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Hero Visual */}
          <div className="relative hidden lg:block">
            {/* Premium website mockup */}
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
              <div className="absolute inset-0 rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
                {/* Browser bar */}
                <div className="flex items-center gap-2 border-b border-slate-700 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="ml-4 flex-1 rounded-md bg-slate-700 px-3 py-1.5 text-xs text-slate-400">
                    geetanjalisoftwares.in
                  </div>
                </div>
                {/* Mock content */}
                <div className="p-6">
                  <div className="mb-4 h-4 w-3/4 rounded bg-slate-700" />
                  <div className="mb-3 h-3 w-1/2 rounded bg-slate-700" />
                  <div className="mb-6 h-3 w-2/3 rounded bg-slate-700" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-[#6366f1]/30 to-[#22c55e]/30" />
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-[#f59e0b]/30 to-[#6366f1]/30" />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="h-8 flex-1 rounded-lg bg-[#6366f1]/20" />
                    <div className="h-8 flex-1 rounded-lg bg-slate-700" />
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-[#22c55e]/30 bg-[#22c55e]/10 px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#22c55e]">
                  <span>✅ SEO Optimized</span>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/10 px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#fbbf24]">
                  <span>⚡ 7 Day Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}