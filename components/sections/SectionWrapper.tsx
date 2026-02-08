"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export default function SectionWrapper({ children, className, id, delay = 0 }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24 px-4 overflow-hidden relative", className)}>
       <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="container mx-auto max-w-7xl relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
