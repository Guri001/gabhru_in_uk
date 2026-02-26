import { groq } from "next-sanity";
import { client } from "@/lib/sanity";
import ArticleListClient from "@/components/articles/ArticleListClient";
import Image from "next/image";

// Force dynamic or revalidate to ensure fresh content
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
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-foreground leading-[1.1] mb-6 tracking-tight">
              Insights & Perspectives
            </h1>
            <p className="text-foreground/70 text-lg md:text-xl font-light">
              Analysis, personal reflections, and practical guides on navigating settlement and building a life in the UK.
            </p>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-accent/30">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
                alt="Gabhru in UK"
                fill
                className="object-cover grayscale-[20%]"
                sizes="56px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-serif text-lg leading-tight">Gabhru in UK</span>
              <span className="text-accent text-[10px] uppercase tracking-widest font-bold">Author & Editor</span>
            </div>
          </div>
        </header>
        
        <ArticleListClient initialArticles={articles} />
      </div>
    </main>
  );
}
