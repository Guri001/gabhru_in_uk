"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionWrapper from "./SectionWrapper";
import { ArrowRight, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B1C2D] via-[#0f253a] to-[#0B1C2D] text-white pt-20">
      
      {/* Background Abstract Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[100px]"
        />
        <motion.div 
           animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[80px]"
        />
      </div>

      <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-accent font-semibold mb-6 text-sm md:text-base">
              🚀 Build Your Dream Career in UK
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins leading-tight mb-6"
          >
            Study, Work & Live in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">UK</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
          >
            Expert guidance for Indian students. From university admission to visa processing, we handle everything for you.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button size="lg" className="group flex items-center justify-center gap-[10px]">
              Get Started Free <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
                      <Link
            href="https://www.instagram.com/gabhru_in_uk"
            target="_blank"
            rel="noopener noreferrer"
            
          >
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white/20 hover:bg-white/10 flex items-center justify-center gap-[10px] w-full md:w-auto"
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
            </Button>
          </Link>
          </motion.div>
        </div>

        {/* Visual Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative hidden lg:block"
        >
          {/* Main Card/Image Mockup */}
          <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl transform rotate-[-3deg] hover:rotate-0 transition-all duration-500">
             {/* Placeholder for content - simulating a "Success" card or student profile */}
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-accent">
                   <Image 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
                    alt="Student Avatar"
                    fill
                    className="object-cover"
                   />
                </div>
                <div>
                  <div className="text-white font-semibold">Rohit Singh</div>
                  <div className="text-white/60 text-xs">University of Manchester</div>
                </div>
             </div>
             <div className="relative h-64 w-full rounded-2xl mb-4 overflow-hidden border border-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
                  alt="Student Success"
                  fill
                  className="object-cover"
                />
             </div>
             <div className="flex justify-between items-center">
                <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Visa Approved
                </div>
                <div className="text-sm text-gray-400">Just now</div>
             </div>
          </div>

          {/* Floating Elements */}
          {/* <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-10 -right-10 bg-white p-4 rounded-xl shadow-lg z-20"
          >
             <span className="text-2xl">🇬🇧</span>
          </motion.div> */}
             <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-10 -left-10 bg-[#0B1C2D] p-4 rounded-xl shadow-lg border border-white/20 z-20 flex items-center gap-2"
          >
             <div className="text-accent font-bold text-xl">100+</div>
             <div className="text-xs text-gray-300">Students<br/>Placed</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
