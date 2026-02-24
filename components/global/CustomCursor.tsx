"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only render on desktop (pointer: fine)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const cursor = cursorRef.current;
    if (!cursor) return;

    // quickTo is optimized for performance mapped to pointer movement
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX - 8);
      yTo(e.clientY - 8);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hover effect logic
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest("a, button, img, .magnetic-target");
      if (isHoverable) {
        gsap.to(cursor, { scale: 2.5, backgroundColor: "#0066FF", duration: 0.2 });
      } else {
        gsap.to(cursor, { scale: 1, backgroundColor: "#FAFAFA", duration: 0.2 });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    // mouseout should also just pass through to re-evaluate hover state 
    // we can reuse the handleMouseOver for mouseout, since it checks e.target
    // Wait, on mouseout, e.target is the element we're leaving.
    // Let's use mouseout to handle resetting.
    const handleMouseOut = (e: MouseEvent) => {
      // Actually mouseover/mouseout can be simplified by relying on window pointer events
      // or we can just reset if leaving an anchor.
      const target = e.target as HTMLElement;
      const isHoverable = target.closest("a, button, img, .magnetic-target");
      if (isHoverable) {
        gsap.to(cursor, { scale: 1, backgroundColor: "#FAFAFA", duration: 0.2 });
      }
    };

    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] max-md:hidden"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}
