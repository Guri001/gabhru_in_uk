"use client";

import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactStrip() {
  return (
    <section id="press" className="w-full py-32 bg-background relative overflow-hidden flex justify-center items-center">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-6 block">
          For Media & Collaborations
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-8">
          Get in Touch
        </h2>
        
        <p className="text-foreground/80 font-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-16">
          Gabhru in UK is an authoritative public figure offering trusted interpretation of UK immigration updates, engaging settlement lifestyle content, and community-driven advocacy. Available for select media interviews, panel discussions, and brand collaborations.
        </p>
        
        <div id="contact" className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <MagneticButton>
            <a 
              href="/press-kit.pdf" 
              target="_blank"
              className="px-8 py-4 bg-accent text-background border border-accent hover:bg-transparent hover:text-accent font-bold text-xs uppercase tracking-[0.2em] transition-colors duration-300 w-full sm:w-auto min-w-[220px]"
            >
              Download Press Kit
            </a>
          </MagneticButton>
          
          <MagneticButton>
            <a 
              href="mailto:contact@gabhruinuk.com" 
              className="px-8 py-4 bg-transparent text-accent border border-accent hover:bg-accent hover:text-background font-bold text-xs uppercase tracking-[0.2em] transition-colors duration-300 w-full sm:w-auto min-w-[220px]"
            >
              Send an Email
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
