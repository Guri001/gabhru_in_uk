import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity";
import { ARTICLE_BY_SLUG_QUERY } from "@/lib/queries";
import { format } from "date-fns";
import ArticleClient from "@/components/articles/ArticleClient";
import CustomPortableText from "@/components/articles/CustomPortableText";

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug: params.slug });

  if (!article) {
    return { title: "Article Not Found" };
  }

  const url = `https://gabhruinuk.com/articles/${article.slug}`;
  
  // Strip portable text to get a description if excerpt is not available
  const description = article.excerpt || "Read the latest insights and analysis from Gabhru in UK.";

  return {
    title: `${article.title} | Gabhru in UK`,
    description,
    openGraph: {
      title: article.title,
      description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      authors: ["Gabhru in UK"],
      images: [
        {
          url: article.coverImage || "https://gabhruinuk.com/og-default.jpg",
          width: 1200,
          height: 630,
          alt: `Gabhru in UK - ${article.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [article.coverImage || "https://gabhruinuk.com/og-default.jpg"],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug: params.slug });

  if (!article) {
    notFound();
  }

  const url = `https://gabhruinuk.com/articles/${article.slug}`;
  const plainTextLength = JSON.stringify(article.content).length;
  const estimatedReadTime = Math.max(1, Math.round(plainTextLength / 5 / 150));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.coverImage ? [article.coverImage] : [],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: [{
      "@type": "Person",
      "name": "Gabhru in UK",
      "url": "https://gabhruinuk.com"
    }],
    publisher: {
      "@type": "Organization",
      "name": "Gabhru in UK",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gabhruinuk.com/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <main className="min-h-screen bg-background relative z-10 pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <ArticleClient title={article.title} url={url} />

      {/* Editorial Hero Setup */}
      <div className="container mx-auto px-6 max-w-[680px] pt-40 pb-16">
        
        {/* Category Pill */}
        {article.categoryTitles && article.categoryTitles.length > 0 && (
          <span className="inline-block border border-accent/40 text-accent text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1 mb-6">
            {article.categoryTitles[0]}
          </span>
        )}

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-foreground leading-[1.1] mb-8">
          {article.title}
        </h1>

        {/* Byline */}
        <div className="flex items-center justify-between border-t border-b border-foreground/10 py-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-accent/20">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
                alt="Gabhru in UK"
                fill
                className="object-cover grayscale-[20%]"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-serif text-lg leading-tight">By Gabhru in UK</span>
              <span className="text-foreground/50 text-[10px] uppercase tracking-widest font-bold mt-1">Author & Editor</span>
            </div>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-foreground text-xs uppercase tracking-widest font-bold mb-1">
              {format(new Date(article.publishedAt), 'MMM dd, yyyy')}
            </span>
            <span className="text-accent text-[10px] uppercase tracking-widest font-bold">
              {estimatedReadTime} MIN READ
            </span>
          </div>
        </div>
      </div>

      {/* Full Bleed or Contained Image */}
      {article.coverImage && (
        <div className="w-full max-w-5xl mx-auto px-6 mb-16">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-background">
            <Image
              src={article.coverImage}
              alt={`Gabhru in UK - ${article.title}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* Article Body */}
      <article className="container mx-auto px-6 max-w-7xl relative">
        <CustomPortableText value={article.content} />
      </article>

      {/* Related Articles - Strict 2 Cards */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="container mx-auto px-6 max-w-[680px] pt-24 mt-24 border-t border-white/10">
          <span className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block text-center">
            Continue Reading
          </span>
          <h3 className="text-3xl font-serif text-foreground mb-12 text-center">
            Related Insights
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {article.relatedArticles.slice(0, 2).map((related: any) => (
              <Link
                key={related._id}
                href={`/articles/${related.slug}`}
                className="group flex flex-col h-full bg-background-secondary border border-transparent hover:border-white/5 transition-all duration-300"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  {related.coverImage && (
                    <Image
                      src={related.coverImage}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-foreground/40 text-[10px] tracking-widest uppercase font-bold mb-3">
                    {format(new Date(related.publishedAt), 'MMM dd, yyyy')}
                  </div>
                  <h4 className="font-serif text-[1.25rem] text-foreground leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-3">
                    {related.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
