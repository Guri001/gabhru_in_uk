import { client } from "@/lib/sanity";
import { ARTICLE_BY_SLUG_QUERY } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Calendar, Clock, User, Download, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import ReadingProgress from "./ReadingProgress";
import { Metadata, ResolvingMetadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

type Props = {
  params: { slug: string };
};

// Generate Dynamic SEO Metadata
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug: params.slug });
  if (!article) return { title: "Article Not Found | Gabhru in UK" };

  const excerpt = article.excerpt || "Read the latest insights and updates from Gabhru in UK.";
  const title = `${article.title} | Gabhru in UK`;
  // Use Sanity image URL directly
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

// Portable text components mapping for rich-text styling
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      // Convert sanity image ref to URL (simple hack, better to use @sanity/image-url)
      // Assuming we just fetch image directly if we had a sanity image builder, 
      // but without it, we can only render if we mapped it in query.
      // For now, if value has an asset URL passed, we'll try to render.
      return (
        <figure className="my-10 w-full">
          <img src={value.asset.url} alt={value.alt || "Article image"} className="w-full rounded-xl object-cover shadow-sm" />
          {value.caption && <figcaption className="text-center text-sm text-gray-500 mt-3">{value.caption}</figcaption>}
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

  // Calculate estimated reading time
  const wordCount = JSON.stringify(article.content || []).split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Generate structured JSON-LD data
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
      "name": article.authorName || "Gabhru in UK",
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
    <article className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ReadingProgress />

      {/* Cinematic Hero */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0 z-0">
          {article.coverImage ? (
            <img src={article.coverImage} className="w-full h-full object-cover" alt={article.title} />
          ) : (
            <div className="w-full h-full bg-primary" />
          )}
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10 pb-16">
          <Link href="/articles" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
          </Link>
          <div className="flex flex-wrap gap-2 mb-6">
            {article.categoryTitles?.map((cat: string) => (
              <span key={cat} className="text-xs font-bold tracking-widest uppercase text-white bg-accent-dark/90 px-3 py-1 rounded-sm shadow-lg">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-8 drop-shadow-lg">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 bg-white p-8 md:p-12 xl:p-16 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-6 pb-8 mb-10 border-b border-gray-100 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                {article.authorImage ? (
                  <img src={article.authorImage} alt={article.authorName} className="w-10 h-10 rounded-full object-cover border-2 border-gray-50 text-xs flex items-center justify-center font-bold bg-gray-100" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {article.authorName?.charAt(0) || "G"}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">By {article.authorName || "Gabhru in UK"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-UK", { month: "long", day: "numeric", year: "numeric" }) : "Recently"}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {readingTime} min read
                </span>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 font-sans prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-accent-dark prose-blockquote:border-accent-dark prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-img:rounded-xl">
              {article.content ? (
                <PortableText value={article.content} components={ptComponents} />
              ) : (
                <p className="italic text-gray-400 py-8">No content provided.</p>
              )}
            </div>

            {/* Document Download Section */}
            {article.pdfUrl && (
              <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 md:p-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center shadow-sm">
                <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0 gap-6">
                  <div className="bg-white p-4 rounded-full shadow-sm text-accent-dark">
                    <FileText className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Download Full Report</h3>
                    <p className="text-gray-600 max-w-md">Access the complete documentation, official policy attachments, or detailed reports associated with this article.</p>
                  </div>
                </div>
                <a
                  href={`${article.pdfUrl}?dl=`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition-colors flex items-center whitespace-nowrap"
                >
                  <Download className="w-5 h-5 mr-3" /> Download PDF
                </a>
              </div>
            )}
            
            {/* Author Card */}
            <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col sm:flex-row gap-8 items-start">
              {article.authorImage ? (
                 <img src={article.authorImage} alt={article.authorName} className="w-24 h-24 rounded-full object-cover shadow-md" />
              ) : (
                 <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-md">
                   {article.authorName?.charAt(0) || "G"}
                 </div>
              )}
              <div>
                <h4 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-1">Written By</h4>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-3">{article.authorName || "Gabhru in UK"}</h3>
                <p className="text-gray-600 mb-6 max-w-lg leading-relaxed">
                  {article.authorBio || "A recognized media personality and trusted voice on UK Immigration & Lifestyle. Guiding individuals with authentic insights and real-world impact."}
                </p>
                <div className="flex gap-4">
                  <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors"><Instagram className="w-5 h-5"/></a>
                  <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent-dark hover:text-white transition-colors"><Youtube className="w-5 h-5"/></a>
                  <a href="#" aria-label="X (Twitter)" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-colors"><Twitter className="w-5 h-5"/></a>
                  <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"><Linkedin className="w-5 h-5"/></a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Related Articles */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Related Topics</h3>
              
              {article.relatedArticles && article.relatedArticles.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {article.relatedArticles.map((rel: any) => (
                    <Link href={`/articles/${rel.slug}`} key={rel._id} className="group flex gap-4 items-center">
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                        {rel.coverImage && (
                          <img src={rel.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={rel.title} />
                        )}
                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        {rel.categoryTitles?.slice(0, 1).map((cat: string) => (
                          <span key={cat} className="text-[10px] font-bold tracking-widest uppercase text-accent-dark mb-1">{cat}</span>
                        ))}
                        <h4 className="font-serif font-semibold text-gray-900 group-hover:text-accent-dark transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                        <span className="text-xs text-gray-500 mt-2">
                          {rel.publishedAt ? new Date(rel.publishedAt).toLocaleDateString("en-UK", { month: "short", day: "numeric", year: "numeric" }) : ""}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No related articles in this category.</p>
              )}
            </div>
            
            {/* Newsletter CTA */}
            <div className="bg-primary text-white p-8 rounded-2xl shadow-sm text-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
               <div className="relative z-10">
                 <h3 className="text-2xl font-serif font-bold mb-3">Stay Updated</h3>
                 <p className="text-gray-300 text-sm mb-6 leading-relaxed">Join thousands of others getting the latest UK Immigration & Lifestyle updates.</p>
                 <input type="email" placeholder="Your email address" className="w-full px-4 py-3 rounded-lg text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-accent" />
                 <button className="w-full bg-accent hover:bg-accent-dark hover:text-white transition-colors text-primary font-bold py-3 rounded-lg">
                   Subscribe Now
                 </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
