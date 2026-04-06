'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FinalCtaSection() {
  return (
    <section className="pb-16 sm:pb-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl rounded-[40px] bg-[#111111] p-8 text-white shadow-2xl sm:p-12 lg:p-16 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 text-[120px] opacity-[0.03] select-none pointer-events-none">✨</div>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between relative z-10">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.div 
              initial={{ rotate: -10, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5"
            >
              <div className="absolute inset-0 rounded-2xl bg-orange-500/20 blur-xl" />
              <img
                src="/images/cta_final.png"
                alt="Final CTA Visual"
                className="relative h-12 w-12 object-contain remove-background"
              />
            </motion.div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              Get Started
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1]">
              Ready to improve your website, digital marketing, or branding?
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/50 sm:text-base max-w-xl">
              Let&apos;s build a stronger digital presence with the right mix of strategy, design, and execution.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-10 py-5 text-sm font-bold text-black shadow-xl transition hover:bg-orange-500 hover:text-white hover:scale-105 active:scale-95 sm:w-auto"
            >
              Start Your Project
            </Link>
            <Link
              href="/about"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-sm font-bold text-white transition hover:bg-white/10 hover:scale-105 active:scale-95 sm:w-auto"
            >
              About Us
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
