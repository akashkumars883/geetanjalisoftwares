'use client';

import Link from "next/link";
import React from "react";
import { services } from "@/lib/services";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const containerVariants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
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
    <section id="services" className="relative scroll-mt-28 pb-16 sm:pb-20">
      <div className="absolute left-1/2 top-20 h-56 w-56 -translate-x-1/2 rounded-full bg-orange-400/15 blur-3xl" />

      <motion.div 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "0px" }}
        variants={containerVariants}
        className="relative mx-auto max-w-7xl"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.p variants={itemVariants} className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
              Services
            </motion.p>
            <motion.h2 variants={itemVariants} className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
              We Build, Market &amp; Scale Your Business Online
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-sm leading-7 text-black/70 sm:text-base">
              From building your website to generating leads, we handle
              everything so you can focus on your business.
            </motion.p>
          </div>

          <motion.div variants={itemVariants}>
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center rounded-lg border border-black/15 bg-white/80 px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/5 sm:w-auto"
            >
              View All Services
            </Link>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8">
          {services
            .filter((service) => !service.slug.includes("/"))
            .map((service) => (
            <motion.article
              id={service.slug}
              key={service.slug}
              variants={itemVariants}
              className="group relative scroll-mt-28 overflow-hidden rounded-[32px] border border-black/[0.03] bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5 backdrop-blur-xl sm:p-8"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-300/10 blur-2xl transition duration-500 group-hover:bg-orange-300/20" />
              <div className="relative">
                <div className="relative mb-6 h-32 w-full overflow-hidden rounded-2xl bg-stone-50">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent blur-2xl" />
                  <img
                    src={`/images/${service.slug.split("/").pop().replace("website-design-development", "web").replace("digital-marketing", "marketing")}_icon.png`}
                    alt={service.title}
                    className="h-full w-full object-contain remove-background transition duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                </div>
                <span className="inline-flex rounded-lg border border-black/5 bg-stone-100 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-black/40">
                  {service.number}
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-black sm:text-2xl group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60 line-clamp-3">
                  {service.description}
                </p>

                <div className="mt-6 space-y-2">
                  {service.points.slice(0, 3).map((point) => (
                    <div
                      key={point}
                      className="rounded-xl border border-black/[0.02] bg-stone-50/50 px-4 py-3 text-xs font-medium text-black/70 flex items-center gap-3 transition-colors group-hover:bg-orange-500/5 group-hover:border-orange-500/10"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500/30" />
                      {point}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-black px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-600 hover:scale-[1.02] active:scale-95 sm:w-auto"
                >
                  Explore Service
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
