'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/services';

const serviceGroups = [
  { id: "website-design-development", label: "Website Development", summary: "Conversion-focused websites, stores, landing pages, and custom web platforms." },
  { id: "digital-marketing", label: "Digital Marketing", summary: "SEO, social media, PPC, content, and local search campaigns for lead generation." },
  { id: "branding", label: "Branding", summary: "Logo, identity, and brand presentation support for a consistent digital presence." },
];

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="services" className="relative w-full scroll-mt-28 pt-12 pb-12 sm:pt-20 sm:pb-20 bg-background border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-16 lg:pb-24 border-b border-foreground/10">
          {/* Left Side: Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-foreground/60">
                Our Expertise
              </span>
            </div>
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-[7rem] font-bold uppercase tracking-tighter text-foreground leading-[0.9]">
              SERVICES
            </h2>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl pb-4"
          >
            <p className="text-lg leading-relaxed text-foreground/70 sm:text-xl">
              We provide end-to-end digital solutions designed to elevate your brand. From custom web platforms to targeted marketing campaigns, our services are built to deliver measurable results.
            </p>
          </motion.div>
        </div>

        {/* Bottom Accordion Section */}
        <div className="mt-0 flex flex-col">
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
                className="overflow-hidden border-b border-foreground/10"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="group flex w-full items-center justify-between py-8 text-left sm:py-12"
                >
                  <div className="flex items-center gap-6 sm:gap-12">
                    <span className="font-heading text-2xl font-light text-foreground/40 transition-colors group-hover:text-primary sm:text-4xl">
                      0{index + 1}
                    </span>
                    <h3 className="font-heading text-3xl font-bold uppercase tracking-tighter text-foreground transition-colors group-hover:text-primary sm:text-5xl md:text-7xl">
                      {group.label}
                    </h3>
                  </div>
                  <div className={`flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-180 bg-primary border-primary text-background' : 'border-foreground/20 bg-transparent text-foreground group-hover:border-primary group-hover:text-primary'}`}>
                    <ChevronDown size={28} className="sm:w-8 sm:h-8" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="pb-12 pl-0 sm:pb-16 lg:pl-[120px]">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                          <div className="lg:col-span-4 flex flex-col justify-start">
                            <p className="text-lg leading-relaxed text-foreground/60 sm:text-xl">
                              {group.summary}
                            </p>
                            <Link 
                              href={`/services/${group.id}`}
                              className="mt-8 inline-flex w-max items-center gap-3 rounded-full border border-foreground/20 px-8 py-4 font-heading text-sm font-bold uppercase tracking-widest text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-background"
                            >
                              Explore Service <ArrowRight size={16} />
                            </Link>
                          </div>
                          <div className="lg:col-span-8">
                            <div className="grid gap-4 sm:grid-cols-2">
                              {visibleServices.map((service) => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  className="group/card rounded-none border-l-2 border-foreground/10 bg-transparent p-6 transition-all hover:border-primary hover:bg-foreground/5"
                                >
                                  <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-foreground transition group-hover/card:text-primary">
                                    {service.title.replace(" Services", "")}
                                  </h4>
                                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground/50">
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
