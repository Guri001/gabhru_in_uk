"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const categories = ["All", "Community", "Events", "Appearances", "Collaborations", "Behind the Scenes"];

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1511632765486-a01c80cf8cb4?auto=format&fit=crop&q=80&w=800", alt: "Community Gathering", category: "Community" },
  { id: 2, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200", alt: "Panel Events", category: "Events" },
  { id: 3, src: "https://images.unsplash.com/photo-1475721028070-20412b590e66?auto=format&fit=crop&q=80&w=800", alt: "Special Appearances", category: "Appearances" },
  { id: 4, src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800", alt: "Brand Collaborations", category: "Collaborations" },
  { id: 5, src: "https://images.unsplash.com/photo-1627844642677-9b43ea1f7274?auto=format&fit=crop&q=80&w=1200", alt: "Behind the Scenes Studio", category: "Behind the Scenes" },
  { id: 6, src: "https://images.unsplash.com/photo-1593113562656-62ce9b2f211d?auto=format&fit=crop&q=80&w=800", alt: "Community Outreach", category: "Community" },
  { id: 7, src: "https://images.unsplash.com/photo-1598555620959-1e34e568bb9e?auto=format&fit=crop&q=80&w=800", alt: "Radio Appearances", category: "Appearances" },
];

export default function GalleryMasonry() {
  const [activeTab, setActiveTab] = useState("All");
  const [index, setIndex] = useState(-1);

  const filtered = activeTab === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeTab);

  return (
    <section className="w-full py-24 md:py-32 bg-background-secondary border-t border-b border-accent/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block">
            Documentary
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-12">
            Life & Work in Action
          </h2>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 border-b border-white/10 pb-4 mb-4">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 text-xs md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                  activeTab === tab ? "text-accent" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="gallery-tab"
                    className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* CSS Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid"
              >
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-sm bg-background-card"
                  onClick={() => setIndex(galleryImages.findIndex(img => img.id === item.id))}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0A0A0A]/90 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-accent text-[10px] uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <p className="text-white font-serif text-lg">{item.alt}</p>
                  </div>
                  
                  {/* Gold Border Highlight on Hover */}
                  <div className="absolute inset-0 border border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={galleryImages.map(img => ({ src: img.src, alt: img.alt }))}
        styles={{ container: { backgroundColor: "rgba(10, 10, 10, 0.95)" } }}
      />
    </section>
  );
}
