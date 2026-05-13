'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FinalCtaSection() {
  return (
    <section className="pt-8 pb-8 sm:pt-12 sm:pb-12 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative overflow-hidden py-8 sm:py-12"
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between relative z-10">
            {/* Copy */}
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                Get Started
              </span>
              <h2 className="mt-3 text-3xl font-normal tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
                Ready to elevate your digital presence?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg max-w-xl">
                Let&apos;s build an impactful online identity with the perfect mix of strategy, high-end design, and robust execution.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-orange-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition active:scale-95 sm:w-auto hover:bg-orange-700"
              >
                Start Your Project
              </Link>
              <Link
                href="/about"
                className="inline-flex w-full items-center justify-center rounded-xl border border-black/5 bg-slate-50 px-8 py-4 text-sm font-semibold text-slate-900 transition active:scale-95 sm:w-auto hover:bg-white"
              >
                About Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
