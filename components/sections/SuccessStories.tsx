"use client";

import SectionWrapper from "./SectionWrapper";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function SuccessStories() {
  // Placeholder data - normally fetched from CMS/API
  const testimonials = [
    {
      name: "Rahul Sharma",
      university: "University of Greenwich",
      text: "Gabhru in UK made my dream come true. Their guidance on visa processing was impeccable!",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Priya Patel",
      university: "Coventry University",
      text: "I was confused about which course to pick. Harjeet paaji guided me personally and now I'm loving my course.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Amit Singh",
      university: "Leeds Beckett University",
      text: "The post-arrival support was a game changer. They helped me find accommodation within days.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <SectionWrapper id="success" className="bg-primary text-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-4">Success Stories</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Don't just take our word for it. Hear from the students who are already there.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
             <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative hover:bg-white/15 transition-colors h-full flex flex-col">
                <Quote className="w-10 h-10 text-accent mb-6 opacity-50" />
                <p className="text-lg leading-relaxed text-gray-200 mb-6 flex-grow">"{story.text}"</p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-accent flex-shrink-0">
                    <Image 
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-white">{story.name}</div>
                    <div className="text-sm text-accent">{story.university}</div>
                  </div>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
