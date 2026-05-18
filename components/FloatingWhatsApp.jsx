'use client';

import React from 'react';

export default function FloatingWhatsApp() {
  const phoneNumber = '917508657479'; // Confirmed number
  const message = 'Hi Geetanjali Softwares! I am interested in your services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:scale-110 active:scale-95 group hover:shadow-[#25D366]/20"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulsing Effect */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20"></span>
      
      {/* High-Fidelity WhatsApp Brand SVG */}
      <svg
        className="h-8 w-8 text-white relative z-10 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12.031 2c-5.514 0-9.969 4.477-9.969 9.994 0 1.76.455 3.414 1.25 4.869l-1.312 4.791 4.908-1.288c1.41.792 3.023 1.242 4.743 1.242 5.513 0 9.969-4.477 9.969-9.994 0-5.517-4.456-9.994-9.969-9.994zm0 1.796c4.524 0 8.173 3.663 8.173 8.198 0 4.536-3.649 8.199-8.173 8.199-1.542 0-2.983-.432-4.22-1.178l-.303-.18-2.923.767.78-2.846-.197-.314c-.792-1.261-1.247-2.753-1.247-4.25 0-4.535 3.649-8.198 8.173-8.198zm-3.834 3.033c-.168.006-.324.041-.459.124-.48.293-.728.847-.728 1.484 0 1.05.517 2.11 1.41 2.923 1.341 1.218 3.12 2.219 4.673 2.593.308.074.568.083.791.037.409-.084.772-.379.882-.773l.261-.925c.046-.16-.041-.334-.197-.4l-1.637-.704c-.158-.068-.344-.016-.443.121l-.517.702c-.083.11-.237.146-.364.077-.732-.397-1.396-.983-1.92-1.681-.08-.106-.068-.26.027-.354l.519-.508c.115-.11.14-.282.062-.416l-.89-1.528c-.104-.176-.32-.239-.504-.175z" />
      </svg>
      
      {/* Tooltip */}
      <div className="absolute right-20 mb-1 hidden rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold whitespace-nowrap text-white group-hover:block shadow-lg">
        Chat with us!
      </div>
    </a>
  );
}
