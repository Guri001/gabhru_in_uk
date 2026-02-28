export default function VibeStrip() {
  const items = [
    { text: "UK Immigration", color: "text-saffron" },
    { text: "·", color: "text-sand" },
    { text: "Community Voice", color: "text-sand" },
    { text: "·", color: "text-saffron" },
    { text: "Lifestyle", color: "text-saffron" },
    { text: "·", color: "text-sand" },
    { text: "Real Stories", color: "text-sand" },
    { text: "·", color: "text-saffron" },
    { text: "Punjabi in Britain", color: "text-saffron" },
    { text: "·", color: "text-sand" },
    { text: "Media Personality", color: "text-sand" },
    { text: "·", color: "text-saffron" },
    { text: "Awareness", color: "text-saffron" },
    { text: "·", color: "text-sand" },
    { text: "UK Life", color: "text-sand" },
    { text: "·", color: "text-saffron" },
  ];

  return (
    <section className="w-full bg-white h-[80px] flex items-center overflow-hidden border-t border-espresso/10 relative z-20">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Render multiple sets to ensure seamless infinite scroll */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center space-x-6 px-3">
            {items.map((item, index) => (
              <span key={index} className={`font-heading text-lg md:text-xl uppercase tracking-[0.2em] font-bold ${item.color}`}>
                {item.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
