'use client';

import React, { useState, useEffect } from 'react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '917508657479'; // Confirmed number
  const message = 'Hi Geetanjali Softwares! I am interested in your services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Show tooltip automatically after a delay to grab attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {/* Interactive Chat Bubble */}
      <div 
        className={`relative rounded-2xl rounded-br-sm bg-white p-4 shadow-xl transition-all duration-500 transform origin-bottom-right ${showTooltip ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white">
            <span className="font-heading font-bold text-xs tracking-wider">GS</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Geetanjali Softwares</p>
            <p className="text-sm font-medium text-gray-800 mt-0.5">Hi there! 👋 How can we help?</p>
          </div>
        </div>
        {/* Close Button for Tooltip */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setShowTooltip(false);
          }}
          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500 shadow-sm border border-gray-200 hover:bg-gray-200"
          aria-label="Close message"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      {/* Main WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
      >
        {/* Red Notification Badge */}
        <span className="absolute -top-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] sm:text-xs font-bold text-white shadow-sm z-20 animate-bounce">
          1
        </span>
        
        {/* Pulsing Effect */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30"></span>
        
        {/* High-Fidelity WhatsApp Brand SVG */}
        <svg
          className="h-7 w-7 sm:h-8 sm:w-8 text-white relative z-10 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 2c-5.514 0-9.969 4.477-9.969 9.994 0 1.76.455 3.414 1.25 4.869l-1.312 4.791 4.908-1.288c1.41.792 3.023 1.242 4.743 1.242 5.513 0 9.969-4.477 9.969-9.994 0-5.517-4.456-9.994-9.969-9.994zm0 1.796c4.524 0 8.173 3.663 8.173 8.198 0 4.536-3.649 8.199-8.173 8.199-1.542 0-2.983-.432-4.22-1.178l-.303-.18-2.923.767.78-2.846-.197-.314c-.792-1.261-1.247-2.753-1.247-4.25 0-4.535 3.649-8.198 8.173-8.198zm-3.834 3.033c-.168.006-.324.041-.459.124-.48.293-.728.847-.728 1.484 0 1.05.517 2.11 1.41 2.923 1.341 1.218 3.12 2.219 4.673 2.593.308.074.568.083.791.037.409-.084.772-.379.882-.773l.261-.925c.046-.16-.041-.334-.197-.4l-1.637-.704c-.158-.068-.344-.016-.443.121l-.517.702c-.083.11-.237.146-.364.077-.732-.397-1.396-.983-1.92-1.681-.08-.106-.068-.26.027-.354l.519-.508c.115-.11.14-.282.062-.416l-.89-1.528c-.104-.176-.32-.239-.504-.175z" />
        </svg>
      </a>
    </div>
  );
}
