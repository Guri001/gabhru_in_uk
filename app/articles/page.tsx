import { client } from "@/lib/sanity";
import { ARTICLES_QUERY } from "@/lib/queries";
import ArticlesClient from "./ArticlesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Articles | Gabhru in UK",
  description: "UK Immigration updates, policy breakdowns, lifestyle guidance, and community insights by Gabhru in UK.",
  openGraph: {
    title: "Insights & Articles | Gabhru in UK",
    description: "UK Immigration updates, policy breakdowns, lifestyle guidance, and community insights by Gabhru in UK.",
    type: "website",
  }
};

export const revalidate = 60; // Revalidate the page every 60 seconds

export default async function ArticlesPage() {
  const articles = await client.fetch(ARTICLES_QUERY);

  return (
    <div className="bg-white min-h-screen pb-24 font-sans">
      {/* Editorial Hero Banner */}
      <div className="bg-primary text-white py-24 px-4 mb-12 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-tight">
            Insights & Articles
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            UK Immigration updates, policy breakdowns, lifestyle guidance, and community insights by <span className="text-accent font-medium">Gabhru in UK</span>.
          </p>
        </div>
      </div>

      <ArticlesClient articles={articles} />
    </div>
  );
}
