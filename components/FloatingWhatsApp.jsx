'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

import Logo from './Logo';

export default function FloatingWhatsApp() {
  const phoneNumber = '917508657479'; // Confirmed number
  const message = 'Hi Geetanjali Softwares! I am interested in your services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:scale-110 active:scale-95 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulsing Effect */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20"></span>
      
      <Logo size={28} className="text-white relative z-10" />
      
      {/* Tooltip */}
      <div className="absolute right-20 mb-1 hidden rounded-lg bg-black/80 px-4 py-2 text-xs font-bold whitespace-nowrap text-white group-hover:block">
        Chat with us!
      </div>
    </a>
  );
}
