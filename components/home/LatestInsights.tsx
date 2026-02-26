import Image from "next/image";
import Link from "next/link";

export default function LatestInsights() {
  return (
    <section className="w-full bg-cream py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="flex justify-between items-end mb-16 md:mb-24">
          <h2 className="font-heading text-4xl md:text-6xl text-walnut font-bold tracking-tight">
            From the Desk of Gabhru
          </h2>
          <Link href="/articles" className="hidden md:inline-flex items-center gap-2 text-saffron font-bold uppercase tracking-widest text-sm hover:text-espresso transition-colors">
            Read All Insights &rarr;
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* ONE featured article: large, left-aligned */}
          <Link href="/articles/navigating-uk-visa-rules-2024" className="w-full lg:w-[60%] group cursor-pointer flex flex-col">
            <div className="relative w-full aspect-[16/10] overflow-hidden mb-8 shadow-sm">
              <Image 
                src="https://images.unsplash.com/photo-1544716278-e513176f20b5?q=80&w=2000&auto=format&fit=crop"
                alt="Navigating UK Visas"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4 bg-saffron text-white px-4 py-1.5 justify-center flex items-center rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                Immigration
              </div>
            </div>
            <h3 className="font-heading text-3xl md:text-5xl text-espresso font-bold mb-5 leading-tight group-hover:underline decoration-saffron decoration-4 underline-offset-8 transition-all">
              The Reality of Navigating the New UK Visa Rules in 2024
            </h3>
            <p className="text-walnut/70 text-lg md:text-xl line-clamp-2 md:leading-relaxed">
              Breaking down the latest changes and what they actually mean for you, your family, and your future in Britain. No jargon, just facts.
            </p>
          </Link>

          {/* TWO smaller articles stacked */}
          <div className="w-full lg:w-[40%] flex flex-col gap-10 md:gap-14 pt-10 lg:pt-0 border-t border-espresso/10 lg:border-t-0 p-0 lg:pl-12 lg:border-l lg:border-espresso/10">
            
            {/* Small 1 */}
            <Link href="/articles/finding-home-in-uk" className="group cursor-pointer flex gap-6 items-start">
              <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 overflow-hidden shadow-sm">
                <Image 
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop"
                  alt="City life"
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex flex-col justify-center h-full py-2">
                <div className="border border-saffron/30 text-saffron w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
                  Lifestyle
                </div>
                <h4 className="font-heading text-xl md:text-2xl text-espresso font-semibold group-hover:underline decoration-saffron decoration-2 underline-offset-4 leading-snug">
                  Finding Home Far Away from Home
                </h4>
              </div>
            </Link>

            {/* Small 2 */}
            <Link href="/articles/reclaiming-our-spaces" className="group cursor-pointer flex gap-6 items-start">
              <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 overflow-hidden shadow-sm">
                <Image 
                  src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=1000&auto=format&fit=crop"
                  alt="Community gathering"
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex flex-col justify-center h-full py-2">
                <div className="border border-saffron/30 text-saffron w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
                  Community
                </div>
                <h4 className="font-heading text-xl md:text-2xl text-espresso font-semibold group-hover:underline decoration-saffron decoration-2 underline-offset-4 leading-snug">
                  Why Reclaiming Our Spaces Matters Now More Than Ever
                </h4>
              </div>
            </Link>

          </div>

        </div>

        <div className="mt-16 md:hidden">
          <Link href="/articles" className="inline-flex items-center gap-2 text-saffron font-bold uppercase tracking-widest text-sm hover:text-espresso transition-colors">
            Read All Insights &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
