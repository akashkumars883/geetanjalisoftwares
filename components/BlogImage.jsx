'use client';

import { useState } from 'react';

export default function BlogImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-black/25">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="m3 9 4-4 4 4 4-4 4 4" />
          <circle cx="8.5" cy="8.5" r="1.5" />
        </svg>
        <p className="text-[11px] font-bold uppercase tracking-widest">Image could not load</p>
        <p className="text-[10px]">Use a direct image URL, not a webpage link</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
