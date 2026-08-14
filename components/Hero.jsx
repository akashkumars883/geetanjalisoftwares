"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] overflow-hidden bg-white flex items-center justify-center text-center px-6 pt-16 pb-16 md:pt-20 md:pb-12">
      {/* Light Clean Grid Lining Pattern Background */}
      <div className="absolute inset-0 bg-white">
        {/* Crisp Dark Linear Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000f_1px,transparent_1px),linear-gradient(to_bottom,#0000000f_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[140px] rounded-full pointer-events-none" />
      </div>

      {/* Hero Content with Framer Motion Entrance */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.15]"
        >
          We build software, AI &amp; automation solutions that move businesses forward.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-base sm:text-lg md:text-xl text-stone-600 max-w-3xl font-light leading-relaxed"
        >
          Geetanjali Softwares is a premier <strong className="text-stone-900 font-bold">digital marketing agency</strong> and <strong className="text-stone-900 font-bold">website development company in India &amp; USA</strong>. We build custom web applications, AI chatbots, CRM systems, <strong className="text-stone-900 font-bold">SEO services</strong>, local SEO, and performance marketing solutions designed to scale your business globally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md text-sm font-bold tracking-wider bg-black text-white hover:bg-zinc-800 transition-all shadow-md hover:scale-105"
          >
            Start a Project
            <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-md text-sm font-bold tracking-wider border border-stone-200 text-stone-900 hover:bg-stone-100 transition-all hover:scale-105"
          >
            View Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
