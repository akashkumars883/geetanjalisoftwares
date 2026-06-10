'use client';

import React from 'react';

const steps = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: '1. Tell Us Your Vision',
    description: 'Share your business needs, preferences, and examples you like. We listen carefully to understand your brand.',
    color: 'from-[#6366f1] to-[#818cf8]',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: '2. We Design & Develop',
    description: 'Our team creates a custom, mobile-friendly, SEO-optimized website. You get a live demo to review before launch.',
    color: 'from-[#22c55e] to-[#4ade80]',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: '3. Launch & Grow',
    description: 'We handle hosting, domain setup, and Google indexing. Your website goes live — ready to attract customers!',
    color: 'from-[#f59e0b] to-[#fbbf24]',
  },
];

export default function LandingProcess() {
  return (
    <section className="relative bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            How It Works —{' '}
            <span className="bg-gradient-to-r from-[#818cf8] to-[#22c55e] bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            From idea to launch in just 7 days. No complexity, no confusion — just results.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="group relative">
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-0.5 w-full bg-gradient-to-r from-slate-700 to-transparent md:block" />
              )}

              <div className="relative flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} p-4 shadow-lg transition-transform group-hover:scale-110`}>
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>

                {/* Step Number */}
                <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#6366f1]/20 text-sm font-bold text-[#818cf8]">
                  {index + 1}
                </div>

                {/* Content */}
                <h3 className="mt-4 text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}