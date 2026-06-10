'use client';

import React from 'react';
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const portfolioItems = [
  {
    title: 'Automixa: AI Marketing Platform',
    category: 'AI Platform / Web Application',
    description: 'Autonomous AI marketing platform engineered to automate multi-channel campaigns, verify leads, and scale conversions with precision analytics.',
    tech: ['Next.js', 'AI Logic', 'Tailwind'],
    link: 'https://automixa.in',
    image: '/images/automixa_ui.png',
    imageClassName: 'h-full w-full scale-[1.2] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.25]',
    metrics: [
      { label: 'Conversion Growth', value: '+180%' },
      { label: 'Google Page Speed', value: '99/100' },
      { label: 'Campaigns Automated', value: '15k+' }
    ]
  },
  {
    title: 'Modern Living: Luxury E-Commerce',
    category: 'E-Commerce / UI/UX Design',
    description: 'High-speed immersive online shopping experience with an optimized checkout flow, premium product showcases, and seamless payment integration.',
    tech: ['Next.js', 'PostgreSQL', 'Tailwind'],
    link: 'https://modern-living.vercel.app',
    image: '/images/modern_living_ui.png',
    imageClassName: 'h-full w-full scale-[1.25] -translate-y-3 lg:scale-[1.3] lg:-translate-y-8 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.35]',
    metrics: [
      { label: 'Sales Uplift', value: '+240%' },
      { label: 'Page Load Speed', value: '0.8s' },
      { label: 'Monthly Revenue', value: '₹45L+' }
    ]
  }
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative w-full bg-transparent pt-8 pb-6 sm:pt-12 sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-12">
          {/* Left Side: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-600">
              Our Work
            </span>
            <h2 className="mt-3 text-3xl font-normal tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
              Selected Masterpieces
            </h2>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl text-left"
          >
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              We partner with ambitious brands to create digital platforms that captivate users and drive growth. Here are two of our benchmark case studies.
            </p>
          </motion.div>
        </div>

        {/* 2-Column Portfolio Showcase */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col text-left"
            >
              <a
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : '_self'}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                className="relative block w-full overflow-hidden rounded-xl bg-slate-100 aspect-[4/3] lg:aspect-[16/10]"
              >
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={item.imageClassName}
                  />
                </div>

                {/* Hover Arrow Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-orange-600 text-white shadow-2xl transition-transform duration-500 scale-50 group-hover:scale-100">
                    <ArrowUpRight className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={2} />
                  </div>
                </div>
              </a>

              {/* Item Details */}
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 sm:text-sm">
                    {item.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map(t => (
                      <span key={t} className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-semibold text-slate-600 uppercase tracking-wider sm:text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-normal tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  {item.title}
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-lg">
                {item.description}
              </p>

              {/* Client Metrics stats grid */}
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-black/5 pt-6">
                {item.metrics.map((metric, mIdx) => (
                  <div key={mIdx}>
                    <span className="block text-2xl font-bold tracking-tight text-orange-600 sm:text-3xl">
                      {metric.value}
                    </span>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Footer View All CTA */}
        <div className="mt-16 flex justify-center sm:mt-20">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-8 py-4 text-sm font-semibold text-slate-900 transition-colors hover:border-orange-600 hover:bg-orange-600 hover:text-white shadow-sm"
          >
            View All Masterpieces <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
