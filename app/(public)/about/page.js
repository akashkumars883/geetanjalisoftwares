'use client';

import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import { motion } from "framer-motion";
import Image from "next/image";

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
        className="relative py-12 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-wider text-orange-600 sm:text-sm">
            About Geetanjali Softwares
          </motion.p>
          <motion.h1 variants={fadeInUp} className="mt-6 text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl lg:text-7xl leading-[1.15]">
            Helping businesses build a <br className="hidden sm:block" /> 
            <span className="text-slate-500">confident digital presence.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
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
        className="py-12 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div 
              variants={fadeInUp}
              className="relative aspect-square overflow-hidden rounded-[40px] bg-slate-100 border border-black/5"
            >
              <Image 
                src="/images/founder_placeholder.png" 
                alt="Akash - Founder of Geetanjali Softwares" 
                width={500}
                height={500}
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-6 backdrop-blur-xl border border-black/5 shadow-sm">
                <p className="text-lg font-semibold text-slate-900">Akash</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Founder & Digital Strategist</p>
              </div>
            </motion.div>
            
            <div className="max-w-xl">
              <motion.h2 variants={fadeInUp} className="text-3xl font-normal tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                The Vision Behind the Work
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
                I started Geetanjali Softwares with a simple goal: to help businesses stop &quot;blending in&quot; and start &quot;standing out&quot; online. As a solo strategist, I work directly with you to ensure every pixel, word, and campaign is aligned with your business growth.
              </motion.p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <motion.div variants={fadeInUp} className="rounded-2xl border border-black/5 bg-slate-50 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">Dedication</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">&quot;Direct collaboration, no middle-men. Your project is my priority.&quot;</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="rounded-2xl border border-black/5 bg-slate-50 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">Strategy</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">&quot;Every solution is bespoke, built around your specific niche and goals.&quot;</p>
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
