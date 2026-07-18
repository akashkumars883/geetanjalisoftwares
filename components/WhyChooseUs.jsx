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
    <section id="why-choose-us" className="relative w-full bg-background pt-12 pb-12 sm:pt-20 sm:pb-20 overflow-hidden border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-16 lg:pb-24 border-b border-foreground/10">
          {/* Left Side: Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-foreground/60">
                The Advantage
              </span>
            </div>
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-[7rem] font-bold uppercase tracking-tighter text-foreground leading-[0.9]">
              WHY <br /> CHOOSE US
            </h2>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl pb-4"
          >
            <p className="text-lg leading-relaxed text-foreground/70 sm:text-xl">
              We combine rapid execution with strategic precision. Instead of treating projects like simple tasks, we operate as your dedicated growth partners to ensure every deliverable drives revenue.
            </p>
          </motion.div>
        </div>

        {/* Bottom Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`group flex flex-col pt-12 pb-12 lg:pb-0 px-0 lg:px-12 border-b lg:border-b-0 lg:border-r border-foreground/10 ${index === 0 ? 'lg:pl-0' : ''} ${index === 2 ? 'lg:border-r-0 lg:pr-0' : ''}`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-background">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="mt-12 font-heading text-3xl font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-6 text-base leading-relaxed text-foreground/60">
                  {item.description}
                </p>
                <div className="mt-auto pt-10">
                  <div className="flex items-center gap-4 border-t border-foreground/10 pt-6 group-hover:border-primary/50 transition-colors duration-300">
                    <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span className="font-heading text-xs font-bold uppercase tracking-widest text-foreground/80">
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
