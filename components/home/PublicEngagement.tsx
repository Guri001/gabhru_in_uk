"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin, CalendarDays } from "lucide-react";

const ENGAGEMENTS = [
  {
    id: 1,
    title: "International Policy Summit",
    description: "Keynote address on the economic impact of modern immigration policies in the UK.",
    date: "14 Oct 2023",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Community Townhall",
    description: "Open dialogue with international students discussing post-study work visa transitions.",
    date: "28 Nov 2023",
    location: "Manchester, UK",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Global Diaspora Forum",
    description: "Panel discussion mapping the future trajectories of South Asian professionals in Europe.",
    date: "15 Jan 2024",
    location: "Birmingham, UK",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=800"
  }
];

export default function PublicEngagement() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-[#0A1128] text-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Public Engagement <br /> & Social Impact</h2>
          <div className="h-[2px] w-16 bg-[#0066FF]" />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {ENGAGEMENTS.map((item, index) => (
            <motion.div 
              key={item.id} 
              variants={cardVariants}
              className={`group overflow-hidden bg-[#121212] flex flex-col ${index === 1 ? 'lg:translate-y-12' : ''}`}
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-4 uppercase tracking-wider">
                  <span className="flex items-center gap-1"><CalendarDays size={14} /> {item.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {item.location}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif mb-3 group-hover:text-[#0066FF] transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
