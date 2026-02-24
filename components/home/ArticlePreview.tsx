import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import MagneticButton from "@/components/ui/MagneticButton";

const LATEST_ARTICLES_QUERY = groq`
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    "categoryTitles": categories[]->title,
    excerpt,
    publishedAt,
    "coverImage": coverImage.asset->url
  }
`;

export default async function ArticlePreview() {
  const articles = await client.fetch(LATEST_ARTICLES_QUERY, {}, { next: { revalidate: 60 } });

  return (
    <section className="py-24 md:py-32 bg-white text-[#121212]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Latest Insights</h2>
            <div className="h-[2px] w-16 bg-[#0066FF]" />
          </div>
          <MagneticButton>
            <Link href="/articles" className="inline-flex items-center gap-2 group text-[#0066FF] font-medium uppercase tracking-widest text-sm">
              View All Insights 
              <span className="block transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {articles.map((article: any) => (
            <Link href={`/articles/${article.slug}`} key={article._id} className="group flex flex-col h-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 bg-gray-100">
                {article.coverImage && (
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                {article.categoryTitles && article.categoryTitles.length > 0 && (
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#0A1128] shadow-sm">
                    {article.categoryTitles[0]}
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 uppercase tracking-wider font-semibold text-xs">
                  <time dateTime={article.publishedAt}>
                    {article.publishedAt ? format(new Date(article.publishedAt), "dd MMM yyyy") : ""}
                  </time>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>5 min read</span>
                </div>
                <h3 className="text-2xl font-serif leading-snug mb-3 text-[#121212] group-hover:text-[#0066FF] transition-colors inline-block relative self-start">
                  {article.title}
                  <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-[#0066FF] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </h3>
                <p className="text-gray-600 font-light line-clamp-2 mt-auto">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
