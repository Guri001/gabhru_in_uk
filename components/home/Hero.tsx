"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaInstagram, FaYoutube, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Portrait fades in first (opacity 0->1, 1.2s)
    tl.fromTo(imageRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.2, ease: "power2.inOut" }
    );

    // 2. Name reveals slow word-by-word stagger
    const nameWords = gsap.utils.toArray('.name-word');
    tl.fromTo(nameWords, 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
      "-=0.4"
    );

    // 3. Subtitle fades in (small caps, letter spacing, gold color)
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    );

    // 4. Thin gold line draws
    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, transformOrigin: "left center" },
      "-=0.4"
    );

    // 5. Mission, CTAs, Socials fade in
    tl.fromTo([missionRef.current, ctaRef.current, socialsRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      "-=0.5"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-[100svh] flex flex-col md:flex-row bg-background overflow-hidden">
      
      {/* LEFT: 60% Portrait */}
      <div 
        ref={imageRef} 
        className="relative w-full md:w-[60%] h-[50vh] md:h-screen opacity-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop"
          alt="Gabhru in UK - Public Figure"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-center grayscale-[20%]"
        />
        {/* Dark vignette overlay at edges */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background via-background/20 to-transparent opacity-90" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(13,13,13,0.9)] pointer-events-none" />
      </div>

      {/* RIGHT: 40% Content */}
      <div className="relative w-full md:w-[40%] flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24 z-10 bg-background md:bg-transparent md:-ml-20">
        
        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-accent text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] mb-6 opacity-0"
        >
          Public Figure &middot; UK Immigration & Lifestyle
        </p>

        {/* Title */}
        <div className="mb-8 relative">
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] text-foreground leading-[0.9] tracking-tight">
            <div className="overflow-hidden pb-2"><span className="name-word inline-block">Gabhru</span></div>
            <div className="overflow-hidden pb-4"><span className="name-word inline-block text-foreground/80 md:pl-8">in UK</span></div>
          </h1>
          
          {/* Gold Line */}
          <div ref={lineRef} className="h-[2px] w-32 bg-accent mt-8 origin-left" />
        </div>

        {/* Mission */}
        <p 
          ref={missionRef}
          className="text-foreground/70 text-lg md:text-xl font-light mb-12 max-w-sm leading-relaxed opacity-0"
        >
          Navigating life, settlement, and culture in the UK—driven by a mission to inform, empower, and connect the South Asian community.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-8 mb-16 opacity-0">
          <a href="#about" className="group flex items-center gap-3 text-foreground font-medium uppercase tracking-[0.2em] text-xs md:text-sm relative">
            His Story
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#media" className="group flex items-center gap-3 text-foreground font-medium uppercase tracking-[0.2em] text-xs md:text-sm relative">
            Watch / Listen
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        {/* Socials */}
        <div ref={socialsRef} className="flex items-center gap-4 opacity-0 mt-auto md:mt-0">
          <MagneticButton>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-accent transition-colors p-3 border border-foreground/10 hover:border-accent rounded-full">
              <FaInstagram size={16} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-accent transition-colors p-3 border border-foreground/10 hover:border-accent rounded-full">
              <FaYoutube size={16} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-accent transition-colors p-3 border border-foreground/10 hover:border-accent rounded-full">
              <FaXTwitter size={16} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-accent transition-colors p-3 border border-foreground/10 hover:border-accent rounded-full">
              <FaLinkedinIn size={16} />
            </a>
          </MagneticButton>
        </div>

      </div>

    </section>
  );
}
