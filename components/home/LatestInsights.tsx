import Link from "next/link";
import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity";
import { format } from "date-fns";

const LATEST_ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    "categoryTitles": categories[]->title,
    excerpt,
    publishedAt,
    "coverImage": coverImage.asset->url,
    "estimatedReadTime": round(length(pt::text(content)) / 5 / 150)
  }
`;

export default async function LatestInsights() {
  const articles = await client.fetch(LATEST_ARTICLES_QUERY);
  
  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const stacked = articles.slice(1);

  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">Insights & Perspectives</h2>
          <Link href="/articles" className="group flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.2em]">
            All Insights
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* LEFT: Featured (60%) */}
          <Link href={`/articles/${featured.slug}`} className="group w-full md:w-[60%] flex flex-col">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-background-secondary mb-6 border border-white/5">
              {featured.coverImage && (
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-accent text-[10px] uppercase font-bold tracking-widest mb-3">
                {featured.categoryTitles?.[0] || 'Uncategorized'}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4 group-hover:text-accent transition-colors duration-300 leading-snug">
                {featured.title}
              </h3>
              {featured.excerpt && (
                <p className="text-foreground/70 font-light text-base md:text-lg line-clamp-2 max-w-2xl leading-relaxed">
                  {featured.excerpt}
                </p>
              )}
            </div>
          </Link>

          {/* RIGHT: Stacked (40%) */}
          <div className="w-full md:w-[40%] flex flex-col gap-10 md:gap-8">
            {stacked.map((article: any) => (
              <Link href={`/articles/${article.slug}`} key={article._id} className="group flex flex-col lg:flex-row gap-6">
                <div className="relative w-full lg:w-40 aspect-video lg:aspect-square overflow-hidden bg-background-secondary shrink-0 border border-white/5">
                  {article.coverImage && (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 1024px) 100vw, 160px"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-foreground/40 text-[10px] tracking-widest uppercase font-bold mb-3">
                    {format(new Date(article.publishedAt), 'MMM dd, yyyy')}
                  </div>
                  <h4 className="font-serif text-[1.35rem] leading-snug text-foreground group-hover:text-accent transition-colors duration-300">
                    {article.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
