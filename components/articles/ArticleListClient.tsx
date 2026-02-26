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
      <div className="flex flex-wrap gap-2 md:gap-4 mb-16">
        {CATEGORIES.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
            className={`relative px-5 py-2 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 rounded-full border ${
              activeTab === tab 
                ? "border-accent text-background" 
                : "border-foreground/10 text-foreground/50 hover:border-accent hover:text-accent"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="article-tab-pill"
                className="absolute inset-0 bg-accent rounded-full -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
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
            <div className="py-32 text-center text-foreground/50 text-xl font-light">
              No articles found in this category.
            </div>
          ) : (
            <>
              {/* Grid Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {visibleArticles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/articles/${article.slug}`}
                    className="group flex flex-col h-full bg-background-secondary border border-transparent hover:border-white/5 transition-all duration-300"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-background">
                      {article.coverImage && (
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                      {article.categoryTitles?.[0] && (
                        <span className="absolute top-4 left-4 bg-background/90 text-accent text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 z-10 border border-accent/20">
                          {article.categoryTitles[0]}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-foreground/40 text-[10px] tracking-widest uppercase mb-4 font-bold">
                        <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</span>
                        <span className="w-1 h-1 rounded-full bg-accent/50" />
                        <span>{Math.max(1, article.estimatedReadTime)} MIN READ</span>
                      </div>
                      <h3 className="font-serif text-2xl text-foreground leading-snug mb-4 group-hover:text-accent transition-colors duration-300">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-foreground/70 text-sm font-light line-clamp-3 mt-auto leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Load More Button */}
          {filtered.length > visibleCount && (
            <div className="mt-20 flex justify-center border-t border-white/5 pt-16">
              <button
                onClick={loadMore}
                className="px-8 py-4 bg-transparent border border-accent/40 text-accent hover:bg-accent hover:text-background font-bold text-xs uppercase tracking-[0.2em] transition-colors duration-300"
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
