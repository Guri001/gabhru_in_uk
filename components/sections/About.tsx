"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function About() {
  const features = [
    "Personalized Career Guidance",
    "Complete Visa Assistance",
    "University Selection Support",
    "Post-Arrival Support in UK"
  ];

  return (
    <SectionWrapper id="about" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 relative">
             {/* Placeholder for Founder Image */}
             <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
              <Image src="/images/founder.jpg" alt="Founder" fill className="w-full h-full object-cover" />
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full -z-10" />
             <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full -z-10" />
          </div>
        </motion.div>

        {/* Content Side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
            Meet <span className="text-primary">Gabhru in UK</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Founded by <span className="font-semibold text-primary">Harjeet Singh</span>, we are dedicated to helping young Indian students navigate the complex journey of studying and building a career in the United Kingdom.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Our mission is simple: to provide honest, transparent, and effective guidance that turns your study abroad dreams into reality. We don't just send you to the UK; we help you succeed there.
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="text-accent w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-gray-800">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
