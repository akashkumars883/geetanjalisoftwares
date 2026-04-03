import React from 'react';

export default function Logo({ size = 32, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M26 16C26 21.5 21.5 26 16 26C10.5 26 6 21.5 6 16C6 10.5 10.5 6 16 6C19.1 6 21.9 7.4 23.75 9.6" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      <path 
        d="M26 16H16" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
    </svg>
  );
}
