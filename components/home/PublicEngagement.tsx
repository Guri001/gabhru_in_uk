"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const engagements = [
  {
    id: 1,
    title: "Parliamentary Address on Immigration Policy",
    category: "Parliament visits / panel lectures",
    date: "OCT 2025",
    location: "London, UK",
    description: "Detailed interpretation of the recent changes to the points-based system and its impact on South Asian skilled workers.",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200",
    featured: true, // Spans 2 rows
  },
  {
    id: 2,
    title: "Flood Relief Coordination",
    category: "Flood relief / humanitarian efforts",
    date: "SEP 2025",
    location: "Midlands",
    description: "Orchestrated community volunteer response during the autumn floods, directing resources to vulnerable households.",
    image: "https://images.unsplash.com/photo-1593113562656-62ce9b2f211d?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 3,
    title: "Annual Community Gathering",
    category: "Community gatherings",
    date: "AUG 2025",
    location: "Birmingham",
    description: "Cultural preservation and networking event drawing over 500 attendees from across the UK.",
    image: "https://images.unsplash.com/photo-1511632765486-a01c80cf8cb4?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 4,
    title: "Meeting with the Mayor",
    category: "Meetings with notable personalities",
    date: "JUL 2025",
    location: "Westminster",
    description: "Discussions surrounding local council initiatives to better support newly arrived families.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 5,
    title: "Fraud Awareness Campaign",
    category: "Awareness campaigns",
    date: "JUN 2025",
    location: "National (Online)",
    description: "A nationwide digital campaign exposed fraudulent visa practices, reaching over 100k views within 48 hours.",
    image: "https://images.unsplash.com/photo-1611095564985-6677498c89b9?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 6,
    title: "Legal Aid Collaboration",
    category: "Organisational collaborations",
    date: "MAY 2025",
    location: "Manchester",
    description: "Partnering with respected solicitors to provide free initial consultations to at-risk community members.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function PublicEngagement() {
  return (
    <section id="impact" className="w-full py-24 md:py-32 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block">
            Real World Impact
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
            Public Engagement & Social Impact
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl font-light">
            My work extends beyond digital interpretation, translating directly into tangible community advocacy and on-the-ground support initiatives.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {engagements.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-sm bg-background-card cursor-pointer ${
                item.featured ? "md:row-span-2 lg:col-span-2 lg:row-span-2" : "row-span-1 col-span-1"
              }`}
            >
              {/* Image Container mapped to correct sizes and uses transform only for scaling */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={`Gabhru in UK - ${item.title}`}
                  fill
                  className="object-cover transform group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  sizes={item.featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent opacity-80" />
              
              {/* Gold Accent Border on Hover */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Content Default - Bottom Aligned */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-accent text-background text-xs font-bold tracking-wider uppercase px-2 py-1 rounded-sm">
                    {item.date}
                  </span>
                  <span className="text-foreground/80 text-xs tracking-wider uppercase">
                    {item.location}
                  </span>
                </div>
                <h3 className={`font-serif text-foreground leading-tight ${item.featured ? "text-2xl md:text-4xl" : "text-xl"}`}>
                  {item.title}
                </h3>
              </div>

              {/* Hover Overlay Description */}
              <div className="absolute inset-0 bg-background/95 p-6 md:p-8 flex flex-col justify-center transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <span className="text-accent text-xs tracking-widest uppercase mb-4 block">
                  {item.category}
                </span>
                <p className="text-foreground/90 font-light leading-relaxed text-sm md:text-base mb-6">
                  {item.description}
                </p>
                <div className="mt-auto">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                    View Details
                    <span className="block w-4 h-[1px] bg-accent" />
                  </span>
                </div>
              </div>

              {/* Subtle lift effect on the card itself */}
              <div className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-1 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
