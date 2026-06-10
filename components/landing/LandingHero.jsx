'use client';

import React from 'react';

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
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Light decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 opacity-60 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Faridabad's Trusted Web Agency
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Get a Premium{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Website in 7 Days
              </span>
              <br />
              Starting at{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                ₹5,999
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg leading-relaxed text-slate-600 lg:text-xl">
              Custom-designed, SEO-optimized, mobile-friendly websites for Faridabad businesses.{' '}
              <span className="font-semibold text-slate-900">No hidden charges.</span>{' '}
              <span className="font-semibold text-emerald-600">100% satisfaction guaranteed.</span>
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#lead-form"
                className="group relative inline-flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-8 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95 sm:w-auto"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">🚀 Get Free Quote</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-500 px-8 text-base font-semibold text-emerald-600 transition-all hover:bg-emerald-50 sm:w-auto"
              >
                💬 Chat on WhatsApp
              </a>
            </div>

            {/* Stats Counter */}
            <div className="mt-12 grid grid-cols-2 gap-6 rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm shadow-sm sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Hero Visual */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
              <div className="absolute inset-0 rounded-2xl border border-slate-200 bg-white shadow-xl">
                {/* Browser bar */}
                <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <div className="ml-4 flex-1 rounded-md bg-slate-100 px-3 py-1.5 text-xs text-slate-500">
                    yourbusiness.com
                  </div>
                </div>
                {/* Mock content */}
                <div className="p-6">
                  <div className="mb-4 h-4 w-3/4 rounded bg-slate-200" />
                  <div className="mb-3 h-3 w-1/2 rounded bg-slate-100" />
                  <div className="mb-6 h-3 w-2/3 rounded bg-slate-100" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-100 to-purple-100" />
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-amber-100 to-orange-100" />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="h-8 flex-1 rounded-lg bg-blue-50" />
                    <div className="h-8 flex-1 rounded-lg bg-slate-100" />
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <span>✅ SEO Optimized</span>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
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
