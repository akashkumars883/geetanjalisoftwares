'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight, MessageSquare, Camera, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function AutomixaSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <section className="relative overflow-hidden bg-stone-50 py-24 sm:py-32">
      {/* Background Accents */}
      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Content side */}
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col items-start"
          >
            {/* Meta Badge */}
            <motion.div 
              variants={fadeInUp}
              className="mb-8 flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 pr-5 shadow-sm"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <ShieldCheck size={14} fill="currentColor" fillOpacity={0.1} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black/60">Official Meta Graph API Partner</span>
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              className="max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-black sm:text-5xl lg:text-6xl"
            >
              Scale your <span className="font-serif italic text-blue-600">Instagram</span> engagement automatically.
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              className="mt-8 max-w-lg text-lg leading-relaxed text-black/60"
            >
              Automixa helps brands automate comment replies and DM conversations using AI that understands your brand voice. Convert followers into loyal leads while you sleep.
            </motion.p>

            <motion.ul 
              variants={stagger}
              className="mt-10 space-y-4"
            >
              {[
                "Instant AI Comment Replies",
                "Automated Lead Qualification",
                "Direct Instagram DM Automation",
                "Conversion-Focused Pipelines"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-sm font-bold text-black/70"
                >
                  <CheckCircle2 size={18} className="text-blue-600" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div 
              variants={fadeInUp}
              className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
            >
              <a
                href="https://automixa.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-8 py-5 text-sm font-bold text-white transition hover:bg-neutral-800 hover:scale-[1.02] active:scale-95 sm:w-auto"
              >
                Launch Automixa Now
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="/automixa"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-8 py-5 text-sm font-bold text-black transition hover:bg-black/5 hover:scale-[1.02] active:scale-95 sm:w-auto"
              >
                View Plans & Promo Codes
              </a>
              <span className="text-xs font-bold text-black/30">Free trial available for new creators</span>
            </motion.div>
          </motion.div>

          {/* Visualization side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* The Mockup */}
            <div className="relative mx-auto max-w-[400px] overflow-hidden rounded-[48px] border-[8px] border-black/5 bg-white shadow-2xl shadow-black/10">
              {/* Fake App UI */}
              <div className="bg-white p-6 pb-20">
                <div className="mb-8 flex items-center justify-between">
                  <Camera size={24} />
                  <div className="h-2 w-20 rounded-full bg-stone-100" />
                </div>
                
                {/* Fake Post */}
                <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex items-center justify-center">
                   <div className="flex flex-col items-center gap-4 text-center">
                      <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                        <MessageSquare size={32} className="text-blue-600" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-32 rounded-full bg-black/10 mx-auto" />
                        <div className="h-3 w-24 rounded-full bg-black/5 mx-auto" />
                      </div>
                   </div>
                </div>

                {/* Automation Popover */}
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-10 -right-4 max-w-[240px] rounded-2xl border border-blue-100 bg-white p-4 shadow-xl shadow-blue-500/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      <span className="text-[10px]">AI</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold leading-tight text-black">Automixa Replied</p>
                      <p className="mt-1 text-[10px] leading-snug text-black/50">&quot;Check your DM! I just sent the details you asked for ✨&quot;</p>
                    </div>
                  </div>
                </motion.div>

                <div className="mt-8 space-y-3">
                  <div className="h-2 w-full rounded-full bg-stone-50" />
                  <div className="h-2 w-2/3 rounded-full bg-stone-50" />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-8 top-1/4 rounded-2xl bg-white p-4 shadow-lg shadow-black/5"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-[10px] font-bold text-black/60">Live Automation</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
