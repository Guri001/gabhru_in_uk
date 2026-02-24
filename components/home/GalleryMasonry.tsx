"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const GALLERY_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800", alt: "Gabhru in UK - Studio Recording", desc: "Studio Interview" },
  { id: 2, src: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800", alt: "Gabhru in UK - Live Reporting", desc: "On-Ground Reporting" },
  { id: 3, src: "https://images.unsplash.com/photo-1475721028314-398030847b31?auto=format&fit=crop&q=80&w=800", alt: "Gabhru in UK - Community Meet", desc: "Community Engagement" },
  { id: 4, src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800", alt: "Gabhru in UK - Conference", desc: "Policy Impact Forum" },
  { id: 5, src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800", alt: "Gabhru in UK - City Walk", desc: "London Central" },
  { id: 6, src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800", alt: "Gabhru in UK - Radio", desc: "Radio Broadcast" },
];

export default function GalleryMasonry() {
  const [index, setIndex] = useState(-1);

  return (
    <section className="py-24 md:py-32 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 md:px-12 mb-12 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-[#0A1128] mb-4">Life & Work <br /> in Action</h2>
        <div className="h-[2px] w-16 bg-[#0066FF]" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        {/* CSS Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, i) => (
            <div 
              key={img.id} 
              className="relative w-full overflow-hidden break-inside-avoid group cursor-pointer"
              onClick={() => setIndex(i)}
            >
              <div className="w-full relative bg-gray-200">
                {/* We use standard img with next/image for natural height in CSS masonry.
                    To avoid layout shifts, we could use unoptimized Next/Image or use predefined aspect ratios,
                    but since we want organic masonry, we just let width be 100% and height auto. */}
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="text-white font-medium text-lg tracking-wide shadow-sm">
                  {img.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={GALLERY_IMAGES.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </section>
  );
}
