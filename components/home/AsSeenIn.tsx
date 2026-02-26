"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    platform: "BBC Asian Network",
    title: "Navigating UK Settlement Rules",
    date: "Dec 2025",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: 2,
    platform: "The Times UK",
    title: "International Students and the New Economy",
    date: "Oct 2025",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: 3,
    platform: "Immigration Policy Panel",
    title: "Keynote Speaker at London Summit",
    date: "Aug 2025",
    image: "https://images.unsplash.com/photo-1475721025505-23fa6808b111?q=80&w=1500&auto=format&fit=crop"
  }
];

export default function AsSeenIn() {
  const logos = [
    "BBC", "The Times", "Sky News", "The Guardian", "Asian Network", "LBC", "Channel 4", "Telegraph"
  ];

  return (
    <section id="press" className="relative w-full bg-background-secondary py-24 md:py-32 overflow-hidden border-t border-b border-white/5">
      
      {/* Section Label */}
      <div className="container mx-auto px-6 max-w-7xl mb-12">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-center"
        >
          Media & Appearances
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="w-full flex overflow-hidden opacity-50 mb-20">
        <div className="flex animate-marquee whitespace-nowrap">
          {logos.concat(logos).map((logo, i) => (
            <span key={i} className="mx-8 md:mx-16 font-serif text-3xl md:text-5xl lg:text-6xl text-foreground whitespace-nowrap">
              {logo}
            </span>
          ))}
        </div>
        <div className="flex animate-marquee whitespace-nowrap absolute top-0">
           {/* Duplicate for seamless infinite loop */}
           {logos.concat(logos).map((logo, i) => (
            <span key={i} className="mx-8 md:mx-16 font-serif text-3xl md:text-5xl lg:text-6xl text-foreground whitespace-nowrap" aria-hidden="true">
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Appearance Tiles */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group flex flex-col gap-4"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-background">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-accent text-[10px] font-bold tracking-widest uppercase">{feature.platform}</span>
                  <span className="text-foreground/50 text-[10px] tracking-widest uppercase">{feature.date}</span>
                </div>
                <h4 className="font-serif text-lg md:text-xl text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
                  {feature.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
