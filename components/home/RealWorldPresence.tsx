"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const events = [
  {
    id: 1,
    title: "Parliamentary Address on Immigration Policy",
    date: "November 2025",
    location: "Palace of Westminster, London",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1500&auto=format&fit=crop",
    size: "large", // spans more area
  },
  {
    id: 2,
    title: "South Asian Community Excellence Awards",
    date: "October 2025",
    location: "Grosvenor House, London",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1500&auto=format&fit=crop",
    size: "medium",
  },
  {
    id: 3,
    title: "University Settlement Workshop",
    date: "September 2025",
    location: "University of Warwick",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1500&auto=format&fit=crop",
    size: "medium",
  }
];

export default function RealWorldPresence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -150]);

  return (
    <section ref={containerRef} id="impact" className="relative w-full py-24 md:py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="mb-20 md:mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4"
          >
            Out in the World
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-7xl text-foreground"
          >
            Real People. <br className="hidden md:block" /> Real Impact.
          </motion.h2>
        </div>

        {/* Asymmetric Mosaic Grid */}
        <div className="relative w-full min-h-[800px] md:min-h-[1000px] flex flex-col md:block">
          
          {/* Item 1 - Large / Left */}
          <motion.div 
            style={{ y: y1 }}
            className="group relative w-full md:w-[55%] h-[50vh] md:h-[700px] mb-8 md:mb-0 md:absolute md:top-0 md:left-0 overflow-hidden z-10"
          >
            <Image
              src={events[0].image}
              alt={events[0].title}
              fill
              className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
            {/* Hover Dark Overlay */}
            <div className="absolute inset-0 bg-background/80 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-end p-8 md:p-12">
              <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2">{events[0].date}</span>
              <h3 className="text-2xl md:text-4xl font-serif text-white leading-tight mb-2">{events[0].title}</h3>
              <p className="text-foreground/70 font-light text-sm md:text-base">{events[0].location}</p>
            </div>
          </motion.div>

          {/* Item 2 - Medium / Top Right Offset */}
          <motion.div 
            style={{ y: y2 }}
            className="group relative w-full md:w-[40%] h-[40vh] md:h-[500px] mb-8 md:mb-0 md:absolute md:top-24 md:right-0 overflow-hidden z-20"
          >
            <Image
              src={events[1].image}
              alt={events[1].title}
              fill
              className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-background/80 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-end p-6 md:p-8">
              <span className="text-accent text-[10px] font-bold tracking-widest uppercase mb-2">{events[1].date}</span>
              <h3 className="text-xl md:text-2xl font-serif text-white leading-tight mb-2">{events[1].title}</h3>
              <p className="text-foreground/70 font-light text-xs md:text-sm">{events[1].location}</p>
            </div>
          </motion.div>

          {/* Item 3 - Medium / Bottom Right Offset */}
          <motion.div 
            style={{ y: y3 }}
            className="group relative w-full md:w-[45%] h-[40vh] md:h-[600px] md:absolute md:top-[650px] md:right-[10%] overflow-hidden z-0"
          >
            <Image
              src={events[2].image}
              alt={events[2].title}
              fill
              className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-background/80 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-end p-6 md:p-8">
              <span className="text-accent text-[10px] font-bold tracking-widest uppercase mb-2">{events[2].date}</span>
              <h3 className="text-xl md:text-2xl font-serif text-white leading-tight mb-2">{events[2].title}</h3>
              <p className="text-foreground/70 font-light text-xs md:text-sm">{events[2].location}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
