'use client';

import React from 'react';
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const portfolioItems = [
  {
    title: 'Automixa: AI Marketing Platform',
    category: 'SaaS / Marketing Automation',
    description: 'An AI-powered Instagram automation platform that instantly replies to comments and DMs. Designed to capture leads, deliver digital products, and grow creator audiences 24/7.',
    tech: ['Next.js', 'Meta API', 'Tailwind'],
    link: 'https://automixa.in',
    image: '/images/automixa_new.png',
    imageClassName: 'h-full w-full object-cover object-top transition-transform duration-1000 ease-out',
    metrics: [
      { label: 'Creators Trust', value: '10,000+' },
      { label: 'Bot Setup', value: '< 1 Min' },
      { label: 'ROI Growth', value: 'High' }
    ]
  },
  {
    title: 'Money Capital Finances',
    category: 'Fintech / NBFC Partner Platform',
    description: 'A comprehensive digital lending platform offering Personal, Business, and Home loans. Engineered for lightning-fast loan processing with integrated EMI calculators and priority advisory funnels.',
    tech: ['Next.js', 'Tailwind', 'Calculators'],
    link: 'https://www.moneycapitalfinances.com/',
    image: '/images/money_capital.png',
    imageClassName: 'h-full w-full object-cover object-top transition-transform duration-1000 ease-out',
    metrics: [
      { label: 'Loan Processing', value: '10x Faster' },
      { label: 'Banking Partners', value: '15+' },
      { label: 'Client Trust', value: '100%' }
    ]
  }
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative w-full bg-background pt-12 pb-12 sm:pt-20 sm:pb-20 overflow-hidden border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6">

        {/* Top Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-16 lg:pb-24 border-b border-foreground/10">
          {/* Left Side: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-foreground/60">
                Our Work
              </span>
            </div>
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-[7rem] font-bold uppercase tracking-tighter text-foreground leading-[0.9]">
              SELECTED <br /> MASTERPIECES
            </h2>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl text-left pb-4"
          >
            <p className="text-lg leading-relaxed text-foreground/70 sm:text-xl">
              We partner with ambitious brands to create digital platforms that captivate users and drive growth. Here are two of our benchmark case studies.
            </p>
          </motion.div>
        </div>

        {/* 2-Column Portfolio Showcase */}
        <div className="mt-16 grid grid-cols-1 gap-16 lg:mt-24 lg:grid-cols-2 lg:gap-12">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col text-left"
            >
              <a
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : '_self'}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                className="relative block w-full overflow-hidden bg-foreground/5 aspect-[4/3] lg:aspect-[4/3]"
              >
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={item.imageClassName}
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-background transition-transform duration-500 scale-50 group-hover:scale-100">
                    <ArrowUpRight className="h-10 w-10" strokeWidth={1.5} />
                  </div>
                </div>
              </a>

              {/* Item Details */}
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-heading text-xs font-bold uppercase tracking-widest text-primary">
                    {item.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map(t => (
                      <span key={t} className="border border-foreground/20 px-3 py-1 font-heading text-[10px] font-bold text-foreground/70 uppercase tracking-widest">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
              </div>

              <p className="mt-4 text-base leading-relaxed text-foreground/60 sm:text-lg">
                {item.description}
              </p>

              {/* Client Metrics stats grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-foreground/10 pt-8">
                {item.metrics.map((metric, mIdx) => (
                  <div key={mIdx}>
                    <span className="block font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {metric.value}
                    </span>
                    <span className="block text-[10px] font-semibold uppercase tracking-widest text-foreground/40 mt-2">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Footer View All CTA */}
        <div className="mt-20 flex justify-center sm:mt-24">
          <Link
            href="/portfolio"
            className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full border border-foreground/20 bg-transparent px-10 py-5 font-heading text-sm font-bold uppercase tracking-wider text-foreground transition-transform duration-300 hover:border-primary hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
              View All Masterpieces
            </span>
            <span className="relative z-10 flex items-center justify-center text-foreground transition-colors duration-300 group-hover:text-background">
              <ArrowUpRight size={18} />
            </span>
            <div className="absolute inset-0 z-0 h-full w-full scale-x-0 transform bg-primary transition-transform duration-500 origin-left group-hover:scale-x-100" />
          </Link>
        </div>

      </div>
    </section>
  );
}
