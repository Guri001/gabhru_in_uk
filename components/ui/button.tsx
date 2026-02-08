"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-gradient-to-r hover:from-primary hover:to-[#1a3c5e]",
      secondary: "bg-accent text-primary hover:bg-yellow-400",
      outline: "border-2 border-primary text-primary hover:bg-primary/10",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "rounded-full font-semibold transition-all shadow-md active:shadow-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...(props as any)} 
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
