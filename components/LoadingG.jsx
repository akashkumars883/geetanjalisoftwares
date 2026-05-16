'use client';

import { motion } from 'framer-motion';

export default function LoadingG() {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full bg-white">
      <div className="relative">
        {/* Animated SVG G */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outline G */}
          <path
            d="M80 30C75 20 65 15 50 15C30 15 15 30 15 50C15 70 30 85 50 85C65 85 75 80 80 70V55H50"
            stroke="#E2E8F0"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Filling G Animation */}
          <motion.path
            d="M80 30C75 20 65 15 50 15C30 15 15 30 15 50C15 70 30 85 50 85C65 85 75 80 80 70V55H50"
            stroke="#EA580C" /* orange-600 */
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1],
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.8, 1]
            }}
          />
        </svg>

        {/* Text Fade In/Out */}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-2xl font-bold text-orange-600">G</span>
        </motion.div>
      </div>
    </div>
  );
}
