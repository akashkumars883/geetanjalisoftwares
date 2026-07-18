'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function WhoWeAreSection() {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <section id="who-we-are" className="relative w-full bg-background pb-12 sm:pb-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">

        <div className="flex flex-col gap-10 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-4"
          >
            <motion.div variants={textVariants} className="flex items-center gap-3">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-foreground/60">
                Who We Are
              </span>
            </motion.div>
            <motion.h2
              variants={textVariants}
              className="font-heading text-6xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-foreground leading-[0.9]"
            >
              THE AGENCY
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
            className="flex flex-col gap-8"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.3] text-foreground">
              We engineer scalable digital solutions that drive business growth. At Geetanjali Softwares, we don&apos;t just build websites—we architect high-performance digital ecosystems.
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/60 max-w-3xl">
              As a strategic technology partner, we bridge the gap between design, development, and marketing. By combining robust web architecture, intuitive user experiences, and data-driven SEO strategies, we empower ambitious brands to scale their operations and dominate their industry. Our commitment is to deliver secure, future-proof digital assets that generate measurable ROI.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-12">
              <Link
                href="/about"
                className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                <span className="relative overflow-hidden">
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">More About Us</span>
                  <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-primary">More About Us</span>
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-background">
                  <ArrowUpRight size={16} />
                </div>
              </Link>

              {/* Stats */}
              <div className="flex gap-10 border-t sm:border-t-0 sm:border-l border-foreground/10 pt-8 sm:pt-0 sm:pl-10 w-full sm:w-auto">
                <div className="flex flex-col">
                  <span className="font-heading text-4xl font-bold text-foreground">5+</span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-foreground/50 mt-2">Years Exp.</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-4xl font-bold text-foreground">50+</span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-foreground/50 mt-2">Projects</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
