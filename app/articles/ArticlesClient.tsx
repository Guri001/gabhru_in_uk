"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Article = {
  _id: string;
  title: string;
  slug: string;
  authorName: string;
  categoryTitles: string[];
  excerpt: string;
  publishedAt: string;
  coverImage?: string;
};

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allCategories = ["All", ...Array.from(new Set(articles.flatMap(a => a.categoryTitles || [])))];

  const filteredArticles = articles.filter((article) => {
    return selectedCategory === "All" || (article.categoryTitles && article.categoryTitles.includes(selectedCategory));
  });

  return (
    <div className="container mx-auto px-6 md:px-12 max-w-7xl font-sans py-16">
      <div className="flex flex-wrap gap-6 md:gap-10 border-b border-gray-200 mb-16 relative">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`relative pb-4 text-sm md:text-base font-medium tracking-wide transition-colors ${
              selectedCategory === cat ? "text-[#0A1128]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {cat}
            {selectedCategory === cat && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#0066FF]"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredArticles.map((article, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={article._id}
              className="group flex flex-col h-full"
            >
              <Link href={`/articles/${article.slug}`} className="flex flex-col h-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 bg-gray-100 rounded-lg">
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
                <div className="flex flex-col flex-grow px-2 pb-2">
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3 uppercase tracking-wider font-semibold text-[10px]">
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
                  <p className="text-gray-600 font-light line-clamp-3 mt-auto mb-4">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-[#0A1128] text-white flex items-center justify-center text-xs font-bold">
                      G
                    </div>
                    <span className="text-sm font-medium text-gray-800">Gabhru in UK</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredArticles.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-xl text-gray-500 font-serif">No articles match the selected criteria.</p>
        </div>
      )}
    </div>
  );
}
