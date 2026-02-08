"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { ShieldCheck, Award, HeartHandshake, History } from "lucide-react";

export default function WhyUs() {
  const reasons = [
    {
      icon: <History className="w-8 h-8 text-primary" />,
      title: "Proven Track Record",
      description: "Years of experience helping students successfully reach their dream universities in the UK."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "100% Transparency",
      description: "No hidden charges or false promises. We believe in building trust through total honesty."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Expert Team",
      description: "Our counselors are UK education specialists who stay updated with the latest visa rules."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-primary" />,
      title: "Student-First Approach",
      description: "We treat every student's career as our own, providing personalized guidance at every step."
    }
  ];

  return (
    <SectionWrapper id="why-us" className="bg-white">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Content Side */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              Why Choose <br/><span className="text-primary">Gabhru in UK?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We understand that moving to a new country is a big decision. That's why we offer more than just consulting – we offer a partnership for your future.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {reasons.map((reason, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-2">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-primary">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Side */}
        <motion.div 
          className="flex-1 w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
             {/* Abstract Gradient Background */}
             <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-900 opacity-90" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 border border-white/20 rounded-2xl backdrop-blur-md bg-white/10 max-w-sm">
                   <div className="text-5xl font-bold text-accent mb-2">98%</div>
                   <div className="text-white text-xl font-medium">Visa Success Rate</div>
                   <div className="mt-4 text-white/80 text-sm">Join hundreds of successful students who are now living their dream in the UK.</div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
