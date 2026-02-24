import { client } from "@/lib/sanity";
import { ARTICLES_QUERY } from "@/lib/queries";
import ArticlesClient from "./ArticlesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Articles | Gabhru in UK",
  description: "Official log of articles and insights by Gabhru in UK.",
};

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await client.fetch(ARTICLES_QUERY);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Insights & Articles | Gabhru in UK",
    "url": "https://gabhruinuk.com/articles",
    "description": "Explorations of policy, culture, and the UK diaspora experience.",
    "publisher": {
      "@type": "Organization",
      "name": "Gabhru in UK"
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#121212] pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-40 pb-16 px-6 md:px-12 bg-white border-b border-gray-100 shadow-sm relative z-20">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 text-[#0A1128] tracking-tight">
            Insights & Articles
          </h1>
          <div className="h-[2px] w-24 bg-[#0066FF] mb-8" />
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl font-light leading-relaxed">
            Explorations of policy, culture, and the UK diaspora experience.
          </p>
        </div>
      </div>

      <ArticlesClient articles={articles} />
    </div>
  );
}
