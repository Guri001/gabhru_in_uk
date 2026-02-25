"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const tags = [
  "UK Immigration",
  "Settlement Lifestyle",
  "Community Education",
  "News Interpretation"
];

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center md:items-stretch">
          
          {/* Left Column: Image 55% */}
          <motion.div 
            className="w-full md:w-[55%] relative rounded-none overflow-hidden min-h-[500px] md:min-h-[700px]"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1543165365-07232ed12fad?auto=format&fit=crop&q=80&w=1600"
              alt="Gabhru in UK - Portrait placeholder"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </motion.div>

          {/* Right Column: Content 45% */}
          <motion.div 
            className="w-full md:w-[45%] flex flex-col justify-center"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block">
              Who Is Gabhru in UK
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-8 leading-tight">
              A Trusted Voice for the Community
            </h2>
            
            <div className="space-y-6 text-foreground/80 font-light text-base md:text-lg leading-relaxed mb-10">
              <p>
                As a respected figure in the realms of UK immigration and South Asian community affairs, I have dedicated years to interpreting complex political and social landscapes into accessible, actionable guidance.
              </p>
              <p>
                My journey began with a commitment to demystify the settlement process and advocate for the rights of those striving to build a successful life in the UK. This work naturally evolved into a broader media presence, providing trusted interpretation of developing news.
              </p>
              <p>
                From community events to legislative analysis, my mission remains singular: empowering individuals with the clarity and confidence needed to navigate their settlement lifestyle securely.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-4 py-2 border border-accent/40 rounded-full text-xs font-medium tracking-wide text-foreground hover:bg-accent/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
