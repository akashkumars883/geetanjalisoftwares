"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] overflow-hidden bg-white flex items-center justify-center text-center px-6 pt-16 pb-16 md:pt-20 md:pb-12">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover blur-[10px]"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Black gradient overlay scoped strictly to the video element */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 pointer-events-none" />

      {/* Hero Content with Framer Motion Entrance */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
        >
          We build software, AI &amp; automation solutions that move businesses forward.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl font-light leading-relaxed"
        >
          Geetanjali Softwares is a premier <strong>digital marketing agency</strong> and <strong>website development company in India &amp; USA</strong>. We build custom web applications, AI chatbots, CRM systems, <strong>SEO services</strong>, local SEO, and performance marketing solutions designed to scale your business globally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md text-sm font-bold tracking-wider bg-white text-black hover:bg-zinc-200 transition-all shadow-lg hover:scale-105"
          >
            Start a Project
            <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-md text-sm font-bold tracking-wider border border-white/30 text-white hover:bg-white/10 transition-all hover:scale-105"
          >
            View Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
