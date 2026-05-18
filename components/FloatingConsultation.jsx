'use client';

import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

export default function FloatingConsultation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show pill button after scrolling down 300px to maintain clean initial screen
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    // Trigger the existing popup form directly
    window.dispatchEvent(new Event('open-enquiry-popup'));
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 left-8 z-[9999] flex items-center gap-2.5 rounded-full bg-slate-900 border border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-orange-600 active:scale-95 group"
      aria-label="Book Free Consultation"
    >
      <Calendar size={15} className="text-orange-500 group-hover:text-white transition-colors" />
      <span>Book Consultation</span>
    </button>
  );
}
