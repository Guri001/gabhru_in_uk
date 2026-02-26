"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutStrip() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-background-secondary overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        {/* Large Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 md:mb-32 flex justify-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-center text-foreground max-w-4xl leading-[1.3] text-foreground/90">
            &ldquo;Helping South Asians navigate life in the UK — through honest storytelling, verified information, and community.&rdquo;
          </h2>
        </motion.div>

        {/* Two Columns */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          {/* LEFT: Candid Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-[45%] relative h-[60vh] md:h-[75vh] group overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1500&auto=format&fit=crop"
              alt="Gabhru in UK - Community Moment"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04]"
            />
          </motion.div>

          {/* RIGHT: Paragraph */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-[55%] flex flex-col justify-center"
          >
            <p className="text-foreground/80 font-light text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              What started as a personal journey of relocation has grown into a trusted platform for thousands. I realized early on that moving to the UK isn&apos;t just about visas and paperwork—it&apos;s about finding community, understanding the unwritten rules of a new culture, and building a life you can be proud of. My mission is to bridge that gap. Every piece of advice I share and every story I tell is rooted in lived experience, aiming to make your transition smoother and your ambitions more attainable.
            </p>
            
            <div className="self-start mt-6">
              <a href="/articles" className="group flex items-center gap-3 text-accent font-medium uppercase tracking-[0.2em] text-sm relative">
                Read Full Story
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
