'use client';

import Link from "next/link";
import { services } from "@/lib/services";
import { motion } from "framer-motion";

export default function ServicesClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  const stagger = {
    whileInView: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="relative pb-20 pt-4 sm:pt-8">
      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={stagger}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl py-12 sm:py-20">
          <motion.p
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-wider text-orange-600 sm:text-sm"
          >
            Our Capabilities
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="mt-4 text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl lg:text-7xl leading-[1.15]"
          >
            Enterprise-grade digital services engineered for business growth.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            From strategic web development to data-driven SEO and digital marketing — every service is built with precision, designed for scale, and backed by measurable outcomes.
          </motion.p>
        </div>

        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {services
            .filter((service) => !service.slug.includes("/"))
            .map((service) => (
              <motion.article
                key={service.slug}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-[32px] border border-black/5 bg-slate-50 p-6 transition duration-500 hover:-translate-y-1 sm:p-8"
              >
                <div className="relative">
                  <span className="inline-flex rounded-full border border-black/5 bg-white px-4 py-1.5 text-[10px] font-semibold tracking-wider text-slate-500">
                    {service.number}
                  </span>
                  <h2 className="mt-6 text-2xl font-normal tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  <div className="mt-8 space-y-3">
                    {service.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-black/5 bg-white px-4 py-3 text-xs font-medium text-slate-700 flex items-center gap-3"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
                        {point}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-95 sm:w-auto"
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