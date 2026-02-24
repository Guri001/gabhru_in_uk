"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-[#FAFAFA] text-[#121212] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Image Column */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 border border-[#0066FF] translate-x-4 translate-y-4 z-0" />
              <div className="absolute inset-x-0 bottom-0 top-8 bg-[#0A1128]/5 z-0" />
              <div className="relative z-10 w-full h-full overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200"
                  alt="Gabhru in UK Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-medium mb-2 tracking-tight text-[#0A1128]">
              The Face of modern <br className="hidden md:block"/>UK Immigration
            </h2>
            <motion.div 
              className="h-[2px] bg-[#0066FF] mb-8"
              initial={{ width: 0 }}
              animate={isInView ? { width: "80px" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
            />
            
            <div className="prose prose-lg md:prose-xl prose-stone max-w-none text-gray-700 font-light leading-relaxed">
              <p>
                As a prominent public figure and media personality, Gabhru in UK has established a distinguished platform dedicated to unravelling the complexities of life abroad. With an unwavering commitment to factual dialogue, his work traverses the intricate landscapes of UK immigration, cultural assimilation, and modern lifestyle.
              </p>
              <p>
                His journey is characterised by a relentless pursuit of clarity in an often-clouded media environment. Through substantive interviews, civic engagement, and editorial features, he not only documents the South Asian diaspora&#39;s experiences but fundamentally reshapes how these narratives are perceived on a global scale.
              </p>
              <p>
                From advising prospective immigrants to leading critical discussions on policy impacts, Gabhru serves as a trusted voice bridging communities. His approach—rooted in journalistic integrity and grounded in real-world implications—delivers an authoritative perspective that resonates deeply with audiences across borders.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
