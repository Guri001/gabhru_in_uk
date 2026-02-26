"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

type Article = {
  _id: string;
  title: string;
  slug: string;
  categoryTitles: string[] | null;
  publishedAt: string;
  coverImage: string | null;
  estimatedReadTime: number;
  excerpt?: string;
};

const CATEGORIES = ["All", "Immigration", "Lifestyle", "Policy", "Settlement", "Community"];
const ITEMS_PER_PAGE = 6;

export default function ArticleListClient({ initialArticles }: { initialArticles: Article[] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = activeTab === "All" 
    ? initialArticles 
    : initialArticles.filter(a => a.categoryTitles?.includes(activeTab));

  const visibleArticles = filtered.slice(0, visibleCount);

  const loadMore = () => setVisibleCount(prev => prev + 6);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 md:gap-8 mb-16 px-2">
        {CATEGORIES.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
            className={`relative pb-2 text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
              activeTab === tab 
                ? "text-espresso" 
                : "text-walnut/50 hover:text-espresso"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="article-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-saffron"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 px-1">{tab}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {visibleArticles.length === 0 ? (
            <div className="py-32 text-center text-walnut/50 text-xl font-sans font-light">
              No articles found in this category.
            </div>
          ) : (
            <>
              {/* Grid Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                {visibleArticles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/articles/${article.slug}`}
                    className="group flex flex-col h-full bg-cream md:hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl rounded-sm overflow-hidden"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-sand/20">
                      {article.coverImage && (
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                      {article.categoryTitles?.[0] && (
                        <span className="absolute top-4 left-4 bg-saffron text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 z-10 shadow-md rounded-full">
                          {article.categoryTitles[0]}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow bg-white border-t-0">
                      <h3 className="font-heading text-2xl lg:text-3xl font-bold text-espresso leading-snug mb-6 group-hover:underline decoration-saffron decoration-3 underline-offset-4 line-clamp-3">
                        {article.title}
                      </h3>
                      
                      {/* Meta in Sand Color at Bottom */}
                      <div className="mt-auto pt-6 flex items-center justify-between border-t border-sand/30 text-sand text-xs font-bold tracking-widest uppercase">
                        <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</span>
                        <span>{Math.max(1, article.estimatedReadTime)} MIN READ</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Load More Button */}
          {filtered.length > visibleCount && (
            <div className="mt-20 flex justify-center pt-8">
              <button
                onClick={loadMore}
                className="px-10 py-5 bg-transparent border border-saffron text-espresso hover:bg-saffron hover:text-white font-bold text-sm uppercase tracking-widest transition-colors duration-300"
              >
                Load More Insights
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
