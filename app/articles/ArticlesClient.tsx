"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Search, ChevronRight } from "lucide-react";

type Article = {
  _id: string;
  title: string;
  slug: string;
  authorName: string;
  authorImage?: string;
  categoryTitles: string[];
  excerpt: string;
  publishedAt: string;
  coverImage?: string;
};

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories
  const allCategories = ["All", ...Array.from(new Set(articles.flatMap(a => a.categoryTitles || [])))];

  // Filter articles based on search and category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || (article.categoryTitles && article.categoryTitles.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  return (
    <div className="container mx-auto px-4 max-w-7xl font-sans">
      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 pb-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dark/20 focus:border-accent-dark transition-all"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-serif text-gray-800 mb-2">No articles found</h3>
          <p className="text-gray-500">Try adjusting your search or category filters.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Featured Article Hero */}
          {featuredArticle && (
            <Link href={`/articles/${featuredArticle.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                <div className="aspect-video lg:aspect-square relative overflow-hidden bg-gray-100 h-full w-full min-h-[300px]">
                  {featuredArticle.coverImage ? (
                    <img 
                      src={featuredArticle.coverImage} 
                      alt={featuredArticle.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                      <span className="text-primary/20 font-serif text-2xl">Insight</span>
                    </div>
                  )}
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-3 mb-4">
                    {featuredArticle.categoryTitles?.slice(0, 1).map((cat) => (
                      <span key={cat} className="text-xs font-bold tracking-wider uppercase text-accent-dark bg-accent-dark/10 px-3 py-1 rounded-sm">
                        {cat}
                      </span>
                    ))}
                    {featuredArticle.publishedAt && (
                      <span className="text-sm text-gray-500">
                        {new Date(featuredArticle.publishedAt).toLocaleDateString("en-UK", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4 group-hover:text-accent-dark transition-colors line-clamp-3 leading-snug">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 line-clamp-3 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      {featuredArticle.authorImage ? (
                        <img src={featuredArticle.authorImage} alt={featuredArticle.authorName} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                          {featuredArticle.authorName?.charAt(0) || "G"}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{featuredArticle.authorName || "Gabhru in UK"}</p>
                        <p className="text-xs text-gray-500">Author</p>
                      </div>
                    </div>
                    
                    <span className="text-sm font-semibold text-accent-dark flex items-center group-hover:translate-x-1 transition-transform">
                      Read Article <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid Articles */}
          {gridArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridArticles.map((article) => (
                <Link key={article._id} href={`/articles/${article.slug}`} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="aspect-[16/10] relative overflow-hidden bg-gray-50 w-full">
                    {article.coverImage ? (
                      <img 
                        src={article.coverImage} 
                        alt={article.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5">
                        <span className="text-primary/20 font-serif text-lg">Insight</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex gap-2">
                       {article.categoryTitles?.slice(0, 1).map((cat) => (
                        <span key={cat} className="text-[10px] font-bold tracking-wider uppercase text-white bg-primary/80 backdrop-blur-sm px-2.5 py-1 rounded-sm shadow-sm">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-accent-dark transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         {article.authorImage ? (
                          <img src={article.authorImage} alt={article.authorName} className="w-6 h-6 rounded-full object-cover" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">
                            {article.authorName?.charAt(0) || "G"}
                          </div>
                        )}
                        <span className="text-xs font-medium text-gray-600">{article.authorName || "Gabhru in UK"}</span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-UK", { month: "short", day: "numeric", year: "numeric" }) : ""}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
