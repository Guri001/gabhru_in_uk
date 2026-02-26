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
    { name: "His Story", path: "/#about" },
    { name: "Media", path: "/#media" },
    { name: "Articles", path: "/articles" },
  ];

  return (
    <footer className="w-full bg-espresso text-cream relative z-20 pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
          
          {/* Left: Brand */}
          <div className="flex-1">
            <Link href="/" className="inline-block group magnetic-target mb-2 flex-col">
              <span className="font-heading font-bold text-3xl md:text-4xl text-cream group-hover:text-saffron transition-colors">
                Gabhru <span className="text-saffron">in UK</span>
              </span>
            </Link>
            <p className="text-cream/50 text-xs md:text-sm tracking-[0.2em] font-sans uppercase mt-2 max-w-xs">
              Public Figure | News & Media
            </p>
          </div>

          {/* Center: Nav Links */}
          <nav className="flex-1 w-full flex flex-wrap gap-x-8 gap-y-4 md:justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-xs uppercase tracking-[0.2em] font-bold font-sans text-cream/70 hover:text-saffron transition-colors magnetic-target py-2"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: Social Icons */}
          <div className="flex-1 flex md:justify-end gap-4 w-full">
            <MagneticButton>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-saffron/30 flex items-center justify-center text-cream hover:border-saffron hover:bg-saffron hover:text-espresso transition-all duration-300">
                <FaInstagram size={16} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-saffron/30 flex items-center justify-center text-cream hover:border-saffron hover:bg-saffron hover:text-espresso transition-all duration-300">
                <FaYoutube size={16} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-saffron/30 flex items-center justify-center text-cream hover:border-saffron hover:bg-saffron hover:text-espresso transition-all duration-300">
                <FaXTwitter size={16} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-saffron/30 flex items-center justify-center text-cream hover:border-saffron hover:bg-saffron hover:text-espresso transition-all duration-300">
                <FaLinkedinIn size={16} />
              </a>
            </MagneticButton>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-saffron/20 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-sans tracking-[0.2em] font-bold uppercase text-sand/60 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Gabhru in UK. All rights reserved.</p>
          <p>UK Immigration & Lifestyle</p>
        </div>
      </div>
    </footer>
  );
}
