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
  const missionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Image fades in
    tl.fromTo(imageRef.current, 
      { opacity: 0, scale: 1.05 }, 
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    );

    // Name reveal: letters slide UP from behind a clip mask
    const nameWords = gsap.utils.toArray('.name-word');
    tl.fromTo(nameWords, 
      { yPercent: 100 },
      { yPercent: 0, duration: 0.8, stagger: 0.05, ease: "power4.out" },
      "-=0.8"
    );

    // Subtitle fades in after 300ms
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    );

    // Saffron underline draws under name
    const lines = gsap.utils.toArray('.hero-line');
    tl.fromTo(lines,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: "power2.out", transformOrigin: "left center" },
      "-=0.6"
    );

    // Mission (punchy line)
    tl.fromTo(missionRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );

    // CTAs
    const ctas = gsap.utils.toArray('.hero-cta');
    tl.fromTo(ctas,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      "-=0.6"
    );

    // Socials staggered from left
    const socialIcons = gsap.utils.toArray('.hero-social');
    tl.fromTo(socialIcons,
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.05 },
      "-=0.5"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-[100svh] flex flex-col-reverse md:flex-row bg-white overflow-hidden">
      
      {/* LEFT: 45% Content (Dark Espresso Background) */}
      <div className="relative w-full md:w-[45%] flex flex-col justify-center px-8 md:px-12 lg:px-20 py-16 z-10 bg-white/85 md:bg-white text-espresso min-h-[60vh] md:min-h-screen">
        
        {/* Title */}
        <div className="mb-6 relative">
          <h1 className="font-heading text-6xl md:text-7xl lg:text-[6rem] leading-[1.05] tracking-tight font-bold text-espresso">
            <div className="overflow-hidden pb-2"><span className="name-word inline-block">Gabhru</span></div>
            <div className="overflow-hidden pb-2 flex items-center">
              <span className="name-word inline-block">in UK</span>
              {/* Saffron Line underneath or next to it */}
              <div className="hero-line hidden md:block h-[6px] w-24 bg-saffron ml-6 origin-left scale-x-0" />
            </div>
            {/* Mobile Saffron Line */}
            <div className="hero-line md:hidden h-[6px] w-24 bg-saffron mt-3 origin-left scale-x-0" />
          </h1>
        </div>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-saffron text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-8 opacity-0"
        >
          Public Figure &middot; UK Immigration & Lifestyle
        </p>

        {/* Punchy Line */}
        <p 
          ref={missionRef}
          className="text-espresso/90 text-xl md:text-2xl font-sans mb-12 max-w-sm opacity-0"
        >
          Real stories. Real community. Real UK.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
          <a href="#about" className="hero-cta inline-flex items-center justify-center bg-saffron text-espresso px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300">
            Explore His World
          </a>
          <a href="#media" className="hero-cta inline-flex items-center justify-center border border-espresso/30 text-espresso px-8 py-4 font-bold uppercase tracking-wider text-sm hover:border-saffron hover:text-saffron transition-colors duration-300">
            Watch & Listen
          </a>
        </div>

        {/* Socials */}
        <div ref={socialsRef} className="flex items-center gap-6 mt-auto">
          <MagneticButton>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hero-social text-espresso/60 hover:text-saffron transition-colors">
              <FaInstagram size={24} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hero-social text-espresso/60 hover:text-saffron transition-colors">
              <FaYoutube size={24} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hero-social text-espresso/60 hover:text-saffron transition-colors">
              <FaXTwitter size={24} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hero-social text-espresso/60 hover:text-saffron transition-colors">
              <FaLinkedinIn size={24} />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* RIGHT: 55% Portrait */}
      <div 
        ref={imageRef} 
        className="absolute top-0 left-0 md:relative w-full md:w-[55%] h-[100svh] md:h-screen opacity-0"
      >
        <Image
          src="/images/main.jpg"
          alt="Gabhru in UK - Public Figure"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover object-center"
        />
        {/* Warm overlay espresso color at 40% opacity */}
        <div className="absolute inset-0 bg-white/10" />
        {/* Slight warm grain texture overlay */}
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
        {/* Gradient for mobile overlap */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent md:hidden" />
      </div>

    </section>
  );
}
