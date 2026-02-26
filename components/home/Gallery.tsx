"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const galleryImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1475721025505-23fa6808b111?q=80&w=1500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1500&auto=format&fit=crop"
];

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    <section className="relative w-full py-24 md:py-40 bg-background overflow-hidden border-b border-white/5">
      
      {/* Background Watermark Heading */}
      <div className="absolute top-10 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none z-0">
        <h2 className="font-serif text-[18vw] leading-none text-[#141414] tracking-tighter whitespace-nowrap opacity-60">
          GALLERY
        </h2>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 mt-16 md:mt-32">
        <div className="mb-16">
          <p className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            Life & Work in Action
          </p>
          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            Visual Proof
          </h3>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((src, i) => (
            <div 
              key={i} 
              className="relative w-full break-inside-avoid overflow-hidden cursor-pointer group rounded-sm"
              onClick={() => setIndex(i)}
            >
              <Image
                src={src}
                alt={`Gabhru in UK - Gallery Image ${i + 1}`}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={galleryImages.map(src => ({ src }))}
        styles={{ container: { backgroundColor: "rgba(13, 13, 13, 0.98)" } }}
      />
    </section>
  );
}
