"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function MapLoader({ isVisible }: { isVisible: boolean }) {
  const dotVariants: Variants = {
    animate: {
      opacity: [0, 1, 0],
      transition: { 
        repeat: Infinity, 
        duration: 1.5, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[999] flex flex-col items-center justify-center bg-[#000000] pointer-events-none"
        >
          <div className="relative flex flex-col items-center justify-center w-40 h-40">
      
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="relative w-20 h-20"
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 45}deg) translateY(-40px)`
                  }}
                />
              ))}
            </motion.div>

            <div className="absolute -bottom-16 flex flex-col items-center gap-2">
              <div className="flex items-center">
                <span className="text-white text-xs font-black tracking-[0.4em] uppercase italic">
                  Redirecting
                </span>

                <div className="flex gap-1 ml-0.5">
                  <motion.span variants={dotVariants} animate="animate" className="text-white">.</motion.span>
                  <motion.span variants={dotVariants} animate="animate" className="text-white" style={{ animationDelay: '0.2s' }}>.</motion.span>
                  <motion.span variants={dotVariants} animate="animate" className="text-white" style={{ animationDelay: '0.4s' }}>.</motion.span>
                </div>
              </div>
              
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[8px] text-white/30 tracking-[0.2em] font-mono"
              >
                CONNECTING...
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}