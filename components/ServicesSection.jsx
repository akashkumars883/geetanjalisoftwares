'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/services';

const serviceGroups = [
  { id: "website-design-development", label: "Website Development", summary: "Conversion-focused websites, stores, landing pages, and custom web platforms." },
  { id: "digital-marketing", label: "Digital Marketing", summary: "SEO, social media, PPC, content, and local search campaigns for lead generation." },
  { id: "branding", label: "Branding", summary: "Logo, identity, and brand presentation support for a more consistent digital presence." },
];

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="services" className="relative scroll-mt-28 pt-8 pb-6 sm:pt-12 sm:pb-10 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-12">
          {/* Left Side: Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-600">
              Our Expertise
            </span>
            <h2 className="mt-4 text-4xl font-normal leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
              Services
            </h2>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl"
          >
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              We provide end-to-end digital solutions designed to elevate your brand. From custom web platforms to targeted marketing campaigns, our services are built to deliver measurable results.
            </p>
          </motion.div>
        </div>

        {/* Bottom Accordion Section */}
        <div className="mt-12 flex flex-col">
          {serviceGroups.map((group, index) => {
            const isOpen = openIndex === index;
            const parentService = services.find((service) => service.slug === group.id);
            const childServices = services.filter((service) => service.slug.startsWith(`${group.id}/`)).slice(0, 8);
            const visibleServices = parentService ? [parentService, ...childServices] : childServices;

            return (
              <motion.div 
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="group flex w-full items-center justify-between py-6 text-left sm:py-10"
                >
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className="text-sm font-semibold text-slate-400 transition-colors group-hover:text-orange-600 sm:text-xl">
                      0{index + 1}
                    </span>
                    <h3 className="text-2xl font-normal tracking-tight text-slate-900 transition-colors group-hover:text-orange-600 sm:text-5xl">
                      {group.label}
                    </h3>
                  </div>
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-180 bg-orange-600 border-orange-600 text-white' : 'border-black/10 bg-transparent text-slate-900 group-hover:border-orange-600 group-hover:text-orange-600'}`}>
                    <ChevronDown size={24} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="pb-10 pl-0 sm:pb-12 lg:pl-[88px]">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                          <div className="lg:col-span-4">
                            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                              {group.summary}
                            </p>
                            <Link 
                              href={`/services/${group.id}`}
                              className="mt-8 inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-orange-600 hover:bg-orange-600 hover:text-white"
                            >
                              Explore Service <ArrowRight size={16} />
                            </Link>
                          </div>
                          <div className="lg:col-span-8">
                            <div className="grid gap-3 sm:grid-cols-2">
                              {visibleServices.map((service) => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  className="group/card rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-500/20 hover:shadow-md"
                                >
                                  <h4 className="text-sm font-semibold text-slate-950 transition group-hover/card:text-orange-600">
                                    {service.title.replace(" Services", "")}
                                  </h4>
                                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                                    {service.description}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
