"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaInstagram, FaYoutube, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Prevent FOUC by initializing hero text hidden
    gsap.set(".hero-char", { opacity: 0, y: 60 });
    gsap.set(".hero-line", { scaleX: 0 });
    gsap.set(".hero-fade", { opacity: 0, y: 20 });
    gsap.set(".hero-social", { opacity: 0, scale: 0 });

    const tl = gsap.timeline();

    // Step 2: Hero image Ken Burns
    tl.fromTo(
      ".hero-bg",
      { scale: 1.08 },
      { scale: 1, duration: 10, ease: "power1.out" },
      0
    );

    // Step 4: Gabhru in UK character split stagger
    tl.to(
      ".hero-char",
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.04, ease: "power4.out" },
      0.5
    );

    // Step 5: Gold line draws left to right
    tl.to(
      ".hero-line",
      { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
      "-=0.4"
    );

    // Step 6 & 7: Subtitle and intro paragraphs fade up
    tl.to(
      ".hero-fade",
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );

    // Step 8: Social icons appear
    tl.to(
      ".hero-social",
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.6"
    );

    // Step 9: Scroll indicator bounce (GSAP simple bounce, fade out on scroll omitted from hero but can be added to ScrollTrigger)
    gsap.to(".scroll-dot", {
      y: 16,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

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

  // Manual span split for "Gabhru in UK"
  const title = "Gabhru in UK".split("").map((char, i) => (
    <span key={i} className={`hero-char inline-block ${char === " " ? "w-3 md:w-5" : ""}`}>
      {char}
    </span>
  ));

  return (
    <section ref={container} className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-end bg-background pb-20 md:pb-32">
      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-background">
        <Image
          src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=2000"
          alt="Gabhru in UK - Background Placeholder"
          fill
          priority
          className="hero-bg object-cover object-[center_30%]"
          sizes="100vw"
        />
        {/* Dark overlay bottom 60% */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl flex flex-col items-start mt-auto">
        <h1 className="text-h1 font-serif text-foreground leading-[1] overflow-hidden flex flex-wrap max-w-5xl">
          {title}
        </h1>
        
        <div className="hero-line w-24 md:w-48 h-[1px] bg-accent origin-left mt-6 mb-8" />
        
        <p className="hero-fade text-accent font-medium tracking-wide uppercase text-xs md:text-sm mb-4">
          Public Figure · News & Media · UK Immigration & Lifestyle
        </p>
        
        <p className="hero-fade text-foreground/80 text-base md:text-lg max-w-[520px] font-light leading-relaxed mb-10">
          Empowering communities through trusted news interpreting, settlement guidance, and dedicated lifestyle representation in the UK.
        </p>

        <div className="flex items-center gap-5">
          <MagneticButton>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hero-social w-11 h-11 rounded-full border border-accent/30 flex items-center justify-center text-foreground hover:border-accent hover:bg-accent hover:text-background transition-all duration-300">
              <FaInstagram size={18} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hero-social w-11 h-11 rounded-full border border-accent/30 flex items-center justify-center text-foreground hover:border-accent hover:bg-accent hover:text-background transition-all duration-300">
              <FaYoutube size={18} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hero-social w-11 h-11 rounded-full border border-accent/30 flex items-center justify-center text-foreground hover:border-accent hover:bg-accent hover:text-background transition-all duration-300">
              <FaXTwitter size={18} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hero-social w-11 h-11 rounded-full border border-accent/30 flex items-center justify-center text-foreground hover:border-accent hover:bg-accent hover:text-background transition-all duration-300">
              <FaLinkedinIn size={18} />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator - Gold animated dot */}
      <div className="scroll-indicator absolute bottom-8 left-6 md:left-12 flex flex-col items-center z-10">
        <div className="w-[1px] h-16 bg-accent/20 relative overflow-hidden">
          <div className="scroll-dot absolute top-0 left-0 w-full h-8 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
}
