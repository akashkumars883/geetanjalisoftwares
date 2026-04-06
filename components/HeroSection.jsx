'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.section 
      initial="initial"
      animate="animate"
      className="relative mb-24 overflow-hidden pb-14 pt-2"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div 
            variants={stagger}
            className="flex flex-col items-start text-left lg:items-start lg:text-left"
          >
            <motion.h1 
              variants={fadeInUp}
              className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Empowering Brands with scalable <span className="inline font-serif text-orange-500 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"> digital marketing </span> solutions
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="mt-6 max-w-2xl text-sm leading-relaxed text-black/60 sm:text-base lg:text-lg"
            >
              From modern websites to digital marketing and branding, we design fast, SEO-friendly solutions that help you attract more customers and increase your revenue.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/#contact-form"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-10 py-5 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition hover:bg-orange-600 hover:scale-105 active:scale-95 sm:w-auto"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/#portfolio"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-10 py-5 text-sm font-bold text-black transition hover:bg-black/5 hover:scale-105 active:scale-95 sm:w-auto"
              >
                View Portfolio
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center lg:items-end lg:text-right"
          >
            <div className="relative w-full max-w-sm lg:max-w-md">
              <div className="absolute inset-0 bg-orange-500/5 blur-[80px]" />
              <Image
                src="/images/hero_main.png"
                alt="Digital Marketing and Web Development Illustration"
                width={500}
                height={500}
                priority
                className="relative h-auto w-full object-contain remove-background transition duration-700 hover:rotate-2 hover:scale-110"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-orange-500 sm:bottom-1"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 13 6 6 6-6" />
        </svg>
      </motion.div>
    </motion.section>
  );
}
