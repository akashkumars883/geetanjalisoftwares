'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { GOOGLE_BUSINESS_URL } from '@/lib/seo';

const testimonials = [
  {
    quote:
      "I had a great experience using Geetanjali Software. The interface is user-friendly, making it easy to navigate even for beginners. The software is fast, reliable, and helps simplify daily tasks efficiently. One of its best features is the excellent customer support.",
    name: 'Akhilesh Choudhary',
    role: 'Customer',
    rating: 5,
  },
  {
    quote:
      "I had a great experience with Geetanjali Software Agency. Their team is professional, responsive, and understands the client's requirements very well. They provide quality website development and software solutions at reasonable prices.",
    name: 'ANISH KUMAR YT',
    role: 'Client',
    rating: 5,
  },
  {
    quote:
      "The branding and development work made our business look incredibly professional. The team is responsive, highly technical, and delivers on time.",
    name: 'Karan Mehta',
    role: 'Founder',
    rating: 5,
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative w-full bg-background pt-12 pb-12 sm:pt-20 sm:pb-20 overflow-hidden border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6">

        {/* Top Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-16 lg:pb-24 border-b border-foreground/10">
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
                Client Praise
              </span>
            </div>
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-[7rem] font-bold uppercase tracking-tighter text-foreground leading-[0.9]">
              VOICES OF <br /> <span className="text-primary">SUCCESS</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl text-left pb-4"
          >
            <p className="text-lg leading-relaxed text-foreground/70 sm:text-xl">
              Don't just take our word for it. Hear directly from founders and business owners who have partnered with us to elevate their digital presence.
            </p>
            <a
              href={GOOGLE_BUSINESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-primary bg-primary/5 px-6 py-3 transition-colors hover:bg-primary"
            >
              <div className="flex items-center gap-1 text-primary group-hover:text-background transition-colors">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-primary group-hover:text-background transition-colors">
                View 5.0 Google Reviews
              </span>
            </a>
          </motion.div>
        </div>

        {/* Grid Container */}
        <div className="relative mt-16 lg:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group flex flex-col justify-between border border-foreground/10 bg-foreground/5 p-8 sm:p-10 transition-all duration-500 hover:border-primary hover:bg-transparent"
              >
                <div>
                  <div className="flex items-center gap-1 text-primary mb-8">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed text-foreground/80 font-normal">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-foreground/10 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-background transition-transform duration-500 group-hover:scale-110">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold uppercase tracking-widest text-foreground">{item.name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">{item.role}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
