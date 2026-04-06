'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const projects = [
  { id: 1, text: "Just delivered a website for a client in Faridabad!", location: "Faridabad" },
  { id: 2, text: "New Branding identity launched for a Patna project.", location: "Patna" },
  { id: 3, text: "Website redesign completed for a Noida based startup.", location: "Noida" },
  { id: 4, text: "Google Ranking improved for a local business in Bhabua.", location: "Bhabua" },
  { id: 5, text: "Custom API integration delivered for a Delhi agency.", location: "Delhi" },
];

export default function ProjectToast() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showNext = useCallback(() => {

    setVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
      setVisible(true);
    }, 500);
  }, []);

  useEffect(() => {
    // Initial delay
    const initialTimeout = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      showNext();
    }, 10000); // Show for 10 seconds

    return () => clearInterval(interval);
  }, [isHovered, showNext]);

  if (!mounted) return null;

  return (
    <div 
      className={`fixed bottom-6 left-6 z-50 transition-all duration-700 transform ${

        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center gap-4 rounded-2xl bg-black/90 p-4 pl-5 pr-10 shadow-2xl backdrop-blur-xl border border-white/10 max-w-[320px] sm:max-w-md">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
          <CheckCircle2 size={20} />
        </div>
        
        <div className="flex flex-col">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Recent Win</p>
          <p className="text-sm font-medium text-white/90 leading-tight">
            {projects[currentIndex].text}
          </p>
        </div>

        <button 
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-white/20 hover:text-white/60 transition-colors"
        >
          <X size={14} />
        </button>

        {/* Pulse dot */}
        <div className="absolute top-4 left-4">
           <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
