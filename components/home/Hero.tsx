"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Instagram, Youtube, Twitter, Linkedin, ChevronDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Word split reveal
    tl.fromTo(
      ".hero-word",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power4.out" }
    );

    // Line draw
    tl.fromTo(
      ".hero-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
      "-=0.4"
    );

    // Subtitle fade in (400ms after heading completes = `-=0.6` roughly)
    tl.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.2"
    );

    // Socials stagger
    tl.fromTo(
      ".hero-social",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Fade out scroll indicator on scroll
    gsap.to(".scroll-indicator", {
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "10%",
        scrub: true,
      },
      opacity: 0,
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center bg-[#0A1128]">
      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=2000"
          alt="Gabhru in UK - Background"
          fill
          priority
          className="object-cover object-top animate-scaleIn"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/80 to-[#0A1128]/40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-start mt-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-white leading-tight overflow-hidden flex flex-wrap gap-x-4 md:gap-x-6">
          <span className="block overflow-hidden pb-4"><span className="hero-word inline-block origin-bottom font-medium tracking-tight">Gabhru</span></span>
          <span className="block overflow-hidden pb-4"><span className="hero-word inline-block origin-bottom font-medium tracking-tight">in</span></span>
          <span className="block overflow-hidden pb-4"><span className="hero-word inline-block origin-bottom font-medium pl-2 tracking-tight">UK</span></span>
        </h1>
        
        <div className="hero-line w-24 md:w-32 h-[2px] bg-[#0066FF] origin-left mt-2 mb-8" />
        
        <p className="hero-subtitle text-lg md:text-2xl text-gray-300 max-w-2xl font-light tracking-wide">
          Public Figure | News & Media <br className="hidden md:block"/> UK Immigration & Lifestyle
        </p>

        <div className="mt-12 flex items-center gap-6">
          <MagneticButton className="hero-social">
            <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0A1128] transition-colors duration-300">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </MagneticButton>
          <MagneticButton className="hero-social">
            <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0A1128] transition-colors duration-300">
              <Youtube size={20} strokeWidth={1.5} />
            </a>
          </MagneticButton>
          <MagneticButton className="hero-social">
            <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0A1128] transition-colors duration-300">
              <Twitter size={20} strokeWidth={1.5} />
            </a>
          </MagneticButton>
          <MagneticButton className="hero-social">
            <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0A1128] transition-colors duration-300">
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#0066FF] z-10">
        <span className="text-xs tracking-widest uppercase font-medium text-white/50">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
