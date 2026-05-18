'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'The website looked far more polished after the redesign, and the messaging finally felt aligned with our business.',
    name: 'Amit Verma',
    role: 'Service Business Owner',
  },
  {
    quote:
      'Their digital marketing direction gave us a much clearer structure for campaigns and helped us present our offer better.',
    name: 'Ritika Sharma',
    role: 'Marketing Lead',
  },
  {
    quote:
      'The branding work made our business look more professional and consistent across every customer touchpoint.',
    name: 'Karan Mehta',
    role: 'Founder',
  },
  {
    quote:
      'Working with Geetanjali Softwares was a game-changer for our online presence. Highly recommended!',
    name: 'Sonal Singh',
    role: 'E-commerce Manager',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative w-full bg-transparent pt-8 pb-6 sm:pt-12 sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-12">
          {/* Left Side: Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-600">
              Client Praise
            </span>
            <h2 className="mt-3 text-3xl font-normal tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
              Voices of Success
            </h2>
            
            {/* Google Reviews Trust Badge */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star size={16} fill="currentColor" className="text-amber-500" />
                <Star size={16} fill="currentColor" className="text-amber-500" />
                <Star size={16} fill="currentColor" className="text-amber-500" />
                <Star size={16} fill="currentColor" className="text-amber-500" />
                <Star size={16} fill="currentColor" className="text-amber-500" />
              </div>
              <span className="text-xs font-bold text-slate-700 tracking-wider">
                4.9/5 stars based on 120+ Google Reviews
              </span>
            </div>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl text-left"
          >
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Hear from the founders, marketing directors, and business owners who partnered with us to elevate their digital presence.
            </p>
          </motion.div>
        </div>

        {/* Scrollable Container */}
        <div className="relative mt-8 lg:mt-12">
          <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {testimonials.map((item, idx) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group flex min-w-[300px] flex-col rounded-[32px] border border-black/5 bg-slate-50/50 hover:bg-slate-50 hover:shadow-lg hover:shadow-orange-500/5 transition duration-300 p-8 sm:min-w-[400px] lg:min-w-[450px] snap-center relative overflow-hidden flex-1 justify-between text-left"
              >
                <div>
                  <div className="mb-4 text-orange-600 font-serif text-5xl select-none opacity-20 group-hover:opacity-100 transition-opacity duration-300">&ldquo;</div>
                  <p className="text-base leading-relaxed text-slate-600 relative z-10 font-normal">
                    {item.quote}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4 border-t border-black/5 pt-6 relative z-10">
                  <div className="h-12 w-12 flex-shrink-0 rounded-2xl bg-orange-500/10 flex items-center justify-center text-sm font-semibold text-orange-600 uppercase border border-orange-500/10 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-0.5">{item.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          {/* Indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="h-1.5 w-8 rounded-full bg-orange-600 transition-all" />
            <div className="h-1.5 w-2 rounded-full bg-orange-600/20" />
            <div className="h-1.5 w-2 rounded-full bg-orange-600/20" />
          </div>
        </div>

      </div>
    </section>
  );
}
