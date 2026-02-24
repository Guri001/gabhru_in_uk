"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const STATS = [
  { id: 1, label: "Published Articles", target: 450, suffix: "+" },
  { id: 2, label: "Community Events", target: 120, suffix: "+" },
  { id: 3, label: "Media Appearances", target: 85, suffix: "+" },
  { id: 4, label: "Student Visas Advised", target: 2000, suffix: "+" }
];

export default function ImpactStats() {
  const containerRef = useRef<HTMLElement>(null);
  
  // We use multiple refs for each number, or just class names with scope
  
  useGSAP(() => {
    const section = containerRef.current;
    if (!section) return;

    // Get all counter elements
    const counters = gsap.utils.toArray(".stat-number") as HTMLDivElement[];

    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-target"));
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true
        },
        onUpdate: () => {
          // Format with commas if target >= 1000
          if (target >= 1000) {
            counter.innerText = Math.floor(obj.val).toLocaleString();
          } else {
            counter.innerText = Math.floor(obj.val).toString();
          }
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-[#0A1128] text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {STATS.map((stat) => (
            <div key={stat.id} className="flex flex-col border-l border-[#0066FF]/30 pl-6">
              <div className="flex items-baseline mb-2">
                <h3 
                  className="stat-number text-5xl md:text-6xl font-serif text-[#FAFAFA]" 
                  data-target={stat.target}
                >
                  0
                </h3>
                <span className="text-3xl md:text-4xl font-serif text-[#0066FF] ml-1">{stat.suffix}</span>
              </div>
              <p className="text-gray-400 font-medium tracking-wide uppercase text-xs md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
