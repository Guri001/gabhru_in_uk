"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Saffron Wipe Out (Exit) / In (Enter) effect */}
      <motion.div
        className="fixed inset-y-0 right-0 z-[9998] bg-saffron pointer-events-none w-full"
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        exit={{ x: "0%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
      {children}
    </>
  );
}
