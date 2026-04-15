'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function BlogImage({ src, alt, className = '', priority = false }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center gap-3 text-black/25 bg-stone-50 ${className}`}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="m3 9 4-4 4 4 4-4 4 4" />
          <circle cx="8.5" cy="8.5" r="1.5" />
        </svg>
        <p className="text-[11px] font-bold uppercase tracking-widest text-center px-4">Image could not load</p>
      </div>
    );
  }

  // Check if it's a relative path or an absolute URL allowed in next.config.js
  // For Unsplash/Supabase, next/image is perfect.
  // If it's a blob/base64 (rare but possible), it might need unoptimized.
  const isExternal = src.startsWith('http') || src.startsWith('//');

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt || 'Blog Image'}
        fill
        priority={priority}
        className="object-cover transition-all duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => setFailed(true)}
        unoptimized={!isExternal} // Only optimize if external
      />
    </div>
  );
}
