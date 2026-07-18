'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { y: 150, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <section className="relative flex h-auto sm:h-screen w-full flex-col justify-start overflow-hidden bg-background pt-0 pb-20 sm:pt-4 sm:pb-12">

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2 sm:gap-6"
        >
          {/* Small Top Label */}
          <div className="overflow-hidden mb-2 sm:mb-0">
            <motion.div variants={textVariants} className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-primary"></span>
              <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60 sm:text-xs">
                Technology & Growth Partner
              </span>
            </motion.div>
          </div>

          {/* SEO Optimized Single H1 with Animated Spans */}
          <h1 className="flex flex-col">
            <div className="overflow-hidden">
              <motion.span
                variants={textVariants}
                className="block font-heading text-[11vw] font-bold uppercase leading-[1.0] tracking-tighter text-foreground sm:text-[10vw] md:text-[8rem] lg:text-[9.5rem]"
              >
                ENGINEERING
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                variants={textVariants}
                className="block font-heading text-[11vw] font-bold uppercase leading-[1.0] tracking-tighter text-foreground sm:text-[10vw] md:text-[8rem] lg:text-[9.5rem]"
              >
                DIGITAL FUTURES
              </motion.span>
            </div>
          </h1>

          <div className="mt-6 flex flex-col justify-between gap-6 border-t border-foreground/15 pt-6 sm:mt-6 sm:flex-row sm:items-end md:mt-6 sm:gap-8 sm:pt-8">
            <div className="overflow-hidden w-full sm:max-w-md">
              <motion.p
                variants={textVariants}
                className="text-sm font-medium leading-relaxed text-foreground/70 sm:text-base"
              >
                We engineer scalable digital experiences, high-performance websites, and data-driven marketing strategies that accelerate business growth.
              </motion.p>
            </div>

            <div className="overflow-hidden pb-4 w-full sm:w-auto">
              <motion.div variants={textVariants} className="w-full">
                <Link
                  href="/#contact-form"
                  onClick={(e) => {
                    window.dispatchEvent(new CustomEvent('open-enquiry-popup', { detail: { service: 'Hero CTA' } }));
                  }}
                  className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-4 overflow-hidden rounded-full bg-foreground px-8 py-5 font-heading text-sm font-bold uppercase tracking-wider text-background transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    Start a Project
                  </span>
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <ArrowRight size={16} className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                  </span>
                  <div className="absolute inset-0 z-0 h-full w-full scale-x-0 transform bg-primary transition-transform duration-500 origin-left group-hover:scale-x-100" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee in normal flow */}
      <div className="relative mt-12 sm:mt-16 flex w-full overflow-hidden border-y border-foreground/10 bg-background py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-4 flex items-center gap-8 font-heading text-[10px] font-bold uppercase tracking-widest text-foreground/40 sm:text-xs">
              WEBSITE DEVELOPMENT
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              SEO & SEARCH GROWTH
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              CUSTOM WEB APPS
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              DIGITAL MARKETING
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
