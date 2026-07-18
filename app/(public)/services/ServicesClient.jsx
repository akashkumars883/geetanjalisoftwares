'use client';

import Link from "next/link";
import { services } from "@/lib/services";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    <section className="relative pb-24 pt-0 sm:pt-4 bg-background min-h-screen">
      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={stagger}
        className="relative mx-auto max-w-7xl px-6"
      >
        <div className="max-w-6xl pb-16 border-b border-foreground/10">
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-primary"></span>
            <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60">
              Our Capabilities
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="mt-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground leading-tight"
          >
            ENTERPRISE <br /> <span className="text-primary">SOLUTIONS</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl font-medium"
          >
            From strategic web development to data-driven SEO and digital marketing — every service is built with precision, designed for scale, and backed by measurable outcomes.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {services
            .filter((service) => !service.slug.includes("/"))
            .map((service) => (
              <motion.article
                key={service.slug}
                variants={fadeInUp}
                className="group relative flex flex-col border border-foreground/10 bg-foreground/5 p-8 transition-colors hover:border-primary"
              >
                <div className="mb-4">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">
                    {service.number}. {service.title}
                  </span>
                </div>
                <h2 className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {service.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/70 font-medium">
                  {service.description}
                </p>

                <div className="mt-8 space-y-4 flex-grow border-t border-foreground/10 pt-6">
                  {service.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-4 text-sm font-medium text-foreground/80"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {point}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-12 group/btn relative inline-flex w-full items-center justify-center gap-4 overflow-hidden border border-foreground/20 bg-transparent px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-foreground transition-transform duration-300 hover:border-primary active:scale-95"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-background">
                    Explore Service
                  </span>
                  <span className="relative z-10 flex items-center justify-center transition-colors duration-300 group-hover/btn:text-background">
                    <ArrowRight size={18} />
                  </span>
                  <div className="absolute inset-0 z-0 h-full w-full scale-x-0 transform bg-primary transition-transform duration-500 origin-left group-hover/btn:scale-x-100" />
                </Link>
              </motion.article>
            ))}
        </div>
      </motion.div>
    </section>
  );
}