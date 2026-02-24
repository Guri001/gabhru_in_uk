"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const MEDIA_ITEMS = [
  { id: 1, title: "The Immigration Debate", platform: "BBC Radio 4", date: "Aug 2023", image: "https://images.unsplash.com/photo-1598555813359-ba132717ceb6?auto=format&fit=crop&q=80&w=600" },
  { id: 2, title: "Students in Focus", platform: "The Guardian", date: "Sep 2023", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600" },
  { id: 3, title: "Policy Impact Report", platform: "Financial Times", date: "Jan 2024", image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=600" },
  { id: 4, title: "Diaspora Voices", platform: "Sky News", date: "Mar 2024", image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=600" },
  { id: 5, title: "Future of Work", platform: "Independent", date: "Apr 2024", image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=600" },
];

export default function MediaCollaborations() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;
    
    // Only apply on desktop
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      if (!section || !scrollContainer) return;

      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth + 100;

      gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#121212] pt-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Media & <br /> Collaborations</h2>
        <div className="h-[2px] w-16 bg-[#0066FF]" />
      </div>

      <div className="relative pb-24 md:h-[70vh] flex md:items-center overflow-x-auto md:overflow-x-hidden no-scrollbar">
        <div ref={scrollContainerRef} className="flex gap-8 px-6 md:px-12 w-max text-white pb-8 md:pb-0">
          {MEDIA_ITEMS.map((item) => (
            <div key={item.id} className="w-[85vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 group cursor-pointer block">
              <div className="relative aspect-[4/3] w-full overflow-hidden mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, 40vw"
                />
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white tracking-widest uppercase">
                  {item.platform}
                </div>
              </div>
              <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-[#0066FF] transition-colors">{item.title}</h3>
              <p className="text-gray-400 font-medium text-sm">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="w-full bg-[#0066FF] py-6 flex overflow-hidden whitespace-nowrap relative border-t border-b border-[#0066FF]/20 shadow-xl">
        <div className="animate-marquee flex flex-shrink-0 gap-12 px-12 items-center text-white font-serif text-2xl tracking-wide uppercase min-w-full">
          <span>FEATURED IN BBC 📻</span>
          <span>THE GUARDIAN 📰</span>
          <span>FINANCIAL TIMES 📈</span>
          <span>SKY NEWS 📺</span>
          <span>AL JAZEERA 🌍</span>
        </div>
        <div className="animate-marquee flex flex-shrink-0 gap-12 px-12 items-center text-white font-serif text-2xl tracking-wide uppercase min-w-full" aria-hidden="true">
          <span>FEATURED IN BBC 📻</span>
          <span>THE GUARDIAN 📰</span>
          <span>FINANCIAL TIMES 📈</span>
          <span>SKY NEWS 📺</span>
          <span>AL JAZEERA 🌍</span>
        </div>
      </div>
    </section>
  );
}
