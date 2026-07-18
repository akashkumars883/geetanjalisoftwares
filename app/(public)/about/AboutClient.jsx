'use client';

import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  };

  const stagger = {
    whileInView: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="bg-background">
      <motion.section
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={stagger}
        className="relative pb-12 pt-2 sm:pb-20 sm:pt-4 border-b border-foreground/10"
      >
        <div className="mx-auto max-w-7xl px-6 text-left">
          <motion.div variants={fadeInUp} className="flex justify-start items-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-primary"></span>
            <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60">
              About Geetanjali Softwares
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="mt-6 font-heading text-5xl sm:text-7xl lg:text-[8rem] font-bold uppercase tracking-tighter text-foreground leading-[0.85]"
          >
            BUILDING <br className="hidden sm:block" />
            <span className="text-primary">RESILIENCE</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl font-medium"
          >
            We don't just build websites; we build digital systems that help businesses look better, communicate clearer, and grow faster in a modern digital landscape. Our approach blends strategic thinking with technical precision to deliver solutions that endure.
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-16 sm:py-24 bg-background"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              variants={fadeInUp}
              className="relative aspect-square overflow-hidden bg-foreground/5 border border-foreground/10"
            >
              <Image
                src="/images/akash.jpg"
                alt="Akash - Founder of Geetanjali Softwares"
                width={600}
                height={600}
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-background/80 p-6 backdrop-blur-xl border border-foreground/10">
                <p className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">Akash</p>
                <p className="font-heading text-[10px] font-bold text-primary uppercase tracking-widest mt-2">
                  Founder & Digital Strategist
                </p>
              </div>
            </motion.div>

            <div className="max-w-xl">
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground leading-tight"
              >
                THE VISION BEHIND <br /> <span className="text-primary">THE WORK</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mt-8 text-lg leading-relaxed text-foreground/70"
              >
                I started Geetanjali Softwares with a simple goal: to help businesses stop
                "blending in" and start "standing out" online. As a solo
                strategist, I work directly with you to ensure every pixel, word, and campaign
                is aligned with your business growth.
              </motion.p>
              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                <motion.div
                  variants={fadeInUp}
                  className="border border-foreground/10 bg-foreground/5 p-8 transition-colors hover:border-primary"
                >
                  <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">
                    01. Dedication
                  </p>
                  <p className="mt-4 text-base text-foreground/80 leading-relaxed font-medium">
                    "Direct collaboration, no middle-men. Your project is my priority."
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="border border-foreground/10 bg-foreground/5 p-8 transition-colors hover:border-primary"
                >
                  <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">
                    02. Strategy
                  </p>
                  <p className="mt-4 text-base text-foreground/80 leading-relaxed font-medium">
                    "Every solution is bespoke, built around your specific niche and goals."
                  </p>
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