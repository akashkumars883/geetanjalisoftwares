'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SaasDashboardVisual from './SaasDashboardVisual';

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <section className="relative overflow-hidden pb-16 pt-4 sm:pb-24 sm:pt-8">
      <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-blue-500/12 blur-[140px]" />
      <div className="absolute right-[-8rem] top-[8rem] h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-start text-left"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-700 shadow-sm sm:text-xs"
            >
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              SaaS automation platform
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.02]"
            >
              Build, automate, and scale your Instagram SaaS from one unified dashboard.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:text-lg"
            >
              Launch an AI-driven automation stack with plan-based features, promo code discounts, live usage tracking, influencer workflows, and a mobile-first control panel.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/automixa"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-[0_20px_50px_rgba(37,99,235,0.25)] transition hover:bg-blue-700 hover:scale-[1.02] active:scale-95 sm:w-auto"
              >
                Explore Automixa
              </Link>
              <Link
                href="/#features"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-blue-200 bg-white/85 px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-blue-50 hover:scale-[1.02] active:scale-95 sm:w-auto"
              >
                See Main Features
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 grid w-full gap-3 sm:grid-cols-3">
              {[
                ['Plan gating', 'Unlock features per plan'],
                ['Promo codes', 'Discounts with validation'],
                ['Live visuals', 'Code-made dashboard previews'],
              ].map(([title, text]) => (
                <div key={title} className="glass-panel rounded-[24px] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700">{title}</p>
                  <p className="mt-2 text-sm text-slate-600">{text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <SaasDashboardVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
