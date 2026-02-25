"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const mediaItems = [
  {
    id: 1,
    platform: "BBC Asian Network",
    type: "Interview",
    title: "Navigating the New Dependent Visa Rules",
    date: "FEB 2026",
    image: "https://images.unsplash.com/photo-1598555620959-1e34e568bb9e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    platform: "Global Tech Summit",
    type: "Panel Discussion",
    title: "South Asian Talent in UK Tech",
    date: "JAN 2026",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    platform: "Immigration Policy Podcast",
    type: "Podcast Appearance",
    title: "The Route to Indefinite Leave to Remain",
    date: "NOV 2025",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    platform: "The Community Trust",
    type: "Guest Talk",
    title: "Empowerment Through Understanding Rights",
    date: "OCT 2025",
    image: "https://images.unsplash.com/photo-1475721028070-20412b590e66?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 5,
    platform: "Sunrise Radio",
    type: "Media Mention",
    title: "Community Advocate Highlights Visa Backlogs",
    date: "AUG 2025",
    image: "https://images.unsplash.com/photo-1627844642677-9b43ea1f7274?auto=format&fit=crop&q=80&w=600"
  }
];

export default function MediaCollaborations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // We only pin and horizontal scroll if it's strictly a larger screen
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const container = containerRef.current;
      const scrollWrapper = scrollWrapperRef.current;
      
      if (!container || !scrollWrapper) return;

      const totalWidth = scrollWrapper.scrollWidth - window.innerWidth;

      const tl = gsap.to(scrollWrapper, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1, // Smooth scrubbing
          start: "top top",
          end: `+=${totalWidth}`, // Scroll amount equals horizontal length
        }
      });

      // Progress bar animation linked to same scrolltrigger
      gsap.to(".progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          scrub: 1,
          start: "top top",
          end: `+=${totalWidth}`,
        }
      });

      return () => {
        tl.kill();
      };
    });
  }, []);

  return (
    <section id="media" className="w-full bg-background-secondary pt-24 md:pt-32 relative overflow-hidden">
      {/* Pinned Section Container */}
      <div ref={containerRef} className="h-auto md:h-screen flex flex-col justify-center">
        
        <div className="container mx-auto px-6 max-w-7xl mb-12 md:mb-16 shrink-0">
          <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block overflow-hidden">
            <span className="block translate-y-0 opacity-100 transition-all duration-700">Third-Party Recognition</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
            Media & Collaborations
          </h2>
        </div>

        {/* Horizontal scroll track */}
        <div ref={scrollWrapperRef} className="flex gap-6 md:gap-8 px-6 md:px-[6vw] pb-12 overflow-x-auto md:overflow-x-visible items-center scrollbar-hide shrink-0 min-h-[450px]">
          {mediaItems.map((item, i) => (
            <div 
              key={item.id} 
              className="w-[300px] md:w-[450px] shrink-0 h-[400px] md:h-[500px] relative group overflow-hidden bg-background-card"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 300px, 450px"
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/70 group-hover:bg-[#0A0A0A]/40 transition-colors duration-500" />
              </div>

              <div className="relative z-10 w-full h-full flex flex-col p-8 justify-between">
                <div>
                  <span className="inline-block border border-accent/40 text-accent text-[10px] uppercase tracking-widest px-3 py-1 mb-3 bg-background/50 backdrop-blur-md">
                    {item.platform}
                  </span>
                  <p className="text-foreground/80 text-xs tracking-widest uppercase mb-2">
                    {item.type}
                  </p>
                </div>
                
                <div>
                  <div className="w-0 h-[1px] bg-accent mb-4 transition-all duration-500 group-hover:w-full" />
                  <h3 className="font-serif text-2xl md:text-3xl text-white leading-snug mb-3 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm tracking-wider uppercase font-medium transform transition-all duration-500 group-hover:-translate-y-2 opacity-0 group-hover:opacity-100">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar (Desktop only) */}
        <div className="hidden md:block absolute bottom-0 left-0 w-full h-[2px] bg-white/10 shrink-0">
          <div className="progress-bar h-full bg-accent w-full origin-left scale-x-0" />
        </div>
      </div>

      {/* Infinite Marquee Logos - Pure CSS */}
      <div className="w-full bg-[#16191F] py-8 overflow-hidden relative border-t border-accent/10">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#16191F] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#16191F] to-transparent z-10" />
        
        <div className="flex w-[200%] sm:w-[150%] xl:w-[100%] hover:[animation-play-state:paused] animate-marquee">
          {/* Logo set duplicated for infinite scroll */}
          {[1, 2].map((set) => (
            <div key={set} className="flex-1 flex justify-around items-center opacity-60">
              <span className="font-serif text-xl tracking-widest uppercase text-white/80 shrink-0 px-8">BBC News</span>
              <span className="font-serif text-xl tracking-widest uppercase text-white/80 shrink-0 px-8">Sky News</span>
              <span className="font-serif text-xl tracking-widest uppercase text-white/80 shrink-0 px-8">ITV</span>
              <span className="font-serif text-xl tracking-widest uppercase text-white/80 shrink-0 px-8">The Guardian</span>
              <span className="font-serif text-xl tracking-widest uppercase text-white/80 shrink-0 px-8">Times</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
