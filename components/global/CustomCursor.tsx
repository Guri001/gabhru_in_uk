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
    const xToOuter = gsap.quickTo(outer, "x", { duration: 0.8, ease: "power3.out" }); // Simulating lerp: 0.12 mapped to duration
    const yToOuter = gsap.quickTo(outer, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xToInner(e.clientX);
      yToInner(e.clientY);
      xToOuter(e.clientX);
      yToOuter(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isImg = target.tagName.toLowerCase() === "img";
      const isLink = target.closest("a, button, .magnetic-target");

      if (isImg) {
        setIsHoveringImage(true);
        gsap.to(outer, { width: 64, height: 64, backgroundColor: "rgba(201, 168, 76, 0.9)", borderColor: "transparent", duration: 0.3 });
        gsap.to(inner, { opacity: 0, duration: 0.2 });
      } else if (isLink) {
        setIsHoveringImage(false);
        gsap.to(outer, { width: 56, height: 56, backgroundColor: "rgba(201, 168, 76, 0.2)", borderColor: "#C9A84C", duration: 0.3 });
        gsap.to(inner, { scale: 0, duration: 0.2 });
      } else {
        setIsHoveringImage(false);
        gsap.to(outer, { width: 36, height: 36, backgroundColor: "transparent", borderColor: "#C9A84C", duration: 0.3 });
        gsap.to(inner, { opacity: 1, scale: 1, duration: 0.2 });
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
        className="fixed top-0 left-0 w-[36px] h-[36px] rounded-full border border-accent flex items-center justify-center pointer-events-none z-[9999] max-md:hidden -translate-x-1/2 -translate-y-1/2"
      >
        {isHoveringImage && (
          <span className="text-background text-[10px] font-bold tracking-widest uppercase">
            View
          </span>
        )}
      </div>
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-accent pointer-events-none z-[9999] max-md:hidden -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
