"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "His Story", path: "/#about" },
    { name: "Media", path: "/#media" },
    { name: "Articles", path: "/articles" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[9990] transition-colors duration-400 ${
          scrolled ? "bg-cream/90 backdrop-blur-md border-b border-espresso/5 py-4 shadow-sm" : "bg-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group flex flex-col magnetic-target z-[9996]">
            <span className="font-heading text-2xl tracking-tighter text-espresso font-bold group-hover:text-saffron transition-colors">
              Gabhru <span className="text-saffron">in UK</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="relative text-sm font-sans font-bold text-espresso hover:text-saffron transition-colors magnetic-target uppercase tracking-[0.15em]"
              >
                {link.name}
                {pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-saffron"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              href="#contact"
              className="ml-4 px-6 py-3 text-xs font-bold bg-espresso text-cream hover:bg-saffron hover:text-espresso transition-colors rounded-none magnetic-target uppercase tracking-widest"
            >
              Let's Talk
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-espresso hover:text-saffron transition-colors z-[9996] relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} className="text-cream" /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[9995] bg-espresso flex flex-col justify-center items-center px-6"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="flex flex-col items-center gap-10 w-full"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 }
                  }}
                >
                  <Link
                    href={link.path}
                    className="font-heading text-4xl md:text-5xl font-bold text-cream hover:text-saffron transition-colors block tracking-tighter"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 }
                }}
                className="mt-8 w-full max-w-sm"
              >
                <Link
                  href="#contact"
                  className="block w-full text-center px-8 py-5 text-sm font-bold bg-saffron text-espresso hover:bg-cream transition-colors uppercase tracking-widest"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Let's Talk
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Background Accent */}
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-saffron/10 rounded-full blur-[100px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
