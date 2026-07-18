'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function FinalCtaSection() {
  return (
    <section className="relative w-full bg-primary pt-10 pb-10 sm:pt-14 sm:pb-14 overflow-hidden">
      {/* Background Pattern / Effect */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background via-transparent to-transparent"></div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >

          <h2 className="font-heading text-5xl sm:text-6xl lg:text-[7.5rem] font-bold uppercase tracking-tighter text-background leading-[0.85] mb-8">
            LET&apos;S BUILD SOMETHING GREAT
          </h2>

          <p className="text-base leading-relaxed text-background/80 sm:text-lg max-w-2xl mb-12">
            Partner with us to create a digital experience that captivates your audience and accelerates your business growth. The future starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full border border-background bg-background px-8 py-4 font-heading text-xs font-bold uppercase tracking-wider text-primary transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">
                Start Your Project
              </span>
              <span className="relative z-10 flex items-center justify-center">
                <ArrowUpRight size={16} />
              </span>
            </Link>

            <Link
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full border border-background/30 bg-transparent px-8 py-4 font-heading text-xs font-bold uppercase tracking-wider text-background transition-colors duration-300 hover:border-background hover:bg-background/10 active:scale-95"
            >
              <span className="relative z-10">
                View Our Work
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
