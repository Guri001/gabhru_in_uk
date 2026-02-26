import Image from "next/image";

export default function HisStory() {
  return (
    <section id="about" className="w-full bg-cream py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Broken Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start">
          
          {/* LEFT: Candid Photo - Grid Breaking */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-[90%] md:w-[85%] aspect-[4/5] mx-auto lg:mx-0 lg:-ml-8 z-10">
              <Image
                src="https://images.unsplash.com/photo-1542261777448-23d2a287091c?q=80&w=1400&auto=format&fit=crop"
                alt="Gabhru in UK - Candid community moment"
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover shadow-2xl skew-y-1 hover:skew-y-0 hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              {/* Saffron border accent offset */}
              <div className="absolute -inset-4 border-2 border-saffron -z-10 -translate-x-4 translate-y-4" />
            </div>
            {/* Background texture element */}
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-sand/20 rounded-full blur-3xl -z-20" />
          </div>

          {/* RIGHT: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center pt-8 lg:pt-20">
            <h2 className="hidden">His Story</h2>
            
            <div className="space-y-6 md:space-y-8">
              {/* Warm, Short Story */}
              <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-espresso font-semibold leading-tight tracking-tight">
                "From Punjab to the UK — I've been figuring this out the same way you are. The difference is, I started writing it down."
              </p>

              {/* Pillars as clean tags/chips */}
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-forest/20 rounded-full text-forest text-sm font-medium tracking-wide">
                  <span className="text-base">🏡</span> UK Immigration
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-forest/20 rounded-full text-forest text-sm font-medium tracking-wide">
                  <span className="text-base">📍</span> Community
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-forest/20 rounded-full text-forest text-sm font-medium tracking-wide">
                  <span className="text-base">🎙️</span> Media
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-forest/20 rounded-full text-forest text-sm font-medium tracking-wide">
                  <span className="text-base">✈️</span> Lifestyle
                </span>
              </div>

              {/* CTA Link */}
              <div className="pt-8">
                <a 
                  href="/about" 
                  className="group inline-flex items-center gap-3 text-saffron font-bold uppercase tracking-widest text-sm"
                >
                  <span className="relative">
                    His Full Story
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-saffron origin-left transform scale-x-100 transition-transform group-hover:scale-x-0" />
                  </span>
                  <span className="transform transition-transform group-hover:translate-x-2">&rarr;</span>
                </a>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
