"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Inner dot - follows exactly without lag
    const xToInner = gsap.quickTo(inner, "x", { duration: 0, ease: "none" });
    const yToInner = gsap.quickTo(inner, "y", { duration: 0, ease: "none" });

    // Outer ring - follows with lerp (lag)
    const xToOuter = gsap.quickTo(outer, "x", { duration: 0.15, ease: "power3.out" }); 
    const yToOuter = gsap.quickTo(outer, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xToInner(e.clientX);
      yToInner(e.clientY);
      xToOuter(e.clientX);
      yToOuter(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isImg = target.tagName.toLowerCase() === "img" || target.closest(".gallery-item");
      const isLink = target.closest("a, button, .magnetic-target");

      if (isImg) {
        setIsHoveringImage(true);
        gsap.to(outer, { width: 64, height: 64, backgroundColor: "var(--cream)", borderColor: "transparent", duration: 0.3 });
        gsap.to(inner, { opacity: 0, duration: 0.2 });
      } else if (isLink) {
        setIsHoveringImage(false);
        gsap.to(outer, { width: 40, height: 40, backgroundColor: "transparent", borderColor: "var(--saffron)", duration: 0.3 });
        gsap.to(inner, { scale: 0, duration: 0.2 });
      } else {
        setIsHoveringImage(false);
        gsap.to(outer, { width: 40, height: 40, backgroundColor: "transparent", borderColor: "var(--saffron)", duration: 0.3 });
        gsap.to(inner, { opacity: 1, scale: 1, duration: 0.2, backgroundColor: "var(--cream)" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-[40px] h-[40px] rounded-full border border-saffron flex items-center justify-center pointer-events-none z-[9999] max-md:hidden -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        {isHoveringImage && (
          <span className="text-espresso text-[10px] font-bold tracking-widest uppercase opacity-80">
            View
          </span>
        )}
      </div>
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-[12px] h-[12px] rounded-full bg-cream pointer-events-none z-[9999] max-md:hidden -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
}
