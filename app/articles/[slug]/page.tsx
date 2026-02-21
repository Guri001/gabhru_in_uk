import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/lib/sanity'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'

// Define the shape of our returned Sanity article
interface Article {
  _id: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: {
    url: string
    alt?: string
    width: number
    height: number
  }
  content?: any[]
  pdfUrl?: string
  author?: {
    name: string
    image?: string
    sameAs?: string[]
  }
  publishedAt?: string
  seoTitle?: string
  seoDescription?: string
}

// GROQ query joining related asset and author data
const ARTICLE_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset->{
    url,
    "alt": ^.alt,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  },
  content,
  "pdfUrl": pdf.asset->url,
  author->{
    name,
    "image": image.asset->url,
    sameAs
  },
  publishedAt,
  seoTitle,
  seoDescription
}`

// Dynamically generate Meta Tags
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = await sanityFetch<Article>({
    query: ARTICLE_QUERY,
    params: { slug: params.slug },
  })

  if (!article) return {}

  const metaTitle = article.seoTitle || article.title
  const metaDescription = article.seoDescription || article.excerpt

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
      url: `/articles/${article.slug}`,
      images: article.coverImage ? [
        {
          url: article.coverImage.url,
          width: article.coverImage.width,
          height: article.coverImage.height,
          alt: article.coverImage.alt || article.title,
        },
      ] : [],
    },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { isEnabled: isDraftMode } = draftMode()

  const article = await sanityFetch<Article>({
    query: ARTICLE_QUERY,
    params: { slug: params.slug },
    preview: isDraftMode,
    tags: [`article-${params.slug}`] // Tag allows scoped revalidation later
  })

  if (!article) {
    notFound()
  }

  // Construct JSON-LD for rich structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    image: article.coverImage?.url ? [article.coverImage.url] : [],
    datePublished: article.publishedAt,
    author: article.author ? {
      '@type': 'Person',
      name: article.author.name,
      sameAs: article.author.sameAs,
    } : undefined,
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Preview Alert Banner */}
      {isDraftMode && (
        <div className="bg-amber-100 text-amber-900 px-4 py-2 mb-8 text-center text-sm font-semibold rounded-md">
          Preview Mode active.{' '}
          <a href="/api/disable-preview" className="underline hover:text-amber-700">Exit</a>
        </div>
      )}

      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>
        )}
        
        {/* Author Metadata */}
        {article.author && (
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{article.author.name}</span>
            {article.publishedAt && (
              <>
                <span aria-hidden="true">•</span>
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </>
            )}
          </div>
        )}
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="mb-12 rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative w-full h-[400px] md:h-[500px]">
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alt || article.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Portable Text Content */}
      {article.content && (
        <div className="prose prose-lg md:prose-xl max-w-none mx-auto text-gray-800">
          <PortableText value={article.content} />
        </div>
      )}

      {/* Hosted PDF Fallback / Download button */}
      {article.pdfUrl && (
        <div className="mt-16 p-8 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-center">
          <h3 className="font-semibold text-xl mb-2 text-slate-800">Download Attached Document</h3>
          <p className="text-slate-500 mb-6">A PDF is attached to this article.</p>
          <a
            href={article.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
          >
            Open PDF Document
          </a>
        </div>
      )}
    </article>
  )
}
