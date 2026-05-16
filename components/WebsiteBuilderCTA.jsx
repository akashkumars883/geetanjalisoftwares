'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Layout, Search, Globe } from 'lucide-react';

export default function WebsiteBuilderCTA() {
  return (
    <section id="ai-builder" className="relative scroll-mt-28 pt-8 pb-6 sm:pt-12 sm:pb-10 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Style matching ServicesSection */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-600">
              AI Innovation
            </span>
            <h2 className="mt-4 text-4xl font-normal leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
              AI Website <br/> Builder
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl"
          >
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Launch your professional business presence in 60 seconds. Our AI-driven studio handles the design, copywriting, and SEO automatically. Experience premium no-code development.
            </p>
          </motion.div>
        </div>

        {/* Content Section - Minimalist Split */}
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="flex flex-col gap-8">
              {[
                { title: "Instant Deployment", desc: "Your site is live on a custom subdomain instantly.", icon: Zap },
                { title: "SEO Optimized Content", desc: "AI writes high-ranking copy for your business.", icon: Search },
                { title: "Mobile Responsive", desc: "Perfect viewing experience on every device.", icon: Globe }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 border-l border-black/10 pl-8 transition-colors hover:border-orange-600 group"
                >
                  <div className="mt-1 text-orange-600 opacity-50 group-hover:opacity-100 transition-opacity">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xl font-normal text-slate-900">{item.title}</h4>
                    <p className="mt-2 text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:-translate-y-1"
                >
                  Start Building For Free <ArrowRight size={18} />
                </Link>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-md w-full"
            >
              <div className="relative overflow-hidden rounded-[32px] bg-stone-100 border border-stone-200 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]">
                <img
                  src="/images/studio-mockup.png"
                  alt="Free Website Builder Preview Mockup"
                  className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-orange-600 border border-black/5">
                  <Sparkles size={18} className="animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
