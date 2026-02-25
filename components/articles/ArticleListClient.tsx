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
const ITEMS_PER_PAGE = 7; // 1 featured + 6 grid

export default function ArticleListClient({ initialArticles }: { initialArticles: Article[] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = activeTab === "All" 
    ? initialArticles 
    : initialArticles.filter(a => a.categoryTitles?.includes(activeTab));

  const visibleArticles = filtered.slice(0, visibleCount);
  const featured = visibleArticles[0];
  const gridArticles = visibleArticles.slice(1);

  const loadMore = () => setVisibleCount(prev => prev + 6);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-6 border-b border-accent/20 pb-4 mb-12">
        {CATEGORIES.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
            className={`relative px-4 py-2 text-xs md:text-sm font-bold tracking-[0.1em] uppercase transition-colors duration-300 ${
              activeTab === tab ? "text-accent" : "text-foreground/50 hover:text-foreground"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="article-tab-indicator"
                className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-accent"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {tab}
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
            <div className="py-20 text-center text-foreground/50 text-xl font-light">
              No articles found in this category.
            </div>
          ) : (
            <>
              {/* Featured Article (First item) */}
              {featured && (
                <Link 
                  href={`/articles/${featured.slug}`}
                  className="group block relative w-full h-[500px] md:h-[600px] mb-8 md:mb-12 overflow-hidden bg-background-card"
                >
                  {featured.coverImage && (
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      priority
                      sizes="100vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-end max-w-5xl">
                    <span className="inline-block bg-accent text-background text-xs font-bold tracking-wider uppercase px-3 py-1 mb-6 self-start">
                      {featured.categoryTitles?.[0] || 'Uncategorized'}
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 group-hover:text-accent transition-colors duration-300">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="hidden md:block text-white/80 text-lg font-light mb-6 line-clamp-2 max-w-3xl">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-white/70 text-sm tracking-wider uppercase font-medium">
                      <span>{format(new Date(featured.publishedAt), 'MMM dd, yyyy')}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{Math.max(1, featured.estimatedReadTime)} MIN READ</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid Articles */}
              {gridArticles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gridArticles.map((article) => (
                    <Link
                      key={article._id}
                      href={`/articles/${article.slug}`}
                      className="group flex flex-col h-full bg-background-card border border-accent/10 hover:border-accent/30 transition-colors duration-300"
                    >
                      <div className="relative w-full h-64 overflow-hidden">
                        {article.coverImage && (
                          <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                        <span className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border border-accent/40 text-accent text-[10px] font-bold tracking-wider uppercase px-3 py-1 z-10">
                          {article.categoryTitles?.[0] || 'Uncategorized'}
                        </span>
                      </div>
                      
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-foreground/50 text-[10px] tracking-wider uppercase mb-4 font-bold">
                          <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</span>
                          <span className="w-1 h-1 rounded-full bg-accent" />
                          <span>{Math.max(1, article.estimatedReadTime)} MIN READ</span>
                        </div>
                        <h3 className="font-serif text-xl md:text-2xl text-foreground leading-snug mb-4 group-hover:text-accent transition-colors duration-300 line-clamp-3">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-foreground/70 text-sm md:text-base font-light line-clamp-3 mt-auto">
                            {article.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Load More Button */}
          {filtered.length > visibleCount && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={loadMore}
                className="px-8 py-4 border border-accent text-accent hover:bg-accent hover:text-background font-bold text-xs uppercase tracking-[0.2em] transition-colors duration-300"
              >
                Load More Articles
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
