"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { ClipboardList, FileText, Send, Plane, School } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: <ClipboardList className="w-6 h-6 text-white" />,
      title: "Free Consultation",
      description: "We analyze your profile and suggest the best universities and courses."
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: "Document Preparation",
      description: "Our experts help you prepare your SOP, LORs, and financial documents."
    },
    {
      icon: <Send className="w-6 h-6 text-white" />,
      title: "Application Submission",
      description: "We apply to shortlisted universities and track your offer letters."
    },
    {
      icon: <School className="w-6 h-6 text-white" />,
      title: "Visa Application",
      description: "Complete guidance on visa filing, interview prep, and medicals."
    },
    {
      icon: <Plane className="w-6 h-6 text-white" />,
      title: "Fly to UK",
      description: "Pre-departure briefing and assistance with accommodation and travel."
    }
  ];

  return (
    <SectionWrapper id="process" className="bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-4">Your Journey to UK</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A simple 5-step process to transform your dream into reality.
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -transform -translate-y-1/2 -z-10" />

        <div className="grid md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-6 relative z-10 group-hover:bg-accent transition-colors shadow-lg">
                <div className="group-hover:text-primary transition-colors">
                  {step.icon}
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center border-2 border-white">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
