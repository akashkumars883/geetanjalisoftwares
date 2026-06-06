'use client';

import { motion } from 'framer-motion';

export default function WhoWeAreSection() {
  return (
    <section id="about" className="relative w-full bg-transparent pt-8 pb-6 sm:pt-12 sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          
          {/* Left Side: Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-600">
              Who We Are
            </span>
            <h2 className="mt-4 text-3xl font-normal leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              We engineer digital success for ambitious brands.
            </h2>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl lg:pt-10"
          >
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              At Geetanjali Softwares, we don&apos;t just build websites; we create digital ecosystems. 
              By combining cutting-edge web development, intuitive UX/UI design, and data-driven SEO strategies, 
              we help businesses scale faster, attract better clients, and dominate their industry online.
            </p>
            <div className="mt-8 flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-3xl font-semibold text-slate-900">5+</span>
                <span className="text-sm font-medium text-slate-500 mt-1">Years Experience</span>
              </div>
              <div className="h-10 w-px bg-black/10"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold text-slate-900">50+</span>
                <span className="text-sm font-medium text-slate-500 mt-1">Client Projects</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
