'use client';

import { Zap, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const whyChooseUs = [
  {
    icon: Zap,
    title: '10x Faster Deployment',
    description: 'Get your business live in days, not months. We streamline development without compromising on quality or performance.',
    proof: 'Trusted by 50+ businesses for rapid scaling.',
  },
  {
    icon: Target,
    title: 'Data-Driven Marketing',
    description: 'Every click is tracked, every lead verified. We build marketing strategies that guarantee measurable ROI.',
    proof: 'Average 45% increase in conversion rates.',
  },
  {
    icon: TrendingUp,
    title: 'ROI-Focused Growth',
    description: 'Systems that generate revenue automatically. We focus strictly on the bottom line: making your business more profitable.',
    proof: '100% Client satisfaction with long-term ROAS.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative w-full bg-transparent pt-8 pb-6 sm:pt-12 sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-12">
          {/* Left Side: Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-600">
              The Advantage
            </span>
            <h2 className="mt-4 text-4xl font-normal leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
              Why Choose Us
            </h2>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl"
          >
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              We combine rapid execution with strategic precision. Instead of treating projects like simple tasks, we operate as your dedicated growth partners to ensure every deliverable drives revenue.
            </p>
          </motion.div>
        </div>

        {/* Bottom Features Grid (Clean, Cardless Design) */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col pt-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-600">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-8 text-2xl font-normal tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <div className="mt-auto pt-8">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                    <span className="text-sm font-semibold text-slate-800">
                      {item.proof}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
