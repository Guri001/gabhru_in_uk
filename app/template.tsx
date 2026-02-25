"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[9998] bg-background border-b border-accent pointer-events-none"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        exit={{ y: "0%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
      {children}
    </>
  );
}
