"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const images = [
  { src: "/images/p1.jpg", desc: "Community Meetup in London" },
  { src: "/images/p2.jpg", desc: "Speaking on stage, Manchester" },
  { src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop", desc: "Behind the scenes podcast recording" },
  { src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1200&auto=format&fit=crop", desc: "Mentorship session with students" },
  { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop", desc: "Walking through London" },
  { src: "https://images.unsplash.com/photo-1523580494112-071dcebd709b?q=80&w=1200&auto=format&fit=crop", desc: "Q&A at the University panel" },
  { src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop", desc: "Cultural festival celebration" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop", desc: "Portrait out in the city" },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(-1);

  // Attach random rotations so it looks like physical photos.
  const [rotations, setRotations] = useState<number[]>([]);

  useEffect(() => {
    // Generate rotations only on client side to avoid hydration mismatch
    setRotations(images.map(() => (Math.random() * 3) - 1.5));
  }, []);

  useGSAP(() => {
    if (!wrapperRef.current || !containerRef.current) return;

    // Pinning and horizontal scroll
    const sections = gsap.utils.toArray('.gallery-item');
    
    // We scroll the wrapper to the left by the amount of its own width minus viewport width
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1, // Smooth scrub
        snap: 1 / (sections.length - 1),
        // end after scrolling 300% of the viewport height (gives plenty of scrolling space)
        end: () => "+=" + wrapperRef.current!.offsetWidth,
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-cream overflow-hidden">
      
      {/* Fixed Heading inside pinned section */}
      <div className="absolute top-12 md:top-20 left-0 w-full z-10 pointer-events-none px-6 md:px-12 lg:px-20">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-walnut">
          Life in <span className="text-saffron font-bold ml-2 text-5xl md:text-6xl lg:text-7xl">Motion</span>
        </h2>
        <div className="flex items-center gap-3 mt-4 text-walnut/60 text-sm md:text-base font-bold uppercase tracking-widest pl-1">
          <span>Scroll to explore</span>
          <div className="w-12 h-[1px] bg-walnut/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-saffron animate-[translateX_1.5s_infinite]" />
          </div>
        </div>
      </div>

      {/* The scrolling wrapper */}
      <div ref={wrapperRef} className="h-screen flex items-center pt-24 md:pt-0 pb-12 w-[800vw] md:w-[400vw] lg:w-[300vw]">
        {images.map((img, i) => (
          <div 
            key={i} 
            className="gallery-item w-screen px-6 md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center h-full cursor-pointer group"
            onClick={() => setIndex(i)}
          >
            <div 
              className="relative w-[85%] md:w-[80%] aspect-[4/5] shadow-xl transition-all duration-500 will-change-transform group-hover:!rotate-0 group-hover:scale-[1.04]"
              style={{ transform: `rotate(${rotations[i] || 0}deg)` }}
            >
              <Image
                src={img.src}
                alt={img.desc}
                fill
                sizes="(max-width: 768px) 85vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            
            <p className="mt-8 font-sans text-xs md:text-sm uppercase tracking-widest text-walnut/70 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              Gabhru in UK &ndash; {img.desc}
            </p>
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images}
        styles={{ container: { backgroundColor: "rgba(28, 16, 8, 0.95)" } }}
      />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes translateX {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />

    </section>
  );
}
