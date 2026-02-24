"use client";

import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactStrip() {
  return (
    <section className="bg-[#0A1128] py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#121212] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none opacity-50" />
      
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">Let&#39;s start a conversation.</h2>
        <p className="text-gray-300 font-light max-w-2xl text-lg md:text-xl leading-relaxed mb-12">
          For press inquiries, speaking engagements, and official collaborations, please reach out directly to Gabhru's management team.
        </p>

        <MagneticButton>
          <a 
            href="mailto:press@gabhruinuk.com" 
            className="inline-flex items-center justify-center bg-[#0066FF] text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-white hover:text-[#0A1128] transition-colors duration-300"
          >
            Get In Touch
          </a>
        </MagneticButton>
      </div>
    </section>
  );
}
