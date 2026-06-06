'use client';

import React from 'react';
import { 
  Sparkles,
  Search,
  Code,
  Smartphone,
  Layers,
  ShoppingBag,
  Cpu
} from 'lucide-react';

export default function MarqueeSection() {
  const items = [
    { text: "Website Development", icon: Code },
    { text: "SEO Optimization", icon: Search },
    { text: "UI/UX Design", icon: Layers },
    { text: "Digital Marketing", icon: Sparkles },
    { text: "Brand Strategy", icon: Cpu },
    { text: "E-Commerce Solutions", icon: ShoppingBag },
    { text: "Custom Software", icon: Smartphone }
  ];

  // Duplicate heavily for a seamless loop
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section className="relative w-full bg-transparent py-4">
      <div className="relative mx-auto max-w-7xl overflow-hidden border-y border-black/[0.04] px-4 py-2 sm:px-6 lg:px-8">
        {/* Sleek edge fading mask to seamlessly fade pills at boundaries */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#f5f5f5] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#f5f5f5] to-transparent z-10 pointer-events-none" />

        <div className="relative flex overflow-x-hidden">
          {/* Infinite Scrolling Track */}
          <div className="flex w-max animate-marquee items-center py-1.5 [animation-play-state:running] hover:[animation-play-state:paused] cursor-default transition-all duration-300">
            {marqueeItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex shrink-0 items-center mx-2 sm:mx-3 bg-slate-50/80 backdrop-blur-sm border border-black/5 hover:border-orange-500/20 hover:bg-orange-50/40 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 transition-all duration-300 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)] group cursor-pointer"
                >
                  {/* Micro Service-specific Icon */}
                  <Icon size={14} className="text-orange-600 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
                  <span className="ml-2 text-xs sm:text-sm font-semibold tracking-wide text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
