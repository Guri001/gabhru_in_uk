"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ImpactNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Simple fade up on scroll for the section
    gsap.fromTo('.impact-content',
      { opacity: 0, y: 40 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // Number count up
    const numbers = gsap.utils.toArray('.impact-number');
    numbers.forEach((num: any) => {
      const target = parseFloat(num.getAttribute('data-target'));
      const suffix = num.getAttribute('data-suffix') || '';
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        onUpdate: () => {
          num.innerText = Math.floor(obj.val) + suffix;
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-white text-espresso py-24 md:py-32 lg:py-40 flex items-center min-h-[50vh] xl:min-h-[70vh]">
      <div className="container mx-auto px-6 impact-content">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center max-w-5xl mx-auto">
          
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="font-heading tracking-tighter text-7xl md:text-8xl lg:text-[8rem] leading-none text-saffron font-bold">
              <span className="impact-number" data-target="50" data-suffix="K+">0</span>
            </h3>
            <p className="font-sans text-sand text-sm md:text-base uppercase tracking-widest max-w-[150px] leading-snug">
              Community Followers
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="font-heading tracking-tighter text-7xl md:text-8xl lg:text-[8rem] leading-none text-saffron font-bold">
              <span className="impact-number" data-target="3" data-suffix="">0</span>
            </h3>
            <p className="font-sans text-sand text-sm md:text-base uppercase tracking-widest max-w-[150px] leading-snug">
              Years Covering UK Immigration
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="font-heading tracking-tighter text-7xl md:text-8xl lg:text-[8rem] leading-none text-saffron font-bold">
              <span className="impact-number" data-target="100" data-suffix="+">0</span>
            </h3>
            <p className="font-sans text-sand text-sm md:text-base uppercase tracking-widest max-w-[150px] leading-snug">
              Stories Published
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
