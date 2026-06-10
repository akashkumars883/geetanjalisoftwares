'use client';

import React from 'react';

const projects = [
  {
    title: 'Sahaj Hospital',
    industry: 'Healthcare',
    description: 'Complete medical website with appointment booking, doctor profiles, and health blog.',
    image: null,
    gradient: 'from-[#6366f1] to-[#818cf8]',
    liveUrl: '#',
  },
  {
    title: 'E-Commerce Store',
    industry: 'Retail',
    description: 'Full-featured online store with payment gateway, product catalog, and order management.',
    image: null,
    gradient: 'from-[#22c55e] to-[#4ade80]',
    liveUrl: '#',
  },
  {
    title: 'Real Estate Portal',
    industry: 'Real Estate',
    description: 'Property listing website with advanced search, virtual tours, and agent profiles.',
    image: null,
    gradient: 'from-[#f59e0b] to-[#fbbf24]',
    liveUrl: '#',
  },
  {
    title: 'Restaurant Website',
    industry: 'Food & Hospitality',
    description: 'Mouth-watering restaurant site with online ordering, menu display, and table reservations.',
    image: null,
    gradient: 'from-[#ec4899] to-[#f472b6]',
    liveUrl: '#',
  },
];

export default function LandingPortfolio() {
  return (
    <section className="relative bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Our Recent{' '}
            <span className="bg-gradient-to-r from-[#818cf8] to-[#22c55e] bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Real websites we have built for real businesses. Your website could be next.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 hover:shadow-xl"
            >
              {/* Project Image / Gradient Placeholder */}
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl opacity-30">
                      {project.industry === 'Healthcare' ? '🏥' : project.industry === 'Retail' ? '🛒' : project.industry === 'Real Estate' ? '🏠' : '🍽️'}
                    </div>
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 opacity-0 transition-opacity group-hover:opacity-100">
                  <a
                    href={project.liveUrl}
                    className="rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-slate-900 transition-transform hover:scale-105"
                  >
                    View Project →
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#818cf8]">
                  {project.industry}
                </span>
                <h3 className="mt-2 text-lg font-bold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Want to see your business here?{' '}
            <a
              href="#lead-form"
              className="font-semibold text-[#818cf8] hover:text-[#6366f1]"
            >
              Get your website started →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}