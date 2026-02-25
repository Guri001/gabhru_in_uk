"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen relative w-full h-full">
        {/* The Page Content */}
        {children}

        {/* Transition Sweeping Bar */}
        <motion.div
          className="fixed top-0 left-0 w-full h-svh bg-background z-[9998] origin-bottom"
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          exit={{ y: "0%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ borderBottom: "1px solid #C9A84C" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
