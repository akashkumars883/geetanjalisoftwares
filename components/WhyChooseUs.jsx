'use client';

import { Zap, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const whyChooseUs = [
  {
    icon: <Zap className="h-6 w-6 text-orange-600" />,
    title: '10x Faster Deployment',
    benefit: 'Get your business live in days, not months.',
    proof: 'Trusted by 50+ businesses for rapid scaling.',
    ctaLabel: 'Start Scaling',
  },
  {
    icon: <Target className="h-6 w-6 text-orange-600" />,
    title: 'Data-Driven Marketing',
    benefit: 'Every click is tracked, every lead verified.',
    proof: 'Average 45% increase in conversion rates.',
    ctaLabel: 'See Strategy',
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
    title: 'ROI-Focused Growth',
    benefit: 'Systems that generate revenue automatically.',
    proof: '100% Client satisfaction with long-term ROAS.',
    ctaLabel: 'Build My Funnel',
  },
];

export default function WhyChooseUs() {
  const containerVariants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="why-choose-us" className="scroll-mt-28 pb-16 sm:pb-20">
      <motion.div 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div className="max-w-2xl">
            <motion.p variants={itemVariants} className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
              Why Choose Us
            </motion.p>
            <motion.h2 variants={itemVariants} className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
              Strategies That Scale Your Business to New Heights
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-orange-500/5 blur-[80px]" />
            <img
              src="/images/why_choose_us_new.png"
              alt="Premium 3D Success Illustration"
              className="relative mx-auto h-auto w-[360px] object-contain remove-background transition-transform duration-700 group-hover:rotate-3 group-hover:scale-110"
            />
          </motion.div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => (
            <motion.article
              key={item.title}
              variants={itemVariants}
              className="group flex flex-col rounded-3xl border border-black/[0.03] bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5 backdrop-blur-xl sm:p-8"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/5 transition-all duration-500 group-hover:bg-orange-500 group-hover:text-white">
                <div className="group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-black sm:text-2xl group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>

              <div className="mt-6 flex flex-col gap-4 flex-1">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">Primary Benefit</p>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">
                    {item.benefit}
                  </p>
                </div>

                <div className="rounded-2xl border border-black/[0.02] bg-stone-50/50 p-4 transition-colors group-hover:bg-orange-500/[0.02]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">Verified Result</p>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-black/70">
                    {item.proof}
                  </p>
                </div>
              </div>

              <Link
                href="/services"
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-black px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-600 hover:scale-[1.02] active:scale-95 sm:w-auto"
              >
                {item.ctaLabel}
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
