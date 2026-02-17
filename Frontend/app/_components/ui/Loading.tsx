"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative w-10 h-10">
        <motion.div
          className="absolute inset-0 border-4 border-[#7c5cfc]/20 rounded-full"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-t-[#7c5cfc] border-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}