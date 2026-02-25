import { groq } from "next-sanity";
import { client } from "@/lib/sanity";
import ArticleListClient from "@/components/articles/ArticleListClient";

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
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-foreground mb-6">
            Insights & Articles
          </h1>
          <p className="text-foreground/70 text-lg md:text-xl font-light max-w-3xl">
            Trusted analysis, interpreted policy updates, and engaging lifestyle features. Stay informed with our latest publications.
          </p>
        </header>
        
        <ArticleListClient initialArticles={articles} />
      </div>
    </main>
  );
}
