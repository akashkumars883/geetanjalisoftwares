'use client';

import { motion } from 'framer-motion';

export default function LoadingG() {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-4 rounded-full bg-orange-600/20"
        />
        
        {/* The Animated "G" Logo */}
        <motion.div
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="relative h-16 w-16 bg-white rounded-2xl border border-black/5 flex items-center justify-center text-3xl font-bold text-orange-600 shadow-sm"
        >
          G
        </motion.div>
      </div>
    </div>
  );
}
