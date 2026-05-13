'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-12 bg-transparent">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">

          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-start text-left lg:col-span-12 max-w-4xl"
          >
            <h1 className="text-5xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Empowering Brands with scalable <span className="text-orange-600">digital marketing</span> solutions
            </h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              From modern websites to digital marketing and branding, we design fast, SEO-friendly solutions that help you attract more customers and increase your revenue.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col w-full sm:w-auto sm:flex-row gap-4"
            >
              <Link
                href="/#contact-form"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-orange-600/20 transition-all duration-300 hover:bg-orange-700 hover:-translate-y-0.5 active:scale-95"
              >
                Get Free Consultation
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#portfolio"
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:-translate-y-0.5 active:scale-95"
              >
                View Portfolio
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={fadeInUp} className="mt-10 pt-6 border-t border-black/5 w-full max-w-2xl flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-700">5.0 Client Rating</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span className="text-xs font-semibold">100% ROI Tracked & Verified</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
