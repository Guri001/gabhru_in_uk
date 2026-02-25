"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const stats = [
  { label: "Years Active", value: 8 },
  { label: "Articles Published", value: 124 },
  { label: "Community Events", value: 50, suffix: "+" },
  { label: "Media Appearances", value: 30, suffix: "+" },
];

export default function CredentialBar() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const numbers = gsap.utils.toArray<HTMLElement>(".stat-number");
    
    // Animate container in
    gsap.from(container.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
    });

    // Count up animation
    numbers.forEach((numText) => {
      const targetValue = parseInt(numText.getAttribute("data-target") || "0");
      
      gsap.to(numText, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
        innerHTML: targetValue,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full py-8 md:py-12 bg-background border-t border-b border-accent/20 z-20 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center flex-1 w-full md:w-auto relative">
              <div className="flex items-center text-3xl md:text-4xl font-serif text-accent mb-2">
                <span className="stat-number inline-block" data-target={stat.value}>0</span>
                <span>{stat.suffix || ""}</span>
              </div>
              <span className="text-xs md:text-sm tracking-widest uppercase text-foreground/60">
                {stat.label}
              </span>
              
              {/* Divider lines - hide on mobile, show on desktop between items */}
              {index !== stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-accent/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
