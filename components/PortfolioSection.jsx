'use client';

import React from 'react';
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

const portfolioItems = [
  {
    title: 'Automixa: Instagram SaaS',
    category: 'SaaS / AI Automation',
    description: 'A Meta-integrated platform for automating Instagram engagement and lead generation.',
    tech: ['Next.js', 'Meta API', 'Supabase'],
    link: 'https://automixa.in',
    imageType: 'web'
  },
  {
    title: 'Fluxy: Ads Management',
    category: 'Marketing Tools',
    description: 'High-performance dashboard for managing complex Meta ad campaigns and analytics.',
    tech: ['React', 'D3.js', 'Node.js'],
    link: '#',
    imageType: 'marketing'
  },
  {
    title: 'LeadStream: Real Estate',
    category: 'Lead Generation',
    description: 'A conversion-focused portal for premium property listings and automated lead tracking.',
    tech: ['Next.js', 'PostgreSQL', 'Tailwind'],
    link: '#',
    imageType: 'marketing'
  },
  {
    title: 'ShopVerse: E-commerce',
    category: 'Online Commerce',
    description: 'Luxury shopping experience with optimized checkout flow and high-speed page loads.',
    tech: ['Shopify', 'Next.js', 'Sanity'],
    link: '#',
    imageType: 'web'
  },
  {
    title: 'BrandCore: Identity',
    category: 'Branding',
    description: 'Complete visual refresh and brand guidelines for a global consulting firm.',
    tech: ['Figma', 'Illustrator', 'Strategy'],
    link: '#',
    imageType: 'branding'
  },
  {
    title: 'NextFit: Wellness App',
    category: 'Mobile / Web App',
    description: 'Comprehensive fitness tracking platform with real-time data syncing.',
    tech: ['React Native', 'Firebase', 'AWS'],
    link: '#',
    imageType: 'branding'
  },
];

export default function PortfolioSection() {
  const containerVariants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="portfolio" className="scroll-mt-28 py-20 sm:py-32">
      <motion.div 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <motion.p variants={itemVariants} className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
            Our Portfolio
          </motion.p>
          <motion.h2 variants={itemVariants} className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
            Selected Masterpieces
          </motion.h2>
        </div>
        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, idx) => (
            <motion.article
              key={item.title}
              variants={itemVariants}
              className="group flex flex-col overflow-hidden rounded-[32px] border border-black/[0.03] bg-white shadow-xl shadow-black/[0.02] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5"
            >
              {/* Image Showcase */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-50">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-50" />
                <img
                  src={`/images/portfolio_${item.imageType}.png`}
                  alt={item.title}
                  className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-orange-500 hover:text-white"
                  >
                    View Project
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">
                    {item.category}
                  </span>
                  <div className="flex gap-2">
                    {item.tech.slice(0, 2).map(t => (
                      <span key={t} className="rounded-md border border-black/5 bg-stone-50 px-2 py-0.5 text-[8px] font-bold text-black/40 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="mt-4 text-xl font-bold tracking-tight text-black transition-colors group-hover:text-orange-600 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60">
                  {item.description}
                </p>

                <div className="mt-auto pt-8">
                  <a 
                    href={item.link}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/90 transition hover:text-orange-600"
                  >
                    Explore Case Study
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* Footer CTA */}
        <motion.div 
          variants={itemVariants}
          className="mt-20 flex flex-col items-center border-t border-black/5 pt-16 text-center"
        >
          <p className="text-xl font-medium text-black/70">
            Have a project in mind representing your vision?
          </p>
          <a
            href="#contact-form"
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-orange-500 px-10 py-5 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition hover:bg-orange-600 hover:scale-[1.05] active:scale-95"
          >
            Start Your Project Now
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
