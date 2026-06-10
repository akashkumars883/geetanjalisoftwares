'use client';

import { useState } from 'react';

export default function BlogImage({ src, alt, className = '', priority = false }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center gap-3 text-black/25 bg-white ${className}`}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="m3 9 4-4 4 4 4-4 4 4" />
          <circle cx="8.5" cy="8.5" r="1.5" />
        </svg>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-center px-4">Image could not load</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt || 'Blog Image'}
        className="h-full w-full object-cover transition-all duration-500"
        onError={() => setFailed(true)}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}