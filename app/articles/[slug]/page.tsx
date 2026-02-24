import { client } from "@/lib/sanity";
import { ARTICLE_BY_SLUG_QUERY } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Instagram, Youtube, Twitter, Linkedin, Copy, Share2 } from "lucide-react";
import ReadingProgress from "./ReadingProgress";
import { Metadata, ResolvingMetadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug: params.slug });
  if (!article) return { title: "Article Not Found | Gabhru in UK" };

  const excerpt = article.excerpt || "Read the latest insights and updates from Gabhru in UK.";
  const title = `${article.title} | Gabhru in UK`;
  const image = article.coverImage || "";

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      url: `https://gabhruinuk.com/articles/${params.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.authorName || "Gabhru in UK"],
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      images: [image],
    },
  };
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?.url) return null;
      return (
        <figure className="my-12 w-full">
          <img src={value.asset.url} alt={value.alt || "Article image"} className="w-full h-auto object-cover" />
          {value.caption && <figcaption className="text-center text-sm text-gray-500 mt-4 font-sans">{value.caption}</figcaption>}
        </figure>
      );
    }
  }
};

export default async function ArticlePage({ params }: Props) {
  const article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug: params.slug });

  if (!article) {
    notFound();
  }

  const wordCount = JSON.stringify(article.content || []).split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": [
      article.coverImage
    ],
    "datePublished": article.publishedAt,
    "author": [{
      "@type": "Person",
      "name": "Gabhru in UK",
      "url": "https://gabhruinuk.com"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Gabhru in UK",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gabhruinuk.com/logo.png"
      }
    }
  };

  return (
    <article className="min-h-screen bg-[#FAFAFA] font-sans pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl pt-40 pb-16">
        <Link href="/articles" className="inline-flex items-center text-gray-500 hover:text-[#0066FF] mb-12 transition-colors text-sm font-medium uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
        </Link>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {article.categoryTitles?.map((cat: string) => (
            <span key={cat} className="text-xs font-bold tracking-widest uppercase text-[#0066FF]">
              {cat}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-[#0A1128] leading-[1.1] mb-8 tracking-tight">
          {article.title}
        </h1>

        <div className="flex items-center justify-between border-y border-gray-200 py-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0A1128] flex items-center justify-center text-white font-bold">
              G
            </div>
            <div>
              <p className="font-semibold text-[#121212] leading-none mb-1">Gabhru in UK</p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-UK", { month: "long", day: "numeric", year: "numeric" }) : "Recently"}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {readingTime} min read
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all hover:scale-110 active:scale-95"><Twitter className="w-4 h-4"/></button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all hover:scale-110 active:scale-95"><Linkedin className="w-4 h-4"/></button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all hover:scale-110 active:scale-95"><Copy className="w-4 h-4"/></button>
          </div>
        </div>

        {article.coverImage && (
          <figure className="w-full mb-16 relative aspect-[21/9] bg-gray-100 overflow-hidden">
            <img src={article.coverImage} className="w-full h-full object-cover" alt={article.title} />
          </figure>
        )}

        {/* Editorial Content */}
        <div className="prose prose-lg md:prose-xl max-w-none text-gray-800 font-serif leading-relaxed prose-headings:font-serif prose-headings:font-medium prose-headings:text-[#0A1128] prose-a:text-[#0066FF] prose-a:no-underline hover:prose-a:underline prose-p:mb-8 prose-blockquote:border-[#0066FF] prose-blockquote:bg-gray-50/50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:text-gray-700 prose-blockquote:not-italic">
          {article.content ? (
            <PortableText value={article.content} components={ptComponents} />
          ) : (
            <p className="italic text-gray-400 py-8">No content provided.</p>
          )}
        </div>

        {/* Author Footer */}
        <div className="mt-24 pt-12 border-t border-gray-200 flex flex-col sm:flex-row gap-8 items-start bg-white p-8 shadow-sm">
          <div className="w-24 h-24 rounded-full bg-[#0A1128] flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            G
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Editor</h4>
            <h3 className="text-2xl font-serif font-medium text-[#0A1128] mb-3">Gabhru in UK</h3>
            <p className="text-gray-600 mb-6 leading-relaxed font-sans text-sm md:text-base">
              A recognized media personality and trusted voice on UK Immigration & Lifestyle. Guiding individuals with authentic insights and real-world impact.
            </p>
          </div>
        </div>
        
      </div>

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-24 border-t border-gray-200 mt-12">
          <h3 className="text-3xl font-serif font-medium text-[#0A1128] mb-12">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {article.relatedArticles.map((rel: any) => (
              <Link href={`/articles/${rel.slug}`} key={rel._id} className="group flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 bg-gray-100">
                  {rel.coverImage && (
                    <img src={rel.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={rel.title} />
                  )}
                </div>
                {rel.categoryTitles?.slice(0, 1).map((cat: string) => (
                  <span key={cat} className="text-[10px] font-bold tracking-widest uppercase text-[#0066FF] mb-3">{cat}</span>
                ))}
                <h4 className="text-2xl font-serif leading-snug text-[#0A1128] group-hover:text-[#0066FF] transition-colors mb-3">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
