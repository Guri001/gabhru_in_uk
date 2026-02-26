import MagneticButton from "@/components/ui/MagneticButton";

export default function PressContact() {
  return (
    <section className="w-full py-32 md:py-48 bg-background-secondary border-b border-white/5">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        
        <p className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
          Official Biography & Press
        </p>

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground/90 leading-[1.3] mb-16">
          Gabhru is a recognized media personality, public speaker, and community leader based in the UK. His work bridges cultural settlement, immigration analysis, and community empowerment. For the past decade, he has been a trusted voice for the South Asian diaspora.
        </h2>

        <div className="mb-16">
          <p className="text-foreground/50 text-xs md:text-sm uppercase tracking-widest mb-6">
            For media enquiries and collaborations:
          </p>
          <a href="mailto:press@gabhruinuk.com" className="font-serif text-3xl md:text-5xl text-accent hover:text-accent-hover transition-colors underline decoration-accent/30 underline-offset-8 hover:decoration-accent">
            press@gabhruinuk.com
          </a>
        </div>

        <div className="flex justify-center mt-12">
          <MagneticButton>
            <a href="mailto:press@gabhruinuk.com" className="inline-flex items-center justify-center px-10 py-5 bg-background border border-accent/30 text-accent font-bold text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-all duration-300">
              Get In Touch
            </a>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
