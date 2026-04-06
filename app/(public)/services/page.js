'use client';

import Link from "next/link";
import { services } from "@/lib/services";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <section className="relative pb-20 pt-4 sm:pt-8">
      <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-400/15 blur-3xl" />

      <motion.div 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={stagger}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
            Services
          </motion.p>
          <motion.h1 variants={fadeInUp} className="mt-3 text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-7xl leading-[1.1]">
            Services built around how modern businesses grow online.
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-5 max-w-2xl text-sm leading-relaxed text-black/60 sm:text-lg">
            Explore our specialized services and choose the one that matches your next business goal.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services
            .filter((service) => !service.slug.includes("/"))
            .map((service) => (
            <motion.article
              key={service.slug}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-[40px] border border-black/[0.03] bg-white p-6 shadow-xl shadow-black/[0.02] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/[0.05] sm:p-8"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-orange-300/10 blur-3xl transition duration-500 group-hover:bg-orange-300/20" />
              <div className="relative">
                <span className="inline-flex rounded-full border border-black/5 bg-stone-100 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-black/40">
                  {service.number}
                </span>
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-black group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-black/60">
                  {service.description}
                </p>

                <div className="mt-8 space-y-3">
                  {service.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-black/[0.02] bg-stone-50/50 px-4 py-3 text-xs font-medium text-black/70 flex items-center gap-3 transition-colors group-hover:bg-orange-500/5 group-hover:border-orange-500/10"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500/30" />
                      {point}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-orange-600 hover:scale-[1.02] active:scale-95 sm:w-auto"
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
