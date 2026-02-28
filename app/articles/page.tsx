import { groq } from "next-sanity";
import { client } from "@/lib/sanity";
import ArticleListClient from "@/components/articles/ArticleListClient";
import Image from "next/image";

export const revalidate = 60;

const ALL_ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc) {
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

export default async function ArticlesPage() {
  const articles = await client.fetch(ALL_ARTICLES_QUERY);

  return (
    <main className="min-h-screen bg-cream">
      
      {/* Dark Espresso Hero */}
      <section className="w-full bg-white text-espresso pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-espresso/10 pb-16">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-[6rem] font-heading font-bold leading-[0.9] mb-8 tracking-tight">
                <span className="text-espresso block mb-3">Insights &</span> 
                <span className="text-saffron block italic">Perspectives</span>
              </h1>
              <p className="text-espresso/80 text-lg md:text-xl font-sans max-w-xl">
                Analysis, personal reflections, and practical guides on navigating settlement and building a life in the UK.
              </p>
            </div>
            
            <div className="flex items-center gap-4 shrink-0">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-saffron/30">
                <Image
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
                  alt="Gabhru in UK"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-espresso font-sans font-bold text-sm tracking-widest uppercase mb-1">By Gabhru in UK</span>
                <span className="text-saffron text-[10px] uppercase tracking-[0.2em] font-bold">Author & Editor</span>
              </div>
            </div>
          </header>
        </div>
      </section>
      
      {/* Article List Section */}
      <section className="container mx-auto px-6 max-w-7xl py-16">
        <ArticleListClient initialArticles={articles} />
      </section>

    </main>
  );
}
