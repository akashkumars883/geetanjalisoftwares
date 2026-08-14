"use client";

import { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const testimonials = [
    {
      quote: "Geetanjali Softwares redesigned our entire CRM flow from scratch. Their technical design process and communication were outstanding, leading to a 40% reduction in agent operation times.",
      author: "Sarah Jenkins",
      role: "VP of Product",
      company: "Vesper Group",
    },
    {
      quote: "Integrating autonomous AI support agents seemed complex, but they built a highly accurate semantic search engine that resolves 65% of customer tickets instantly.",
      author: "Marcus Chen",
      role: "Chief Technology Officer",
      company: "Aether Systems",
    },
    {
      quote: "Our headless Shopify store page loading speeds improved by 300% after their headless Next.js transition. Our conversion rates climbed immediately after launch.",
      author: "Elena Rostova",
      role: "Director of E-Commerce",
      company: "Apex Brands",
    },
  ];

  // Auto slide effect
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [activeIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    timerRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Transitions slide every 5 seconds
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    startAutoSlide();
  };

  return (
    <section 
      className="py-10 bg-white border-b border-stone-100 relative z-10"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="max-w-3xl text-left mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-50 border border-stone-100 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-stone-900 leading-tight">
            Client success stories that <br />
            <span className="text-orange-600">validate our dedication.</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[220px] max-w-5xl text-left flex flex-col justify-between">
          <div className="relative overflow-hidden w-full">
            {testimonials.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={idx}
                  className={`transition-all duration-700 ease-in-out transform ${
                    isActive
                      ? "opacity-100 translate-x-0 relative block"
                      : "opacity-0 absolute top-0 left-0 w-full pointer-events-none -translate-x-4"
                  }`}
                >
                  <div className="space-y-6">
                    {/* Big Elegant Quote Icon */}
                    <Quote className="h-10 w-10 text-orange-600 opacity-25 transform rotate-180" />

                    {/* Quote Text */}
                    <blockquote className="text-lg sm:text-xl md:text-2xl font-light text-stone-800 leading-relaxed font-sans max-w-4xl">
                      "{item.quote}"
                    </blockquote>

                    {/* Author metadata */}
                    <div className="flex items-center gap-4 pt-2">
                      {/* Avatar Initials */}
                      <div className="h-10 w-10 rounded-md bg-stone-100 border border-stone-200/80 flex items-center justify-center font-bold text-xs text-stone-700 uppercase">
                        {item.author.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="space-y-0.5">
                        <cite className="not-italic text-sm font-bold text-stone-900 block">
                          {item.author}
                        </cite>
                        <span className="text-xs font-light text-stone-500 block">
                          {item.role} &mdash; {item.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Navigation Control */}
          <div className="flex items-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-md transition-all duration-300 focus:outline-none cursor-pointer ${
                  idx === activeIndex
                    ? "w-8 bg-orange-600"
                    : "w-2 bg-stone-200 hover:bg-stone-350"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
