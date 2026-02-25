import Link from "next/link";
import { FaInstagram, FaYoutube, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Footer() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Gabhru in UK",
    "url": "https://gabhruinuk.com",
    "jobTitle": "Public Figure | News & Media",
    "description": "Trusted voice, community leader, and media personality covering UK immigration, lifestyle, settlement, and community education.",
    "sameAs": [
      "https://instagram.com/gabhruinuk",
      "https://youtube.com/gabhruinuk",
      "https://twitter.com/gabhruinuk",
      "https://linkedin.com/in/gabhruinuk"
    ]
  };

  const navLinks = [
    { name: "About", path: "/#about" },
    { name: "Impact", path: "/#impact" },
    { name: "Media", path: "/#media" },
    { name: "Articles", path: "/articles" },
    { name: "Press", path: "/#press" },
  ];

  return (
    <footer className="w-full bg-[#0A0A0A] text-foreground relative z-20 pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
          
          {/* Left: Brand */}
          <div className="flex-1">
            <Link href="/" className="inline-block group magnetic-target mb-2">
              <span className="font-serif text-3xl md:text-4xl text-foreground group-hover:text-accent transition-colors">
                Gabhru in UK
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent ml-1 group-hover:scale-150 transition-transform"></span>
            </Link>
            <p className="text-foreground/50 text-sm tracking-widest uppercase mt-2 max-w-xs">
              Public Figure | News & Media
            </p>
          </div>

          {/* Center: Nav Links */}
          <nav className="flex-1 w-full flex flex-wrap gap-x-8 gap-y-4 md:justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-accent transition-colors magnetic-target py-2"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: Social Icons */}
          <div className="flex-1 flex md:justify-end gap-4 w-full">
            <MagneticButton>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-foreground hover:border-accent hover:bg-accent hover:text-background transition-all duration-300">
                <FaInstagram size={16} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-foreground hover:border-accent hover:bg-accent hover:text-background transition-all duration-300">
                <FaYoutube size={16} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-foreground hover:border-accent hover:bg-accent hover:text-background transition-all duration-300">
                <FaXTwitter size={16} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-foreground hover:border-accent hover:bg-accent hover:text-background transition-all duration-300">
                <FaLinkedinIn size={16} />
              </a>
            </MagneticButton>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent/20 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase text-foreground/40 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Gabhru in UK. All rights reserved.</p>
          <p>Public Figure | News & Media &ndash; UK Immigration & Lifestyle</p>
        </div>
      </div>
    </footer>
  );
}
