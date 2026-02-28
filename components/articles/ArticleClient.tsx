"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaXTwitter, FaWhatsapp, FaLinkedinIn } from "react-icons/fa6";
import { Link2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ArticleClient({ title, url }: { title: string; url: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [copied, setCopied] = useState(false);

  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Reading Progress Bar (Saffron) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4px] bg-saffron z-[9999] origin-left"
        style={{ scaleX }}
      />

      {/* Sticky Byline & Share Bar for Desktop */}
      <div className="hidden lg:flex flex-col gap-10 w-64 shrink-0 font-sans sticky top-32">
        
        {/* Author Byline */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
                alt="Gabhru in UK"
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-espresso font-bold text-sm uppercase tracking-widest">Gabhru in UK</span>
              <span className="text-sand text-[10px] uppercase tracking-widest font-bold mt-1">Author</span>
            </div>
          </div>
        </div>

        {/* Share Links */}
        <div className="flex flex-col gap-4 border-t border-sand/20 pt-8">
          <span className="text-[10px] text-walnut/50 uppercase tracking-[0.2em] font-bold">Share this story</span>
          <div className="flex flex-row gap-3">
            <motion.a 
              whileTap={{ scale: 0.9 }}
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-sand/10 text-espresso hover:bg-saffron hover:text-white transition-colors border border-sand/20 shadow-sm hover:shadow-md"
            >
              <FaXTwitter size={14} />
            </motion.a>
            <motion.a 
              whileTap={{ scale: 0.9 }}
              href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-sand/10 text-espresso hover:bg-saffron hover:text-white transition-colors border border-sand/20 shadow-sm hover:shadow-md"
            >
              <FaWhatsapp size={14} />
            </motion.a>
            <motion.a 
              whileTap={{ scale: 0.9 }}
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-sand/10 text-espresso hover:bg-saffron hover:text-white transition-colors border border-sand/20 shadow-sm hover:shadow-md"
            >
              <FaLinkedinIn size={14} />
            </motion.a>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-sand/10 text-espresso hover:bg-saffron hover:text-white transition-colors border border-sand/20 shadow-sm hover:shadow-md group/copy"
            >
              <Link2 size={14} />
              <span className="absolute left-14 bg-white border border-espresso/20 text-espresso text-[10px] uppercase px-3 py-1.5 opacity-0 group-hover/copy:opacity-100 transition-opacity pointer-events-none w-max shadow-md rounded-sm">
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating Share Bar for Mobile */}
      <div className="fixed bottom-0 left-0 w-full z-40 p-4 bg-cream/95 backdrop-blur-md border-t border-sand/20 justify-center flex lg:hidden gap-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <motion.a 
          whileTap={{ scale: 0.9 }}
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank" rel="noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full border border-sand/40 hover:border-saffron hover:bg-saffron hover:text-white transition-colors shadow-sm"
        >
          <FaXTwitter size={16} />
        </motion.a>
        
        <motion.a 
          whileTap={{ scale: 0.9 }}
          href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
          target="_blank" rel="noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full border border-sand/40 hover:border-saffron hover:bg-saffron hover:text-white transition-colors shadow-sm"
        >
          <FaWhatsapp size={16} />
        </motion.a>

        <motion.a 
          whileTap={{ scale: 0.9 }}
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
          target="_blank" rel="noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full border border-sand/40 hover:border-saffron hover:bg-saffron hover:text-white transition-colors shadow-sm"
        >
          <FaLinkedinIn size={16} />
        </motion.a>

        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleCopy}
          className="relative flex items-center justify-center w-12 h-12 rounded-full border border-sand/40 hover:border-saffron hover:bg-saffron hover:text-white transition-colors shadow-sm"
        >
          <Link2 size={16} />
          <span className="absolute bottom-14 bg-white border border-espresso/20 text-espresso text-[10px] uppercase px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-max shadow-lg rounded-sm">
            {copied ? "Copied!" : "Copy !"}
          </span>
        </motion.button>
      </div>

      {/* Back to Articles Button - visible at bottom */}
      <div className="max-w-[680px] mx-auto mt-24 mb-12 flex border-t border-sand/20 pt-12">
        <Link href="/articles" className="group flex items-center gap-3 text-xs tracking-widest uppercase text-saffron font-bold hover:text-espresso transition-colors">
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowLeft size={16} />
          </motion.span>
          Back to Insights
        </Link>
      </div>
    </>
  );
}
