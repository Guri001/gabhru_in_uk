"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type MomentProps = {
  src: string;
  alt: string;
  caption: { name: string; date: string; location: string };
  containerClass: string;
};

function MomentImage({ src, alt, caption, containerClass }: MomentProps) {
  return (
    <div className={`relative overflow-hidden group ${containerClass}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      {/* Saffron Overlay sliding up */}
      <div className="absolute inset-0 bg-saffron/90 flex flex-col justify-end p-6 md:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <p className="text-white font-heading text-xl md:text-2xl font-bold mb-1">{caption.name}</p>
        <p className="text-white/80 font-sans text-sm uppercase tracking-widest">
          {caption.location} &middot; {caption.date}
        </p>
      </div>
    </div>
  );
}

export default function OutInTheWorld() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="w-full bg-cream py-24 md:py-32 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Magazine Spread Heading */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end gap-x-6">
          <h2 className="font-heading text-5xl md:text-7xl lg:text-[7rem] leading-[0.85] tracking-tight text-walnut font-bold">
            Out in
          </h2>
          <span className="font-heading text-5xl md:text-7xl lg:text-[7rem] leading-[0.85] tracking-tight text-saffron font-bold italic block mt-2 md:mt-0">
            the World
          </span>
        </div>

        {/* Asymmetric Grid Wrapper */}
        <motion.div 
          className="flex flex-col gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Top Row: 1 Large Left, 2 Small Stacked Right */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 h-auto lg:h-[60vh]">
            {/* Big Left Image */}
            <motion.div variants={itemVariants} className="w-full lg:w-[60%] h-[50vh] lg:h-full relative shrink-0">
              <MomentImage 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2000&auto=format&fit=crop"
                alt="Speaking at community event"
                caption={{ name: "South Asian Heritage Month", date: "July 2025", location: "London" }}
                containerClass="w-full h-full"
              />
            </motion.div>

            {/* Small Stacked Right Images */}
            <div className="w-full lg:w-[40%] flex flex-col gap-6 md:gap-8 h-[70vh] lg:h-full">
              <motion.div variants={itemVariants} className="w-full h-1/2 relative">
                <MomentImage 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop"
                  alt="Community dinner"
                  caption={{ name: "Community Dinner", date: "March 2025", location: "Birmingham" }}
                  containerClass="w-full h-full"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="w-full h-1/2 relative">
                <MomentImage 
                  src="https://images.unsplash.com/photo-1574343513337-17551ab9c5c7?q=80&w=1000&auto=format&fit=crop"
                  alt="Podcast Interview"
                  caption={{ name: "BBC Asian Network", date: "Sept 2024", location: "Media City" }}
                  containerClass="w-full h-full"
                />
              </motion.div>
            </div>
          </div>

          {/* Bottom Row: Large Image Offset with Saffron Border */}
          <div className="flex flex-col lg:flex-row mt-12 md:mt-24">
            <div className="hidden lg:block lg:w-1/4" />
            <motion.div 
              variants={itemVariants} 
              className="w-full lg:w-[75%] h-[50vh] md:h-[60vh] relative pt-12 md:pt-0"
            >
              {/* Saffron offset border */}
              <div className="absolute -inset-y-6 -inset-x-4 md:-inset-8 border border-saffron z-0 translate-x-4 -translate-y-4 md:translate-x-8 md:-translate-y-8" />
              <MomentImage 
                src="https://images.unsplash.com/photo-1523580494112-071dcebd709b?q=80&w=2000&auto=format&fit=crop"
                alt="Graduation guidance session"
                caption={{ name: "Student Guidance Panel", date: "January 2025", location: "Manchester" }}
                containerClass="w-full h-full z-10"
              />
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
