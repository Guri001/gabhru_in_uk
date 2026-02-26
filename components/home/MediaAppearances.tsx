export default function MediaAppearances() {
  const appearances = [
    { outlet: "BBC Asian Network", type: "Interview", date: "Sept 2024" },
    { outlet: "South Asian Media", type: "Podcast", date: "Aug 2024" },
    { outlet: "Migration Today", type: "Feature", date: "July 2024" },
    { outlet: "London Live", type: "Panel", date: "May 2024" },
    { outlet: "The Guardian", type: "Mention", date: "Mar 2024" },
    { outlet: "BritAsia TV", type: "Host", date: "Jan 2024" },
  ];

  return (
    <section id="media" className="w-full bg-forest text-cream py-24 md:py-32 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-center md:text-left text-cream/80">
          They Know Him Too
        </h2>
      </div>

      {/* Marquee Row */}
      <div className="w-full flex items-center border-y border-white/10 h-32 relative overflow-hidden bg-forest">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-16 px-8">
              {appearances.map((app, index) => (
                <div key={index} className="flex flex-col items-start justify-center">
                  <span className="font-heading text-2xl md:text-3xl font-bold">{app.outlet}</span>
                  <span className="font-sans text-xs md:text-sm uppercase tracking-widest text-cream/60 mt-1">
                    {app.type} &middot; {app.date}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20 md:mt-32">
        <div className="max-w-5xl mx-auto text-center">
          <blockquote className="font-serif text-3xl md:text-5xl lg:text-[4rem] italic leading-[1.2] mb-12">
            <span className="text-saffron">"</span>
            He is reshaping the narrative for South Asian immigrants in the UK — turning confusion into clarity and isolation into community.
            <span className="text-saffron">"</span>
          </blockquote>
          <p className="font-sans text-sm md:text-base uppercase tracking-widest text-cream/70 font-semibold">— The Community Media Trust</p>
        </div>
      </div>
    </section>
  );
}
