"use client";

import { motion, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-[#0066FF] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
