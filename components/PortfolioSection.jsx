'use client';

import { motion } from "framer-motion";

const portfolioItems = [
  {
    title: 'E-commerce Revenue Optimization',
    category: 'Website Development',
    description:
      'A high-performance online store built to convert visitors into customers through strategic UI and fast loading.',
  },
  {
    title: 'Real Estate Lead Generation',
    category: 'Digital Marketing',
    description:
      'A targeted marketing system designed to capture high-quality enquiries for premium property listings.',
  },
  {
    title: 'Corporate Identity Design',
    category: 'Branding',
    description:
      'A complete visual refresh for a modern consulting firm, focusing on consistency and professional trust.',
  },
];

export default function PortfolioSection() {
  const containerVariants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="portfolio" className="scroll-mt-28 pb-16 sm:pb-20">
      <motion.div 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.p variants={itemVariants} className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
              Portfolio
            </motion.p>
            <motion.h2 variants={itemVariants} className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
              Work shaped around real business needs.
            </motion.h2>
          </div>
          <motion.p variants={itemVariants} className="max-w-xl text-sm leading-7 text-black/70 sm:text-base">
            Each project is built to improve how a business looks, communicates, and performs online.
          </motion.p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <motion.article
              key={item.title}
              variants={itemVariants}
              className="group overflow-hidden rounded-3xl border border-black/[0.03] bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5 backdrop-blur-xl sm:p-8"
            >
              <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl bg-stone-50">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent blur-3xl opacity-50" />
                <img
                  src={`/images/portfolio_${item.category.toLowerCase().includes("website") ? "web" : item.category.toLowerCase().includes("marketing") ? "marketing" : "branding"}.png`}
                  alt={item.title}
                  className="h-full w-full object-contain remove-background transition duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
              </div>
              <span className="inline-flex rounded-lg border border-black/5 bg-stone-100 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-black/40">
                {item.category}
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-black sm:text-2xl group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-black/60">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
