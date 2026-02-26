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
    <main className="min-h-screen bg-cream relative z-10 pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Editorial Hero Setup (Header) */}
      <div className="container mx-auto px-6 max-w-5xl pt-40 pb-16 flex flex-col items-center text-center">
        
        {/* Category Pill */}
        {article.categoryTitles && article.categoryTitles.length > 0 && (
          <span className="inline-block border border-saffron bg-saffron text-white shadow-sm rounded-full text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 mb-8">
            {article.categoryTitles[0]}
          </span>
        )}

        {/* Title */}
        <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-espresso leading-[1.05] mb-8">
          {article.title}
        </h1>

        {/* Top Byline (Mobile Only) */}
        <div className="lg:hidden flex items-center gap-4 py-6 text-left border-y border-sand/30 w-full justify-between mt-4">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-saffron/20 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
                alt="Gabhru in UK"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-espresso font-bold text-xs leading-tight">Gabhru in UK</span>
              <span className="text-sand text-[10px] uppercase tracking-widest font-bold mt-0.5">Author</span>
            </div>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-espresso text-[10px] uppercase tracking-widest font-bold mb-1">
              {format(new Date(article.publishedAt), 'MMM dd')}
            </span>
            <span className="text-sand text-[10px] uppercase tracking-widest font-bold">
              {estimatedReadTime} MIN READ
            </span>
          </div>
        </div>
      </div>

      {/* Full Bleed Image */}
      {article.coverImage && (
        <div className="w-full max-w-6xl mx-auto px-6 mb-16 lg:mb-24">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-sand/20 rounded-md shadow-lg">
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

      {/* Main Content Area with Sticky Sidebar */}
      <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        
        {/* Sticky Sidebar replaces ArticleClient floating bar */}
        <div className="hidden lg:block w-64 shrink-0 mt-2">
           {/* Author Byline & Share Bar rendered by ArticleClient */}
           <ArticleClient title={article.title} url={url} />
        </div>

        {/* Article Body */}
        <article className="w-full max-w-[680px] mx-auto lg:mx-0">
          <div className="hidden lg:flex items-center justify-between font-sans text-xs uppercase tracking-widest font-bold text-walnut/50 mb-12 border-b border-sand/30 pb-6">
             <span>{format(new Date(article.publishedAt), 'MMMM dd, yyyy')}</span>
             <span className="text-sand">{estimatedReadTime} MIN READ</span>
          </div>

          <CustomPortableText value={article.content} />
          
          {/* Mobile Article Client logic (bottom share) */}
          <div className="lg:hidden">
            <ArticleClient title={article.title} url={url} />
          </div>
        </article>
      </div>

      {/* Related Articles - Strict 2 Cards */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="container mx-auto px-6 max-w-5xl pt-32 mt-24 border-t border-sand/30">
          <div className="text-center mb-16">
            <span className="text-saffron text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              Continue Reading
            </span>
            <h3 className="text-4xl lg:text-5xl font-heading font-bold text-espresso">
              Related Insights
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16">
            {article.relatedArticles.slice(0, 2).map((related: any) => (
              <Link
                key={related._id}
                href={`/articles/${related.slug}`}
                className="group flex flex-col h-full bg-white md:hover:-translate-y-2 border border-transparent hover:border-sand/20 transition-all duration-300 shadow-sm hover:shadow-xl rounded-md overflow-hidden"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-sand/20">
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
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="font-heading font-bold text-2xl lg:text-3xl text-espresso leading-snug group-hover:underline decoration-saffron decoration-3 underline-offset-4 transition-all duration-300 line-clamp-3">
                    {related.title}
                  </h4>
                  
                  <div className="text-sand text-xs tracking-widest uppercase font-bold mt-auto pt-6 border-t border-sand/20 w-fit">
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
