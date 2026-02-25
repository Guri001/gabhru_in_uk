"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaXTwitter, FaWhatsapp, FaLinkedinIn } from "react-icons/fa6";
import { Link2, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[9999] origin-left"
        style={{ scaleX }}
      />

      {/* Floating Share Bar */}
      <div className="fixed bottom-0 md:bottom-auto md:top-1/3 left-0 md:left-6 w-full md:w-auto z-40 p-4 md:p-0 bg-background/95 backdrop-blur-md md:bg-transparent border-t border-accent/20 md:border-none flex flex-row md:flex-col items-center justify-center md:justify-start gap-4 md:gap-6">
        <a 
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank" rel="noreferrer"
          className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-foreground/10 hover:border-accent hover:bg-accent hover:text-background transition-colors"
        >
          <FaXTwitter size={16} />
          <span className="absolute left-14 bg-background border border-accent/20 text-[10px] uppercase px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block w-max">
            Share on X
          </span>
        </a>
        
        <a 
          href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
          target="_blank" rel="noreferrer"
          className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-foreground/10 hover:border-accent hover:bg-accent hover:text-background transition-colors"
        >
          <FaWhatsapp size={16} />
          <span className="absolute left-14 bg-background border border-accent/20 text-[10px] uppercase px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block w-max">
            WhatsApp
          </span>
        </a>

        <a 
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
          target="_blank" rel="noreferrer"
          className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-foreground/10 hover:border-accent hover:bg-accent hover:text-background transition-colors"
        >
          <FaLinkedinIn size={16} />
          <span className="absolute left-14 bg-background border border-accent/20 text-[10px] uppercase px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block w-max">
            LinkedIn
          </span>
        </a>

        <button 
          onClick={handleCopy}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-foreground/10 hover:border-accent hover:bg-accent hover:text-background transition-colors"
        >
          <Link2 size={16} />
          <span className="absolute left-14 md:bottom-auto bottom-12 bg-background border border-accent/20 text-[10px] uppercase px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-max">
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </button>
      </div>

      {/* Back to Articles Button - visible at bottom */}
      <div className="max-w-[680px] mx-auto mt-20 mb-10 flex border-t border-accent/20 pt-10">
        <Link href="/articles" className="group flex items-center gap-3 text-sm tracking-widest uppercase text-accent font-bold hover:text-accent-hover transition-colors">
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowLeft size={16} />
          </motion.span>
          Back to Articles
        </Link>
      </div>
    </>
  );
}
