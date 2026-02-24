"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 
        Next.js App Router doesn't natively support AnimatePresence exit animations 
        without freezing layout state. This 'wipe up' technique runs efficiently 
        on every route change entry, creating a seamless Page Transition feel.
      */}
      <motion.div
        className="fixed inset-0 z-[999] bg-[#121212] pointer-events-none"
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1], // Smooth, cinematic easing
        }}
      />
      {children}
    </>
  );
}
