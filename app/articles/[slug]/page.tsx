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
    <main className="min-h-screen bg-background relative z-10 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <ArticleClient title={article.title} url={url} />

      {/* Hero Section */}
      <div className="relative w-full h-[60svh] md:h-[70svh] min-h-[500px]">
        {article.coverImage && (
          <Image
            src={article.coverImage}
            alt={`Gabhru in UK - ${article.title}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 md:via-background/50 to-transparent" />
        
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 xl:p-16 container mx-auto max-w-7xl flex flex-col justify-end">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight mb-8">
              {article.title}
            </h1>
            
            {/* Author Bar */}
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-xs md:text-sm tracking-wider uppercase font-medium">
              <span className="text-accent flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center border border-accent/40">G</span>
                Gabhru in UK
              </span>
              <span className="w-1 h-1 rounded-full bg-accent/50" />
              <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</span>
              <span className="w-1 h-1 rounded-full bg-accent/50" />
              <span>{estimatedReadTime} MIN READ</span>
              {article.categoryTitles && article.categoryTitles.length > 0 && (
                <>
                  <span className="w-1 h-1 rounded-full bg-accent/50" />
                  <span className="border border-accent/40 px-2 py-1 text-[10px] text-accent">{article.categoryTitles[0]}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="container mx-auto px-6 py-16 md:py-24 max-w-7xl relative">
        <CustomPortableText value={article.content} />
      </article>

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="container mx-auto px-6 max-w-7xl pt-20 border-t border-white/10">
          <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block text-center">
            Continue Reading
          </span>
          <h3 className="text-3xl font-serif text-foreground mb-12 text-center">
            Related Articles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {article.relatedArticles.map((related: any) => (
              <Link
                key={related._id}
                href={`/articles/${related.slug}`}
                className="group flex flex-col h-full bg-background-card border border-accent/10 hover:border-accent/30 transition-colors duration-300"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  {related.coverImage && (
                    <Image
                      src={related.coverImage}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="font-serif text-xl text-foreground leading-snug mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {related.title}
                  </h4>
                  <div className="mt-auto text-foreground/50 text-[10px] tracking-wider uppercase font-bold">
                    {format(new Date(related.publishedAt), 'MMM dd, yyyy')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
