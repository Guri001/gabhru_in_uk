"use client";

import SectionWrapper from "./SectionWrapper";
import { Card } from "@/components/ui/card";
import { GraduationCap, Plane, Home, Briefcase } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <GraduationCap className="w-10 h-10 text-primary" />,
      title: "University Admission",
      description: "Guidance on selecting the right course and university tailored to your profile and career goals."
    },
    {
      icon: <Plane className="w-10 h-10 text-primary" />,
      title: "Visa Processing",
      description: "End-to-end support for your student visa application, ensuring all documentation is perfect."
    },
    {
      icon: <Home className="w-10 h-10 text-primary" />,
      title: "Accommodation",
      description: "Assistance in finding safe and affordable student housing near your university."
    },
    {
      icon: <Briefcase className="w-10 h-10 text-primary" />,
      title: "Career Counseling",
      description: "Expert advice on part-time jobs, internships, and building a long-term career in the UK."
    }
  ];

  return (
    <SectionWrapper id="services" className="bg-gray-50">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-4">Our Premium Services</h2>
        <p className="text-lg text-gray-600">
          Everything you need to start your new life in the UK, all in one place.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="h-full flex flex-col items-center text-center hover:border-accent/50 transition-colors">
            <div className="mb-6 p-4 bg-primary/5 rounded-full">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
