"use client";

import { FaInstagram, FaYoutube, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ConnectSection() {
  return (
    <section className="w-full bg-white text-espresso py-32 md:py-48 flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden">
      
      <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center">
        
        {/* Large Heading */}
        <h2 className="font-heading text-5xl md:text-7xl lg:text-[7rem] leading-none mb-4 md:mb-6 tracking-tight font-bold">
          <span className="block text-espresso mb-2">Want to work together?</span>
          <span className="block text-saffron italic">Let's talk.</span>
        </h2>

        {/* Email hover link */}
        <div className="mt-12 md:mt-20 mb-16 md:mb-24">
          <MagneticButton>
            <a 
              href="mailto:contact@gabhru.uk" 
              className="inline-block font-sans text-2xl md:text-4xl text-saffron font-bold hover:text-white transition-colors duration-300 relative group"
            >
              contact@gabhru.uk
              <span className="absolute -bottom-2 md:-bottom-4 left-1/2 w-0 h-[2px] bg-saffron transition-all duration-300 group-hover:left-0 group-hover:w-full" />
            </a>
          </MagneticButton>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 md:gap-8 justify-center items-center mb-16">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-espresso/50 hover:text-saffron hover:scale-110 transition-all duration-300">
            <FaInstagram size={32} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-espresso/50 hover:text-saffron hover:scale-110 transition-all duration-300">
            <FaYoutube size={32} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-espresso/50 hover:text-saffron hover:scale-110 transition-all duration-300">
            <FaXTwitter size={32} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-espresso/50 hover:text-saffron hover:scale-110 transition-all duration-300">
            <FaLinkedinIn size={32} />
          </a>
        </div>

        {/* Small Note */}
        <p className="font-sans text-xs md:text-sm uppercase tracking-widest text-sand font-medium">
          For press, collaborations, and community work.
        </p>

      </div>

      {/* Subtle background glow effect using Sand/Espresso */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-saffron/5 blur-[120px] pointer-events-none" />

    </section>
  );
}
