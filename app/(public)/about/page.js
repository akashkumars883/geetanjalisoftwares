'use client';

import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import { motion } from "framer-motion";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="pt-0">
      <motion.section 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={stagger}
        className="relative pb-16 pt-4 sm:pb-24 sm:pt-8"
      >
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-400/10 blur-[120px] -z-10" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-700 sm:text-sm">
            About Geetanjali Softwares
          </motion.p>
          <motion.h1 variants={fadeInUp} className="mt-6 text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-7xl">
            Helping businesses build a <br className="hidden sm:block" /> 
            <span className="text-black/60">confident digital presence.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="mx-auto mt-8 max-w-2xl text-base leading-8 text-black/70 sm:text-lg">
            We don&apos;t just build websites; we build digital systems that help businesses 
            look better, communicate clearer, and grow faster in a modern digital landscape.
          </motion.p>
        </div>
      </motion.section>

      <motion.section 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="pb-16 sm:pb-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div 
              variants={fadeInUp}
              className="relative aspect-square overflow-hidden rounded-[40px] bg-stone-100 border border-black/5"
            >
              <div className="absolute inset-0 bg-orange-500/5 blur-3xl opacity-50" />
              <img 
                src="/images/founder_placeholder.png" 
                alt="Akash - Founder of Geetanjali Softwares" 
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/70 p-4 backdrop-blur-xl border border-white/20">
                <p className="text-lg font-bold text-black">Akash</p>
                <p className="text-sm font-medium text-black/50 uppercase tracking-wider">Founder & Digital Strategist</p>
              </div>
            </motion.div>
            
            <div className="max-w-xl">
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                The Vision Behind the Work
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-6 text-lg leading-8 text-black/70">
                I started Geetanjali Softwares with a simple goal: to help businesses stop &quot;blending in&quot; and start &quot;standing out&quot; online. As a solo strategist, I work directly with you to ensure every pixel, word, and campaign is aligned with your business growth.
              </motion.p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <motion.div variants={fadeInUp} className="rounded-2xl border border-black/5 bg-[#f5f5f5]/50 p-6">
                  <p className="text-sm font-bold uppercase tracking-wider text-orange-700/80">Dedication</p>
                  <p className="mt-2 text-sm text-black/60 italic">&quot;Direct collaboration, no middle-men. Your project is my priority.&quot;</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="rounded-2xl border border-black/5 bg-[#f5f5f5]/50 p-6">
                  <p className="text-sm font-bold uppercase tracking-wider text-orange-700/80">Strategy</p>
                  <p className="mt-2 text-sm text-black/60 italic">&quot;Every solution is bespoke, built around your specific niche and goals.&quot;</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <WhyChooseUs />
      <TestimonialsSection />
      <FinalCtaSection />
    </div>
  );
}
