import Link from "next/link";
import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity";
import { format } from "date-fns";
import MagneticButton from "@/components/ui/MagneticButton";

const LATEST_ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    "categoryTitles": categories[]->title,
    publishedAt,
    "coverImage": coverImage.asset->url,
    "estimatedReadTime": round(length(pt::text(content)) / 5 / 150)
  }
`;

type ArticleLite = {
  _id: string;
  title: string;
  slug: string;
  categoryTitles: string[] | null;
  publishedAt: string;
  coverImage: string | null;
  estimatedReadTime: number;
};

export default async function ArticlePreview() {
  const articles: ArticleLite[] = await client.fetch(LATEST_ARTICLES_QUERY, {}, { next: { revalidate: 60 } });

  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const sideArticles = articles.slice(1, 3);

  return (
    <section className="w-full py-24 md:py-32 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20">
          <div>
            <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block">
              Thought Leadership
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
              Insights & Articles
            </h2>
            <p className="text-foreground/70 text-lg max-w-xl font-light">
              Clear, factual analysis of current policies, immigration changes, and community impact.
            </p>
          </div>
          <div className="mt-8 md:mt-0 pb-2">
            <MagneticButton>
              <Link
                href="/articles"
                className="px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-background transition-colors text-xs font-bold tracking-[0.2em] uppercase inline-block"
              >
                View All Insights &rarr;
              </Link>
            </MagneticButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured Large Card */}
          <Link 
            href={`/articles/${featured.slug}`} 
            className="group lg:col-span-7 relative h-[500px] lg:h-[700px] block overflow-hidden bg-background-card"
          >
            {featured.coverImage && (
              <Image 
                src={featured.coverImage} 
                alt={featured.title} 
                fill 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
            
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <div>
                <span className="inline-block bg-accent text-background text-xs font-bold tracking-wider uppercase px-3 py-1 mb-4">
                  {featured.categoryTitles?.[0] || 'Uncategorized'}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4 group-hover:text-accent transition-colors duration-300">
                  {featured.title}
                  <span className="block w-0 h-[1px] bg-accent mt-4 group-hover:w-16 transition-all duration-500" />
                </h3>
                <div className="flex items-center gap-4 text-white/70 text-sm tracking-wider uppercase">
                  <span>{format(new Date(featured.publishedAt), 'MMM dd, yyyy')}</span>
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  <span>{Math.max(1, featured.estimatedReadTime)} MIN READ</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Right Side Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {sideArticles.map((article) => (
              <Link 
                key={article._id} 
                href={`/articles/${article.slug}`}
                className="group relative flex-1 h-[350px] lg:h-auto block overflow-hidden bg-background-card"
              >
                {article.coverImage && (
                  <Image 
                    src={article.coverImage} 
                    alt={article.title} 
                    fill 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div>
                    <span className="inline-block border border-accent/40 text-accent bg-background/50 backdrop-blur-md text-xs font-bold tracking-wider uppercase px-3 py-1 mb-3">
                      {article.categoryTitles?.[0] || 'Uncategorized'}
                    </span>
                    <h3 className="font-serif text-2xl text-white leading-snug mb-3 group-hover:text-accent transition-colors duration-300">
                      {article.title}
                      <span className="block w-0 h-[1px] bg-accent mt-3 group-hover:w-12 transition-all duration-500" />
                    </h3>
                    <div className="flex items-center gap-4 text-white/70 text-xs tracking-wider uppercase">
                      <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</span>
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      <span>{Math.max(1, article.estimatedReadTime)} MIN READ</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
